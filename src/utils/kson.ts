import { Kson, Result, FormatOptions, IndentType, FormattingStyle } from '@kson_org/kson';

const kson = Kson.getInstance();

export const KSON = {
  parse: (input: string) => {
    const result = kson.toJson(input);
    if (result instanceof Result.Success) {
      return JSON.parse(result.output);
    } else {
      throw new Error('Failed to parse KSON');
    }
  },
  stringify: (jsObject: any) => {
    const input = JSON.stringify(jsObject);
    const options = new FormatOptions(new IndentType.Spaces(2), FormattingStyle.PLAIN);
    const formatted = kson.format(input, options);
    return formatted;
  },
  toJson: (input: string) => {
    const result = kson.toJson(input);
    if (result instanceof Result.Success) {
      return result.output;
    } else {
      throw new Error('Failed to convert KSON to JSON');
    }
  },
};
