# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Bloople local backend

This app connects to the sibling `../backend/` Docker API. Start and seed that local stack first, then create a temporary demo token with `make local-token` from `backend/` and paste it into the app's connection screen. The token remains in memory only and expires after two hours; there is no customer sign-up or production authentication in this local integration.

The default API URL is `http://localhost:8010`. Override it with `EXPO_PUBLIC_API_URL` when the app runs on another device or emulator; `localhost` on a physical phone means the phone itself, so use the development computer's reachable LAN address. The same value is shown on the connection screen. API paths and payloads are defined in `../backend/openapi.yaml`.

After connecting, an existing Fit-DNA profile opens on Home. Choose **Edit Fit-DNA** to update it; a new profile begins the onboarding flow. Save writes the entire answer payload and schedules the backend's asynchronous match recomputation.

## Linux Android emulator

The shared computer setup and reusable commands are documented in
[`../docs/mobile-development/README.md`](../docs/mobile-development/README.md).
Use the already-installed Node 24 (`nvm use 24`) for Expo SDK 57; the older default
Node 18 cannot run this SDK reliably. `npm install` now produces a versioned npm
lockfile for repeatable dependency installation.

Boot `rn-api36` with `mobile-emulator start`, reverse API port 8010 and Metro port
8081 for `emulator-5554`, then run `npx expo start --go --localhost --android`.
With those ADB mappings, the existing `http://localhost:8010` API default reaches
the host backend. Reapply mappings after emulator shutdown. This workflow serves
JavaScript through SDK-matched Expo Go and does not compile a native Android app.
Native modules unsupported by Expo Go require a separately authorized development
build. Other repositories can reuse the same SDK/AVD with their own dependencies.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
