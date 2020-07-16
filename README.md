# Vuextifire.ts

## Description

This is a simple template meant to help quick-starting Vue projects with Firebase.

### What comes in out-of-the-box

Some of the features are:

- Vue CLI
- PWA support (custom)
- Vuex
- Vuetify
- Firebase integration (w/ Vuexfire)
  - Auth
  - Firestore
  - Storage
- Multi-environment setup (dev & prod)

## PWA: Important

Make sure to update the package version in `sw.js` and `package.json` for each new deployment!

TODO: automate this flow / find alternative solution.

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
# Firebase development environment
npm run build:dev
```

or

```bash
# Firebase production environment
npm run build:prod
```

### Run your unit tests

```bash
npm run test:unit
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
