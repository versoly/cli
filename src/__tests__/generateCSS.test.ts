import { describe, expect, test } from 'vitest';
import { VersolyClient } from 'versoly-js-client';

import { generateCSSFor } from 'src/lib/generateCSS';
import { configDotenv } from 'dotenv';

const siteId = 'a813080b-2e29-4a1e-838f-dc510e49290a';

configDotenv();

test('generateCSSFor versoly-ui', async () => {
  // console.log(versolyConfig);
  const client = new VersolyClient({
    token: process.env.VERSOLY_ACCESS_TOKEN ?? '',
    url: process.env.VERSOLY_API_URL ?? 'https://api.versoly.com/v1',
  });

  const { data: site, error } = await client.sites.get({ path: { siteId } });

  if (error) {
    console.log(error);
    throw new Error(`Failed to fetch site data`);
  }

  const str = await generateCSSFor['versoly-ui']({ ...site.config, rules: [], variants: {}, darkMode: false });
  // console.log(str);
});
