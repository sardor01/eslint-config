import { isPackageExists } from 'local-pkg';
import process from 'node:process';

export const isInEditor = !!(
  (process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM) &&
  !process.env.CI
);
export const hasTypeScript = isPackageExists('typescript');
export const hasVue = isPackageExists('vue') || isPackageExists('nuxt') || isPackageExists('vitepress');
