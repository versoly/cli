import { z } from 'zod';

// https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/registry/schema.ts#L196
export const registryItemTypeSchema = z.enum([
  'registry:lib',
  'registry:block',
  'registry:component',
  'registry:ui',
  'registry:hook',
  'registry:page',
  'registry:file',
  'registry:theme',
  'registry:style',
  'registry:item',
  'registry:base',
  'registry:font',

  // Internal use only.
  'registry:example',
  'registry:internal',
]);

export const registryItemFileSchema = z.discriminatedUnion('type', [
  // Target is required for registry:file and registry:page
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: z.enum(['registry:file', 'registry:page']),
    target: z.string(),
  }),
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: registryItemTypeSchema.exclude(['registry:file', 'registry:page']),
    target: z.string().optional(),
  }),
]);

// Common fields shared by all registry items.
export const registryItemCommonSchema = z.object({
  $schema: z.string().optional(),
  extends: z.string().optional(),
  name: z.string(),
  title: z.string().optional(),
  author: z.string().min(2).optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  // tailwind: registryItemTailwindSchema.optional(),
  // cssVars: registryItemCssVarsSchema.optional(),
  // css: registryItemCssSchema.optional(),
  // envVars: registryItemEnvVarsSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

// registry:base has a config field, registry:font has a font field.
export const registryItemSchema = z.discriminatedUnion('type', [
  // registryItemCommonSchema.extend({
  //   type: z.literal('registry:base'),
  //   config: rawConfigSchema.deepPartial().optional(),
  // }),
  // registryItemCommonSchema.extend({
  //   type: z.literal('registry:font'),
  //   font: registryItemFontSchema,
  // }),
  registryItemCommonSchema.extend({
    type: registryItemTypeSchema.exclude(['registry:base', 'registry:font']),
  }),
]);

export type RegistryItem = z.infer<typeof registryItemSchema>;

// name: 'versoly-data-toggles'
// type: 'registry:lib'
// title: 'Versoly Data Toggles'
// description: 'A utility to manage data toggles on elements.'
// files:
//   - path: 'utils/data-toggles.ts'
//     type: 'registry:lib'
//     target: '~/utils/data-toggles.ts'
//     content: %js
