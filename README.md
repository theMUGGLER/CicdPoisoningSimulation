# CI/CD Pipeline Poisoning — Safe Simulation (with SBOM)

This project shows how a dependency's install script can run inside CI, and how to block it.
It also adds a **CycloneDX SBOM** job to inventory your dependencies.

## What you'll see
- **insecure** job: `npm ci` runs lifecycle scripts → creates `artifacts/pwned.txt`.
- **secure** job: `npm ci --ignore-scripts` blocks scripts → no `pwned.txt`.
- **sbom** job: Generates `bom.xml` (CycloneDX SBOM) so you can review dependencies.

## CycloneDX SBOM — what's the job?
An SBOM (Software Bill of Materials) is a **parts list** for your software:
- Lists every dependency (name, version, supplier).
- Helps identify known-vulnerable or malicious packages.
- Enables policy checks: fail builds when unexpected packages appear.
CycloneDX is a widely-used **standard format** for SBOMs, so scanners and policy tools can read it.

## Structure
```
.
├── app/
│   ├── index.js
│   └── package.json       # depends on ../packages/leftpadx (local file dependency)
├── packages/
│   └── leftpadx/
│       ├── package.json   # has a harmless "preinstall" script
│       ├── preinstall.js  # writes artifacts/pwned.txt
│       └── index.js
├── artifacts/             # build artifacts (captured by CI)
└── .github/workflows/ci.yml
```

## Run locally (optional)
```bash
cd app
npm ci                  # insecure (runs scripts)
# or
npm ci --ignore-scripts # secure (blocks scripts)
node index.js
```

## Use on GitHub
1. Create a new repo and push these files.
2. Open **Actions** to see 3 jobs: insecure / secure / sbom.
3. Download artifacts to inspect `pwned.txt` (insecure) and `bom.xml` (sbom).
