// auto-generated file

/**
 * @typedef SiteConfig
 * @type {object}
 * @property {string} title
 * @property {string} description
 * @property {string} head
 * @property {string} scripts
 * @property {import("../utils/metaTagsToString").MetaTags} metaTags
 * @property {array} integrations
 * @property {string} lang
 * @property {string} favicon
 * @property {Record<string, { status: 301 | 302; destination: string }>} redirects
 */

/** @type {SiteConfig} */
export const SITE_CONFIG = {
  title: "AstroVersoly",
  description: "",
  head: "<script>console.log('test');</script>",
  scripts: "",
  metaTags: [],
  integrations: [],
  lang: "en",
  favicon: "/images/db204aff-2783-412a-9f3d-8ff54d267d9f.png",
  redirects: {
    "/old-page": {
      status: 301,
      destination: "/new-page",
    },
  },
};
