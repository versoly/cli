---
permalink: /contributing
---

# Contributing guide

This file is a WIP

### Development

Running locally:

```shell
pnpm install
pnpm link --global
pnpm run test
```

`pnpm run dev` - automatically compiles typescript when files on lib folder changes.

Run versoly sync locally on an Astro project

Requires
- .env with VERSOLY_ACCESS_TOKEN
- versoly.config.mjs in the root of the Astro project

```shell
cd an-astro-package
pnpm install
versoly sync
```


## Inspiration

- [ajv](https://raw.githubusercontent.com/ajv-validator/ajv/refs/heads/master/CONTRIBUTING.md)