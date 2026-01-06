This is a [Versoly](https://versoly.com) Astro Starter Kit that provides the basics to get started with Versoly sync.

## Features

- Astro for blazing-fast static site generation.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.
- Versoly UI: Bootstrap like CSS components and utilities.
- Sitemap Generator: Automatically generates a sitemap for SEO.
- SEO Optimized: Meta tags, Open Graph, and structured data support.

## Installation

First, clone the CLI repository and navigate to the project folder:

```shell
git clone https://github.com/versoly/cli
cd cli/examples/astro
```

Next, install the necessary dependencies:

```shell
pnpm install
```

## Usage

To start the development server, run:

```shell
pnpm run dev
```


## Project Structure

```
├── public/ # Static assets (e.g., images, fonts)
│ ├── images/ # Versoly will sync images here
├── src/
│ ├── components/ # Reusable components (e.g., buttons, headers)
│ ├── layouts/ # Layouts for different page types
│ ├── pages/ # Your page content (in .astro or .mdx)
│ ├── styles/ # Global CSS or Tailwind styles
│   ├── global.css # Used for Tailwind CSS
│   ├── versoly.css # Auto generated CSS from Versoly for Versoly UI such as .btn, .col
│   ├── versoly-forms.css # Extended Tailwind forms plugin to work properly with v4 + Versoly UI
├── package.json # Project scripts and dependencies
└── astro.config.mjs # Astro configuration
└── versoly.config.mjs # Versoly cli/sync configuration
└── .env # Includes VERSOLY_ACCESS_TOKEN
```
