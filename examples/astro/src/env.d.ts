/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// interface Window {
//   $d: (date?: Date) => Date;
//   Versoly: import("versoly-ui");
// }

// global {
//   interface Window {
//     $d: (date?: Date) => Date;
//     Versoly: import("versoly-ui");
//   }
// }
global {
  interface Window {
    vDelayed: Record<string, any>;
    vLoadedDelayed: Record<string, any>;
    vGetElementsByToggle: (toggleName: string) => Element[];
    vGetElementOptions: (elem: HTMLElement) => Record<string, any>;
  }
}
export {};
