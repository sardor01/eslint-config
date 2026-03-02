import { RequireCJS } from 'rolldown-plugin-require-cjs';
import type { AttwOptions, PublintOptions, TsdownInputOption, WithEnabled } from 'tsdown';
import { mergeConfig, type UserConfig } from 'tsdown/config';

interface LibOptions {
  entry?: 'index' | 'shallow' | 'all' | Exclude<TsdownInputOption, string>;
  inlineDeps?: (string | RegExp)[];
}

const lib = ({ entry = 'index', inlineDeps = [] }: LibOptions = {}, overrides: UserConfig = {}): UserConfig => {
  return mergeConfig(
    {
      entry:
        entry === 'index' ? 'src/index.ts' : entry === 'shallow' ? 'src/*.ts' : entry === 'all' ? 'src/**/*.ts' : entry,
      dts: true,
      platform: 'neutral',
      deps: {
        onlyAllowBundle: inlineDeps,
      },
      exports: true,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publint: {
        enabled: 'ci-only',
        resolvePaths: [import.meta.dirname],
      } as WithEnabled<PublintOptions>,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      attw: {
        enabled: 'ci-only',
        resolvePaths: [import.meta.dirname],
        profile: 'esm-only',
      } as WithEnabled<AttwOptions>,
    },
    overrides,
  );
};

const nodeLib = (options: LibOptions = {}, overrides: UserConfig = {}): UserConfig => {
  return lib(options, {
    platform: 'node',
    ...overrides,
  });
};

export default nodeLib(
  {},
  {
    plugins: [RequireCJS()],
  },
);
