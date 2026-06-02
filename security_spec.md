# Security Specification: Waitlist Collection

## 1. Data Invariants
- **Public Subscription Creation**: Any visitor (authenticated or unauthenticated) can subscribe to the waitlist by creating a document.
- **Privacy Lock**: Client SDKs are strictly blocked from listing, reading, deleting, or updating subscriber data. Reading and managing subscribers is reserved for administrative processes or backend access.
- **Data Integrity**: Every subscriber document key-size and type must be checked. Crucially:
  - `email` must be a valid, reasonable-sized string.
  - `createdAt` must exactly match the server timestamp (`request.time`).
  - Optional `name` and `source` must have reasonable length limitations to prevent denial-of-wallet payload abuse.

## 2. The "Dirty Dozen" Payloads (Exploit Verification Models)
These payloads must be mathematically rejected by our Firestore Security Rules:

1. **The PII Collector Read**: Unauthenticated read request to get someone else's email.
2. **The Signed-In Scraper**: Authenticated user trying to crawl/list the list of subscribers.
3. **The Shadow Field Submitter**: Creating a subscription with an administrative field injected, e.g., `{ "email": "evil@test.com", "isAdmin": true, "createdAt": "request.time" }`.
4. **The Spoofed Timestamp**: Submitting a pre-baked client timestamp backdated into the past.
5. **The Memory Flooder**: Sending a subscriber `name` content of 2MB to exhaust project bandwidth.
6. **The Subscription Stealer / Update**: Modifying a subscriber's existing details after they are saved.
7. **The Arbitrary Deletion**: Deleting a waitlist subscriber document directly.
8. **The ID Poisoner**: Signing up using a document ID filled with dangerous non-alphanumeric escape sequences.
9. **The Missing Required Key**: Submitting flat subscriber keys without the mandatory `createdAt` timestamp.
10. **The Invalid Email Format Type**: Setting `email` key value to an array or integer instead of a string.
11. **The Key Size Flooder**: Injecting 30 extra random fields to exhaust Firestore storage indexes.
12. **The Relational Hijacker**: Pretending to write with a spoofed user-auth claims context.

---

## 3. Firestore Rules Suite Design First-Draft
We will protect our collections by validating schemas and forcing absolute client read-blocks for sensitive fields.
