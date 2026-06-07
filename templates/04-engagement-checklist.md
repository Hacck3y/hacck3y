# Pre-Engagement Checklist (use every time)

Copy this checklist per client. Do not start testing until every required item is done.

---

## Client: [CLIENT_COMPANY]
## Engagement ID: [ENG-2026-XXX]
## Date opened: [DATE]

### Qualification (before sending paperwork)

- [ ] Client uses company email (not only free Gmail) — or acceptable reason documented  
- [ ] Client owns app or confirms written authorization  
- [ ] Scope is web/API (matches your skills)  
- [ ] Budget aligns with your minimum fee  
- [ ] Red flags cleared (see below)  

**Red flags — walk away if:**

- [ ] Refuses any written authorization  
- [ ] "Test first, pay if you find bugs"  
- [ ] Won't give company name or real URL  
- [ ] Asks to test someone else's site without proof of permission  
- [ ] Pushes production testing with zero paperwork  

---

### Paperwork (in this order)

1. [ ] Scope call done — notes saved  
2. [ ] **Mutual NDA** sent (`01-mutual-nda.md`)  
3. [ ] **Rules of Engagement** sent (`02-rules-of-engagement.md`) — URLs filled in  
4. [ ] **Statement of Work** sent (`03-statement-of-work.md`) — price & dates filled in  
5. [ ] Client signed all three (PDF or DocuSign)  
6. [ ] You countersigned  
7. [ ] Signed copies saved in: `[CLIENT_FOLDER]`  

---

### Payment

- [ ] Deposit amount: $[____]  
- [ ] Deposit received — date: [____] — method: [____]  
- [ ] Balance: $[____] — due before final report  

---

### Access (after deposit)

- [ ] Staging/production URLs match RoE exactly  
- [ ] Test accounts received  
- [ ] API docs / Swagger (if API in scope)  
- [ ] Emergency contact confirmed  

---

### Testing

- [ ] Notified client 24h before active testing  
- [ ] Testing only inside RoE window & targets  
- [ ] Critical finding comms ready if needed  

---

### Delivery

- [ ] Draft report (optional: watermarked until paid)  
- [ ] Balance received  
- [ ] Final PDF report sent  
- [ ] Walkthrough call (if in SOW)  
- [ ] Credentials deleted from your machine  
- [ ] Invoice / receipt sent  

---

## Quick email script (after form submission)

```
Subject: Pentest scope — next steps [CLIENT_COMPANY]

Hi [NAME],

Thanks for reaching out. Based on your scope ([URL], [SERVICE]), I'd recommend the [PACKAGE] engagement.

Next steps:
1. Short scope call (15 min) — [CALENDAR LINK or propose times]
2. I send NDA + Rules of Engagement + Statement of Work
3. You sign + deposit
4. Testing scheduled for [DATES]
5. Report within [X] days after testing

I only perform authorized testing — the RoE lists exact URLs and requires your signature confirming authorization.

— hacck3y
hacck3y@proton.me
```

---

## Placeholders cheat sheet

| Placeholder | What to put |
|-------------|-------------|
| `[CONSULTANT_NAME]` | Your legal name OR "Hacck3y" / sole prop business name |
| `[CLIENT_COMPANY]` | Their company legal name |
| `[ENG-2026-001]` | Increment per client: 002, 003… |
| `[DATE]` | Signing date |
| `[AMOUNT]` | Agreed fee in USD or INR |

---

*Keep one folder per client: `clients/[company-name]/signed-pdfs/` on an encrypted drive.*