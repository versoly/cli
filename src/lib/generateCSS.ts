import { VersolyUIConfig } from 'src/types';

const newline = '\n';

export const generateCSSFor = {
  'versoly-ui': (config: VersolyUIConfig) => {
    let { colors, components, theme, variables, rules = [], variants, darkMode } = config;
    let preflight: Record<string, string> = {};

    components['.d-js'] = 'hidden';

    Object.entries(components).forEach(([cKey, cValue]) => {
      if (!cKey.includes('{color}')) {
        preflight['' + cKey] = cValue;
        return;
      }

      Object.entries(colors).forEach(([key, value]) => {
        let compClasses = '';
        cValue.split(' ').forEach((classValue) => {
          classValue = classValue.trim();

          if (!classValue.match(/{(.*?)}/g)) {
            compClasses += ' ' + classValue;
            return;
          }

          let [k, v] = classValue.slice(1, classValue.length - 1).split('=');

          if (!v) {
            return;
          }

          if (v.includes("'")) {
            compClasses += ' ' + k + '-' + '[' + v.slice(1, v.length - 1) + ']';
            return;
          }

          let computedV = value;
          v.split('.').forEach((vSplit) => {
            computedV = computedV[vSplit] || computedV;
          });

          if (!computedV.includes) {
            return;
          }
          compClasses += ' ' + k + '-' + computedV;
        });

        if (preflight[cKey.replaceAll('{color}', key)]) {
          return;
        }

        preflight[cKey.replaceAll('{color}', key)] = compClasses;
      });
    });

    const colorKeys = Object.keys(colors);

    const getOrderValue = (key: string) => {
      if (key.startsWith('.') && !key.includes('-')) {
        return -200;
      } else if (key.includes(':where(')) {
        return 100;
      } else if (key.startsWith('.') && key.includes('-') && colorKeys.some((c) => key.includes(c))) {
        return -100;
      } else if (key.startsWith('.')) {
        return 200;
      }
      return 200;
    };

    let preflightList = Object.entries(preflight)
      .sort((a, b) => {
        return getOrderValue(a[0]) - getOrderValue(b[0]) || a[0].localeCompare(b[0]);
      })
      .map(([key]) => [key, preflight[key]]);

    rules.forEach((r) => {
      if (preflightList.find((p) => p[0] === '.' + r[0])) {
        return;
      }

      preflightList.push(['.' + r[0], r[1]]);
    });

    preflightList = preflightList.map(([key, value]) => {
      if (value.includes('override')) {
        value = value.replaceAll('override:', '');
      }

      return [key, value];
    });

    const containerRule = preflightList.find(([key]) => key === '.container')?.[1] || '';

    preflightList = preflightList.map(([key, value]) => {
      if (value.includes('override')) {
        value = '';
      }

      return [key, value];
    });

    preflightList = preflightList.filter(([key, value]) => {
      if (key === '.container') {
        return false;
      }

      if (!value) {
        return false;
      }
      return true;
    });

    const variablesCSS = Object.entries(variables).map(([key, value]) => key + ':' + value + ';');

    let rootVariables = '';
    if (config.variables) {
      rootVariables = Object.entries(config.variables)
        .map(([variableKey, variableValue]) => {
          return '  ' + variableKey + ': ' + variableValue + ';';
        })
        .join(newline);

      rootVariables = newline + ':root, :host {' + newline + rootVariables + newline + '}';
    }

    let cssVars: string[] = [];
    Object.entries(config.theme.extend.colors).map(([k, v]) => {
      if (typeof v === 'string') {
        cssVars.push(`--color-${k}: ${v}`.replace('-DEFAULT', ''));
        return;
      }
      Object.entries(v).map(([kk, vv]) => {
        cssVars.push(`--color-${k}-${kk}: ${vv}`.replace('-DEFAULT', ''));
      });
    });

    // !md:h-auto
    return [
      // `@import "tailwindcss";`,
      // `@plugin "@tailwindcss/typography";`,
      rootVariables,
      `@theme {
  ${cssVars.join(';' + newline + '  ')}
}`,
      // @source not inline("container");
      `@utility container {
  @apply ${containerRule}
}`,
      '@layer components.l1.l2 {',
      preflightList.map(([key, value]) => key + ' {\n    @apply ' + value + ';\n  }').join(newline),
      '}',
    ].join(newline);
  },
};
