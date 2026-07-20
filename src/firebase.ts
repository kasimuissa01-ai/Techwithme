import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, setDoc, serverTimestamp, getDoc, writeBatch, increment, onSnapshot, collection, getDocs, query, orderBy } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId || "(default)"); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

// Error handling types and helpers as required by Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper to register waitlist subscriber with atomic aggregated count increment
export async function addWaitlistSubscriber(email: string, name?: string, source?: string) {
  const cleanedEmail = email.trim().toLowerCase();
  if (!cleanedEmail) throw new Error("Email address is required.");

  // Generate a safe ID by replacing unauthorized characters with safe ones
  const docId = cleanedEmail.replace(/[^a-zA-Z0-9_\-]/g, "_");
  const path = `waitlist/${docId}`;

  try {
    const docRef = doc(db, 'waitlist', docId);
    const statsRef = doc(db, 'stats', 'waitlist');

    // Check if subscriber document already exists to avoid double-incrementing on multiple clicks
    const docSnap = await getDoc(docRef);
    const alreadyExists = docSnap.exists();

    const batch = writeBatch(db);

    const payload: Record<string, any> = {
      email: cleanedEmail,
      createdAt: serverTimestamp(),
    };
    if (name && name.trim()) payload.name = name.trim();
    if (source && source.trim()) payload.source = source.trim();

    batch.set(docRef, payload);

    if (!alreadyExists) {
      batch.set(statsRef, { count: increment(1) }, { merge: true });
    }

    await batch.commit();
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false, error };
  }
}

// Real-time listener for the waitlist count
export function subscribeToWaitlistCount(onUpdate: (count: number) => void) {
  try {
    const statsRef = doc(db, 'stats', 'waitlist');
    return onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate(data.count || 0);
      } else {
        onUpdate(0);
      }
    }, (error) => {
      console.warn("Could not listen to real-time waitlist count: ", error);
      onUpdate(0);
    });
  } catch (err) {
    console.warn("Failed to subscribe to waitlist count: ", err);
    onUpdate(0);
    return () => {};
  }
}

// Fetch all subscribers (Admin Feature)
export async function getWaitlistSubscribers() {
  try {
    const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const subscribers: Array<{ id: string; email: string; name?: string; source?: string; createdAt?: any }> = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      subscribers.push({
        id: doc.id,
        email: data.email || "",
        name: data.name || "",
        source: data.source || "prompts_waitlist",
        createdAt: data.createdAt,
      });
    });
    return { success: true, data: subscribers };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'waitlist');
    return { success: false, error, data: [] };
  }
}

// Subscribe to real-time subscribers list (Admin Feature)
export function subscribeToWaitlistSubscribers(onUpdate: (subscribers: any[]) => void) {
  try {
    const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const subscribers: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        subscribers.push({
          id: doc.id,
          email: data.email || "",
          name: data.name || "",
          source: data.source || "prompts_waitlist",
          createdAt: data.createdAt ? data.createdAt.toDate() : null,
        });
      });
      onUpdate(subscribers);
    }, (error) => {
      console.error("Error listening to waitlist: ", error);
    });
  } catch (err) {
    console.error("Error setting up waitlist subscription: ", err);
    return () => {};
  }
}

