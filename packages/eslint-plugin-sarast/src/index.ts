import noImportDist from './rules/no-import-dist';
import noImportNodeModulesByPath from './rules/no-import-node-modules-by-path';

export default {
  rules: {
    'no-import-dist': noImportDist,
    'no-import-node-modules-by-path': noImportNodeModulesByPath,
  },
};
