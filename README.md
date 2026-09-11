# Nera Innovations

Public site for the Nera product house. English only. Next.js on the front, Firebase when you want the admin panel to edit featured systems, map icons and partners.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works without Firebase. Seed content is already in the app.

## Firebase admin

1. Create a Firebase project.
2. Enable **Authentication → Email/Password** and add an admin user.
3. Create a Firestore database and publish `firestore.rules`.
4. Copy `.env.example` to `.env.local` and fill the web config.
5. Sign in at `/admin` and click **Seed database**.

From the panel you can:

- Feature up to 4 systems (those get homepage cards and detail pages)
- Add or remove map icons with country + company name
- Add or remove social-proof partners
- Read form submissions

## Forms

Contact, Growth Review and resource requests are emailed to `info@nerasocial.com`. The first FormSubmit delivery asks you to confirm that inbox. When Firebase is connected, the same leads are stored for the admin panel.
