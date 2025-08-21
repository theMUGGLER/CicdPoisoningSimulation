# CICD Poisoning Simulation

This project demonstrates how attackers can exploit insecure CI/CD pipelines, and how to mitigate those risks using **SBOMs (Software Bill of Materials)** and **OSV (Open Source Vulnerability) scanning**.

---

## 🚨 Insecure Workflow
The insecure workflow shows how malicious code (like a `postinstall` script) can sneak into the pipeline through dependencies.  
- Example: A fake dependency writes a `pwn.txt` file to simulate an attack.  
- Since the workflow does not verify dependencies, the malicious code runs without detection.

---

## ✅ Secure Workflow (SBOM + Policy)
We add extra steps to detect tampering and vulnerabilities:
1. **SBOM Generation**  
   - SBOM (Software Bill of Materials) is like an ingredient list for your software.
   - We use [CycloneDX](https://cyclonedx.org/) to generate a `bom.json` file listing all dependencies.

2. **Allowlist Policy Check**  
   - We compare the generated SBOM with an `allowlist.txt` (trusted dependencies).  
   - If any dependency not on the list is found → **build fails**.

3. **OSV Vulnerability Scanning**  
   - We use [Google OSV-Scanner](https://osv.dev/) to check the SBOM/lockfile against a public database of known vulnerabilities.
   - If vulnerabilities are found → **build fails**.

---

## 📂 Workflows
The following workflows are included:
- `.github/workflows/insecure.yml` → shows a poisoned pipeline (malicious dependency runs).  
- `.github/workflows/secure.yml` → adds SBOM generation + allowlist check.  
- `.github/workflows/osv.yml` → runs OSV-Scanner on the SBOM/lockfile.

---

## 🔍 Current Progress
- [x] Simulated insecure build (with malicious dependency writing `pwn.txt`).  
- [x] Added **SBOM generation** step using CycloneDX.  
- [x] Added **allowlist policy** to block unknown dependencies.  
- [x] Integrated **OSV-Scanner GitHub Action** to detect vulnerabilities in dependencies.  
- [ ] Future work: Add **CodeQL** or **Trivy** scanning for container images.

---

## 🛠️ How to Reproduce
1. Clone the repo:
   ```bash
   git clone https://github.com/theMUGGLER/CicdPoisoningSimulation.git
   cd CicdPoisoningSimulation
   ```

2. Push code to trigger GitHub Actions workflows.  
   - `insecure.yml` → pipeline gets poisoned (`pwn.txt` created).  
   - `secure.yml` → pipeline blocks unknown dependencies.  
   - `osv.yml` → pipeline scans for vulnerabilities.

3. View results in the GitHub Actions tab or Security tab.

---

## 📊 Example Outputs
- **Insecure build:** `pwn.txt` created in artifacts.  
- **Secure build:** Workflow fails if a dependency is not in the allowlist.  
- **OSV scan:** No issues found (currently) → visible in GitHub Security tab.

---

## 🧠 Key Learnings
- Always verify dependencies (don’t trust blindly).  
- SBOMs provide visibility into what’s inside your software.  
- OSV scanning ensures you don’t use vulnerable packages.  
- CI/CD pipelines are **prime targets** for attackers → securing them is critical.

---

## 🔮 Next Steps
- Add container scanning (Trivy).  
- Add secret scanning.  
- Add CodeQL analysis for code vulnerabilities.  
