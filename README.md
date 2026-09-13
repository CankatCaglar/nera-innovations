# Nera Innovations

Public site for the Nera product house. English only.

## Run locally

```bash
npm install
npm run dev
```

Admin sign-in is Firebase Auth (email/password) once `FIREBASE_API_KEY` is set. Until then, `/admin` can still use `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Deploy env

Do not use `NEXT_PUBLIC_` keys. Set only:

- `ADMIN_EMAIL` (optional allowlist; must match the Firebase user)
- `ADMIN_PASSWORD` (fallback only, before Firebase Auth is configured)
- `ADMIN_SECRET`
- `FIREBASE_API_KEY` (web app `apiKey`)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (one line, newlines as `\n`)

Enable Authentication → Email/Password and Cloud Firestore in the same project.

## Forms

Contact, Growth Review and resource requests are emailed to `info@nerasocial.com`. The first FormSubmit delivery asks you to confirm that inbox.
