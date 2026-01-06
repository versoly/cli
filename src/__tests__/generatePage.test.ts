import { expect, test } from 'vitest';
import { generatePage } from 'src/lib/generateFiles';
import { VersolyPage } from 'src/types';
import { replaceCDNUrls } from 'src/commands/sync';

const pagesList: VersolyPage[] = [
  {
    id: '0',
    name: 'Header',
    slug: 'index',
    status: 'publish',
    folderPath: '',
    folderId: null,
    seo: {
      title: 'Header Page',
      description: 'This is the header page',
    },
    metaTags: [
      {
        field: 'name',
        value: 'og:image',
        content:
          'https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/db204aff-2783-412a-9f3d-8ff54d267d9f.png',
      },
    ],
    head: '',
    scripts: '',
    bodyProperties: {},
    layout: { name: 'PageLayout' },
    content: `<div>
      <template v-if="useH2Tag">
        <h2 v-text={header}></h2>
      </template>
      <template v-if="!useH2Tag">
        <h1 v-text={header}></h1>
      </template>
      <img src="https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/db204aff-2783-412a-9f3d-8ff54d267d9f.png" alt="Sample Image" />

    </div><d data-tilt="" data-toggle="tilt"></d>`,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    createdBy: 'user_1',
    updatedBy: 'user_1',
  },
];

test('generatePage', async () => {
  const page = await generatePage(pagesList[0] as any, 'src/pages');

  if (!page) {
    throw new Error('Page generation failed');
  }

  let { content, ...rest } = page;

  content = replaceCDNUrls(content);

  expect(content).toMatchSnapshot();
  expect(rest).toMatchSnapshot();
});
