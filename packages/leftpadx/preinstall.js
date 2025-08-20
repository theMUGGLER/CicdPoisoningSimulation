// Harmless preinstall side-effect for demo purposes.
// Creates artifacts/pwned.txt and logs a few non-sensitive env details.

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve project root (two levels up from this file: packages/leftpadx/)
const root = resolve(__dirname, '..', '..');
const artifactsDir = resolve(root, 'artifacts');
if (!existsSync(artifactsDir)) {
  mkdirSync(artifactsDir, { recursive: true });
}

const info = [
  '*** CI Poisoning Demo — Harmless Preinstall ***',
  `Timestamp: ${new Date().toISOString()}`,
  `Runner OS: ${process.env.RUNNER_OS || 'unknown'}`,
  `Repo: ${process.env.GITHUB_REPOSITORY || 'local'}`,
  `Workflow: ${process.env.GITHUB_WORKFLOW || 'local'}`,
  'This file proves that a dependency script ran during install.'
].join('\n');

writeFileSync(resolve(artifactsDir, 'pwned.txt'), info + '\n', 'utf8');
console.log('[leftpadx] Wrote artifacts/pwned.txt');
