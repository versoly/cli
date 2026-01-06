export type MetaTags = Array<{
  field: string;
  value: string;
  content: string;
}>;

export type PageMetaProps = {
  favicon?: string;
  url?: string;
  title: string;
  description: string;
  metaTags: MetaTags;
  lang?: string;
  head?: string;
  scripts?: string;
  bodyProperties: {
    id?: string;
    className?: string;
    [key: string]: string | undefined;
  };
};

export type PageLayoutMetaProps = {
  site: {
    favicon?: string;
    title: string;
    description: string;
    metaTags: MetaTags;
  };
  obj: PageMetaProps;
};

export const metaTagsToString = ({ site, obj }: PageLayoutMetaProps) => {
  let { title, description, favicon, metaTags } = {
    ...site,
    ...obj,
  };

  let canonical = obj.url || '';

  const imageMetaTag =
    metaTags.find((tag) => tag.value === 'og:image') ||
    metaTags.find((tag) => tag.value === 'twitter:image') ||
    site.metaTags.find((tag) => tag.value === 'og:image') ||
    site.metaTags.find((tag) => tag.value === 'twitter:image');

  const image = imageMetaTag?.content || '';

  metaTags.forEach(({ field, value, content }) => {
    if (field === 'rel' && value === 'canonical') {
      canonical = content;
      return;
    }
  });

  const defaultMetaTags = [
    { field: 'property', value: 'og:type', content: 'website' },
    { field: 'property', value: 'og:url', content: canonical },
    { field: 'property', value: 'og:title', content: title },
    { field: 'property', value: 'og:description', content: description },
    { field: 'property', value: 'og:image', content: image },

    { field: 'name', value: 'twitter:url', content: canonical },
    { field: 'name', value: 'twitter:title', content: title },
    { field: 'name', value: 'twitter:description', content: description },
    { field: 'name', value: 'twitter:card', content: image && 'summary_large_image' },
    { field: 'name', value: 'twitter:image', content: image },
  ].filter((tag) => Boolean(tag.content));

  defaultMetaTags.forEach((tag) => {
    if (metaTags.find((t) => t.field === tag.field && t.value === tag.value)) {
      return;
    }

    metaTags.push(tag);
  });

  site.metaTags.forEach((tag) => {
    if (metaTags.find((t) => t.field === tag.field && t.value === tag.value)) {
      return;
    }
    metaTags.push(tag);
  });

  let strList = [
    favicon && `<link rel="icon" href="${favicon}" />`,
    `<title>${title}</title>`,
    `<meta name="title" content="${title}" />`,
    `<meta name="description" content="${description}" />`,
    canonical && `<link rel="canonical" href="${canonical}" />`,
  ];

  metaTags.forEach((tag) => {
    // { field: 'rel', value: 'canonical', content: 'https://www.example.com' }
    if (tag.field === 'rel' && tag.value === 'canonical') {
      return;
    }
    // <meta name="robots" content="noindex">
    strList.push(`<meta ${tag.field}="${tag.value}" content="${tag.content}" />`);
  });

  return strList.filter(Boolean).join('\n');
};
