# Computer Care Source

Website and booking application for Computer Care Source (computercaresource.com).

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Web3Forms (Form handling)
- ALTCHA (Human verification)
- Firebase Hosting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at http://localhost:5173.

### Production Build

```bash
npm run build
```

The compiled output is generated in the `dist` directory.

### Code Quality Check

```bash
npm run lint
```

## Configuration

Set environment variables in `.env`:

```env
# Web3Forms access key for lead notifications
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
```

## Deployment

The application deploys to Firebase Hosting via GitHub Actions.

- Pushing to the `main` branch triggers an automated build and deployment to production.
- Manual deployment can also be run locally:

```bash
npm run build
npx firebase deploy --only hosting
```
