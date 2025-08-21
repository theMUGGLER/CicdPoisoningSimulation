// scripts/policy-check.js (CommonJS version)
const fs = require('fs');
const path = require('path');

const sbomPath = process.argv[2] || 'app/bom.json';
const allowlistPath = process.argv[3] || 'policy/allowlist.json';

function loadJson(p) {
  return JSON.parse(fs.readFileSync(path.resolve(p), 'utf8'));
}

const sbom = loadJson(sbomPath);
const allow = loadJson(allowlistPath);

const allowedNames = new Set(allow.allowedNames || []);
const allowedPurls = new Set(allow.allowedPurls || []);

const components = (sbom.components || []).map(c => ({
  name: c.name,
  version: c.version,
  purl: c.purl || ''
}));

const violations = [];
for (const c of components) {
  const ok = allowedNames.has(c.name) || (c.purl && allowedPurls.has(c.purl));
  if (!ok) violations.push(c);
}

if (violations.length) {
  console.error('❌ Policy violation: unexpected components found in SBOM:');
  for (const v of violations) {
    console.error(` - ${v.name}@${v.version} ${v.purl ? '(' + v.purl + ')' : ''}`);
  }
  console.error('\nTo allow, add names to policy/allowlist.json -> "allowedNames" or specific "allowedPurls".');
  process.exit(1);
} else {
  console.log('✅ Policy OK: all components are allowlisted.');
}
