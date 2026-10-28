# Rohit Chhikara · hacck3y

**Security researcher, bug bounty hunter, and open-source builder.**

I investigate how applications fail, report what I find, and build tools that make security work more useful.

[Portfolio](https://hacck3y.me/) · [Writing](https://blogs.hacck3y.me/) · [X](https://x.com/hacck3y) · [HackerOne](https://hackerone.com/hacck3y) · [Bugcrowd](https://bugcrowd.com/h/hacck3y) · [Email](mailto:hacck3y@proton.me)

## What I do

- **Investigate:** web applications, APIs, authorization flaws, and exposed data.
- **Explore:** Active Directory, Windows authentication, and attack paths.
- **Build:** open-source tooling for security research and AI agent workflows.
- **Share:** practical write-ups, lab walkthroughs, and lessons from the field.

Linux user. Self-hoster. Self-taught, and always learning. Responsible disclosure comes first.

## Recognition

- **[Google Bug Hunters Hall of Fame](https://bughunters.google.com/profile/93c74b30-79c4-4d0a-874f-5653e438bc6c)** — recognized for responsible vulnerability disclosure.
- **[Smackdab Hall of Fame](https://bounty.smackdab.ai/hall-of-fame)** — 6 valid findings, 70 points, and a Founding Hunter badge; ranked #2 as of October 28, 2026.
- **CERT-In & NCIIPC** — 10+ formal appreciations for responsible disclosures affecting government and critical infrastructure systems.
- **Certified Red Team Analyst (CRTA)** — Active Directory attack paths and post-exploitation.
- **Hands-on practice** — 80+ Hack The Box machines and 100+ TryHackMe rooms.

## Selected disclosures

| Research | Outcome |
| --- | --- |
| [Sellary — stored XSS](https://x.com/hacck3y/status/2075491453321502869) | Potential account-takeover impact; patched within two days of disclosure, with a public acknowledgment. |
| CJP Legal Aid — data exposure | Reported an exposed directory endpoint containing personal information; the endpoint was removed following the report. |
| [Higher education admissions — IDOR](https://blogs.hacck3y.me/posts/haryana-higher-education-admissions-id-or/) | Unauthenticated access to student documents and academic records; coordinated through CERT-In and fixed before publication. |

## Things I've built

### [ptk](https://github.com/hacck3y/ptk)

A Rust CLI proxy that turns noisy terminal output into compact summaries for AI coding and security agents. Designed to reduce context clutter while keeping useful findings visible.

### [Developer FM](https://developerfm.vercel.app/)

A small radio-style music experience for late-night coding sessions.

## Skills & tools

- **Web & API security:** IDOR / BOLA, stored XSS, SSRF, path traversal, and Git / secret exposure.
- **Research workflow:** Burp Suite, Caido, nuclei, ffuf, and reconnaissance tooling.
- **Active Directory:** BloodHound, Impacket, Evil-WinRM, and privilege-escalation analysis.
- **Building:** Rust tooling, Python, Bash, Git, Linux, and Docker.

## Selected writing

- [Exposed .git: From Zero to Full Source Recovery](https://x.com/hacck3y/status/2070930570662809882) — source recovery, secret discovery, and responsible reporting.
- [HTB Nexus: Git Template Sync Path Traversal to Root](https://blogs.hacck3y.me/posts/day_1_htb/) — a lab walkthrough from leaked credentials to root access.
- [You Are Never Browsing Alone](https://blogs.hacck3y.me/posts/you-are-never-browsing-alone/) — cross-device tracking and data brokers.
- [ExpressionEngine Preview Flaw](https://blogs.hacck3y.me/posts/expressionengine-live-preview-mass-assignment/) — unintended access to private drafts and hidden content.

[More field notes →](https://blogs.hacck3y.me/)

---

**Have research to share or a project to discuss?** Reach me at [hacck3y@proton.me](mailto:hacck3y@proton.me).
