import { describe, expect, test } from 'vitest';
import { generateComponent } from 'src/lib/generateFiles';

const componentsList = [
  {
    name: 'Header',
    content: `<div>
      <template v-if="useH2Tag">
        <h2 v-text={header}></h2>
      </template>
      <template v-if="!useH2Tag">
        <h1 v-text={header}></h1>
      </template>

    </div><d data-tilt="" data-toggle="tilt"></d>`,
    properties: [
      {
        name: 'header',
        slug: 'header',
        type: 'PlainText',
        defaultValue: 'Header',
      },
      {
        name: 'Use H2 Tag',
        slug: 'useH2Tag',
        type: 'Bool',
        defaultValue: false,
      },
    ],
  },
];

test('generateComponent', async () => {
  const { content, ...rest } = await generateComponent(componentsList[0] as any, 'src/components');

  expect(content).toMatchSnapshot();
  expect(rest).toMatchSnapshot();
});
