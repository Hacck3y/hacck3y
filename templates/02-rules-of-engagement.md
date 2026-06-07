# RULES OF ENGAGEMENT (AUTHORIZATION)

**Engagement ID:** [ENG-2026-001]  
**Effective Date:** [DATE]  
**Testing Window:** [START_DATE] to [END_DATE]  
**Time Zone:** [TIMEZONE]

---

## Parties

**Authorized Tester**  
[CONSULTANT_NAME] · hacck3y@proton.me  
("Consultant")

**Authorizing Organization**  
[CLIENT_COMPANY]  
Authorized Signatory: [CLIENT_CONTACT_NAME], [CLIENT_CONTACT_TITLE]  
Email: [CLIENT_EMAIL]  
("Client")

---

## 1. Authorization Statement

Client confirms it **owns or has explicit written authority** to authorize security testing against the targets listed in Section 2.

Client hereby authorizes Consultant to perform **passive and active security testing** only against those targets, during the Testing Window, under the constraints in this document.

**Unauthorized testing is illegal.** Consultant will not test anything not listed below.

---

## 2. In-Scope Targets

| # | Target | Type | Environment | Notes |
|---|--------|------|-------------|-------|
| 1 | [https://app.example.com] | Web Application | [ ] Production [ ] Staging | |
| 2 | [https://api.example.com] | API | [ ] Production [ ] Staging | |
| 3 | [ADD OR DELETE ROWS] | | | |

**Out of scope (explicitly forbidden unless added by written amendment):**

- [ ] Third-party services (Stripe, Auth0, etc.) — *testing only Client's integration*
- [ ] Denial of Service (DoS/DDoS) attacks
- [ ] Social engineering against Client employees
- [ ] Physical security testing
- [ ] Other: [LIST ANYTHING ELSE]

---

## 3. Allowed Testing Methods

Consultant may use industry-standard penetration testing techniques including:

- Manual and automated vulnerability assessment  
- Authentication and session testing  
- Authorization / IDOR / privilege escalation testing  
- Business logic testing  
- API security testing  
- Limited exploitation to prove impact (no data destruction, no ransomware simulation)

**Prohibited without separate written approval:**

- Deleting or corrupting production data  
- Modifying user accounts belonging to real customers (use test accounts only)  
- Mass scraping of PII  
- Pivoting to infrastructure not listed in Section 2  

---

## 4. Test Accounts & Credentials

Client will provide:

| Role | Username / Email | Notes |
|------|------------------|-------|
| Standard user | [PROVIDED BY CLIENT] | |
| Admin (if in scope) | [PROVIDED BY CLIENT] | |
| API key / token | [PROVIDED BY CLIENT] | |

Client confirms test accounts are for **non-production users** or Client accepts risk for production test accounts: [ ] Yes [ ] N/A

Credentials will be transmitted via: [ ] Encrypted email [ ] Password manager share [ ] Other: _______

Consultant will delete credentials within **30 days** of engagement end.

---

## 5. Testing Schedule & Communication

| Item | Detail |
|------|--------|
| Primary contact | [CLIENT_CONTACT_NAME] — [CLIENT_EMAIL] |
| Emergency contact (critical findings) | [EMERGENCY_NAME] — [EMERGENCY_EMAIL / PHONE] |
| Business hours for active testing | [e.g., Mon–Fri 10:00–18:00 IST] |
| Notice before testing | Consultant will notify Client **[24 hours]** before active testing begins |

**Critical finding:** If Consultant discovers an actively exploited vulnerability or immediate risk of data breach, Consultant will notify the Emergency contact **within 24 hours** (sooner if possible).

---

## 6. Data Handling

- Consultant will minimize collection of personal data  
- Screenshots will redact unnecessary PII where possible  
- Findings stored encrypted at rest on Consultant's systems  
- No Client data uploaded to public cloud AI tools without Client consent  

---

## 7. Liability & Limitations

Consultant performs testing on a **best-effort basis**. No penetration test can guarantee discovery of all vulnerabilities.

Client is responsible for:

- Backups before testing (especially staging/production)  
- Ensuring authorization is valid for all listed targets  
- Monitoring systems during the Testing Window  

Consultant is not liable for downtime caused by **responsible** security testing unless caused by gross negligence or intentional harm outside this RoE.

Maximum liability for this engagement is limited to **fees paid** under the related Statement of Work, unless prohibited by applicable law.

---

## 8. Changes to Scope

Any target, method, or date change requires a **written amendment** (email confirmation from both Parties is acceptable) before testing expands.

---

## 9. Signatures

By signing, Client confirms legal authority to authorize testing on listed targets.

| | Consultant | Client |
|---|------------|--------|
| **Name** | [CONSULTANT_NAME] | [CLIENT_CONTACT_NAME] |
| **Title** | Independent Security Consultant | [CLIENT_CONTACT_TITLE] |
| **Signature** | _________________________ | _________________________ |
| **Date** | _________________________ | _________________________ |

---

*Attach or reference the signed Mutual NDA ([ENG-ID]). Testing must not begin until NDA, RoE, and SOW deposit terms are satisfied.*