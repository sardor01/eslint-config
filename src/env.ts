import process from 'node:process';

const cwd = process.cwd();
const isPackageExists = (name: string): boolean => {
  try {
    require.resolve(name, { paths: [cwd] });
    return true;
  } catch {
    return false;
  }
};

export const hasTailwindCss = (): boolean => isPackageExists('tailwindcss');
export const hasTypeScript = (): boolean => isPackageExists('typescript');
export const hasVue = (): boolean => isPackageExists('vue') || isPackageExists('nuxt') || isPackageExists('vitepress');

export const isInEditorEnv = (): boolean => {
  if (process.env.CI) return false;
  if (isInGitHooksOrLintStaged()) return false;
  return !!(
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM
  );
};

export const isInGitHooksOrLintStaged = (): boolean => {
  return !!(
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  );
};
