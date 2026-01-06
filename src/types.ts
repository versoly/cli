import { GetSiteResponse, ListComponentsResponse, ListPagesResponse } from 'versoly-js-client';

export type VersolySite = GetSiteResponse;
export type VersolyPage = ListPagesResponse['data'][number];
export type VersolyComponent = ListComponentsResponse['data'][number];

export type VersolyFile = {
  type: 'page' | 'component' | 'file';
  path: string;
  content: string | object;
  extension: 'astro' | 'html' | 'css' | 'json' | 'js' | 'mjs' | 'ts' | 'txt' | '';
  plugins?: string[];
};

export type VersolyUIConfig = {
  colors: Record<string, any>;
  components: Record<string, string>;
  theme: {
    extend: {
      colors: Record<string, any>;
    };
  };
  variables: Record<string, string>;
  rules: Array<[string, string]>;
  variants: Record<string, any>;
  darkMode: string | boolean;
};
