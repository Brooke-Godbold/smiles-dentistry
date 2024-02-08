# All Smiles Dentistry

All Smiles Dentistry is an App for a Dental Surgery. It features pages for Services offered, and for Staff which work there. It also has user accounts, and users can book appointments at the surgery online. An Admin System allows users and appointments to be managed via the App. It features a specific and consistent branding throughout the App. It is built within Vue, and utilises features such as Vue Router, State Management via Pinia, Composition API, and CSS Animations via Transition blocks. The Database is provided via Firebase Realtime Database, Authentication is through Firebase Authentication, and Storage is through Firebase Storage Buckets. It also features integrations with Google Maps and Brevo for Mailing Lists.

## Important Notes

If you are working on this Project and require access for installation/development, contact the owner for the Firebase, Google, and Brevo API Keys.

## Installation

Pull or Download the Repository to local machine

Create your local .env file and add the required Environment Variables to this file

```yaml
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID

VITE_GOOGLE_API_KEY

VITE_BREVO_API_KEY
```

Install the modules:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

To run Cypress:

```bash
npm run cypress:open
```

## Technical Configuration

### Website

[https://all-smiles-dentistry.netlify.app/](https://all-smiles-dentistry.netlify.app/)

### Hosting

[Netlify Admin](https://app.netlify.com/sites/all-smiles-dentistry/)

The Live Website is hosted on Netlify. The dashboard can be used to configure the deployment, such as setting up Environment Variables.

### Database & Authentication

[Firebase](https://console.firebase.google.com/project/smiles-dentistry/overview)

The Database, Authentication & Storage are provided via Firebase. Aspects related to these can be managed via the Firebase Console.

### Google Console

[Google Console](https://console.cloud.google.com/apis/dashboard?project=smiles-dentistry-412620)

Location services for Google Maps can be managed via the Google Console, such as the API keys required for this integration.

### Brevo

[Brevo](https://app.brevo.com/)

Brevo is the chosen Mailing and SMTP Provider for this App. Mailing lists and API keys can be managed via the Brevo Dashboard.
