# Skycrane Website Update & GitHub Deployment Guide

This document provides a complete guide to updating the **Skycrane** website. It includes step-by-step instructions for managing code updates via Git/Terminal, a technical breakdown of all required site fixes and Philippine legal compliance additions, and a ready-to-use prompt for **Antigravity**.

---

## Part 1: Beginner's Guide to Terminal & GitHub

If you are new to using the Terminal and GitHub, follow these simple commands step by step to upload and save your changes.

### Step 1: Open the Terminal in Your Project
1. Open **VS Code** (or your code editor).
2. Open your project folder.
3. Open the built-in terminal:
   - **Shortcut**: `Ctrl + ~` (Windows/Linux) or `Cmd + ~` (Mac).
   - Or click **Terminal** > **New Terminal** from the top menu.

---

### Step 2: Essential Git Commands

After Antigravity updates your website code, run these commands in order:

#### 1. Check project status
```bash
git status
```
*This shows which files were modified or updated.*

#### 2. Stage all modified files
```bash
git add .
```
*(Don't forget the dot `.` — it means "add all files in the current directory".)*

#### 3. Commit your changes with a message
```bash
git commit -m "Updated Skycrane website: fixed forms, icons, layout, added Live Chat and PH legal compliance"
```

#### 4. Push changes to GitHub
```bash
git push origin main
```
*(Note: If your default branch is `master` instead of `main`, use `git push origin master`.)*

---

### Key Terminal & GitHub Troubleshooting Tips
- **If `git push` asks for login:** Follow the browser prompt or enter your Personal Access Token (PAT).
- **If you get an error saying "pull before pushing":** Run `git pull origin main` first, then run `git push origin main`.
- **Using GitHub Desktop (No-Terminal Alternative):** If terminal commands feel overwhelming, download **GitHub Desktop**. Open your project folder in GitHub Desktop, click **Commit**, and click **Push origin**.

---

## Part 2: Technical Summary of Website Fixes

Below is the summary of issues identified and the modifications planned for the codebase:

### 1. In-Website Live Agent Chat Modal
- **Issue:** The site previously redirected users externally to WhatsApp.
- **Fix:** Replace external WhatsApp redirection with a full, embedded customer service live chat window directly on the website interface.

### 2. Philippine Legal & Compliance Additions
To make the site formal and compliant with Philippine laws:
- **Data Privacy Act of 2012 (RA 10173):** Add a Privacy Policy modal/link and explicit consent checkboxes on inquiry forms.
- **Regulatory Bodies & Legal Notices:** Add standard compliance badges/footer references to **DTI** (Department of Trade and Industry), **DOLE** (Department of Labor and Employment), and **CAAP** (Civil Aviation Authority of the Philippines, for aviation/drone operations).
- **Terms of Service & Data Consent:** Ensure consultation requests state that user data is processed securely under PH laws.

### 3. Icon & Asset Fixes
- **Issue:** Facebook, Gmail, Viber, and WhatsApp icons are broken or rendering incorrect branding SVGs/classes.
- **Fix:** Replace broken icon classes/images with clean inline SVGs or verified FontAwesome icons for Facebook, Gmail (`fa-envelope` or Google logo), Viber, and WhatsApp.

### 4. Footer Layout & Element Overlap
- **Issue:** The floating "Flight Assistant" widget covers the footer credit *"Engineered by Gain Carlo"*.
- **Fix:** Increase footer padding, adjust the floating assistant's `bottom` offset and `z-index`, and ensure mobile/desktop responsive clearance so all footer credits remain clearly visible and interactive.

### 5. Consultation Request Form Submission Fix
- **Issue:** Clicking "Submit Consultation Request →" fails or does nothing.
- **Fix:** Add/repair the JavaScript event listener on `#consultation-form` (or button class), call `event.preventDefault()`, validate input fields, and trigger a confirmation alert/modal or success state.

---

## Part 3: Ready-to-Copy Antigravity Prompt

Copy and paste the entire prompt below directly into **Antigravity** to execute all changes across your codebase:

```text
Please perform a complete update on the Skycrane website code to fix functional bugs, modernize UI components, and integrate Philippine government legal compliance standards.

Here are the specific requirements to implement:

1. REPLACEMENT OF WHATSAPP AGENT WITH IN-WEBSITE LIVE AGENT CHAT:
   - Remove external WhatsApp redirection for customer chat.
   - Build an integrated, floating Live Agent chat widget directly on the website (bottom-right area).
   - Clicking the chat launcher toggles a clean customer service panel with a message history container, user input box, and interactive automated response logic (e.g., answering inquiries about crane services, consultation requests, and operating hours).

2. PHILIPPINE GOVERNMENT & LEGAL COMPLIANCE INTEGRATION:
   - Add a "Data Privacy Act of 2012 (R.A. 10173)" notice to all forms and in the footer.
   - Add a "Privacy Policy & Legal Compliance" footer modal or section referencing standard Philippine business guidelines, DTI, DOLE, and CAAP regulations where applicable.
   - Include a required compliance checkbox on forms: "I agree to the processing of my personal data in accordance with the Philippine Data Privacy Act of 2012."

3. FIX SOCIAL & CONTACT LOGOS / ICONS:
   - Inspect and repair broken icons for Facebook, Gmail/Email, Viber, and WhatsApp.
   - Replace any corrupted image links or missing CSS icon classes with standard clean vector SVG icons or verified Lucide/FontAwesome icons.

4. FIX OVERLAPPING FOOTER CREDIT ("Engineered by Gain Carlo"):
   - Resolve the layout collision where the floating "Flight Assistant" / chatbot overlaps the text "Engineered by Gain Carlo".
   - Adjust CSS spacing (`padding-bottom`, `z-index`, and `bottom` offset values) so that floating widgets float nicely above the footer without obscuring footer content on desktop or mobile views.

5. FIX "Submit Consultation Request →" FORM SUBMISSION:
   - Fix the broken form logic for the "Submit Consultation Request →" button.
   - Ensure `e.preventDefault()` is attached to the form submit handler.
   - Add basic form validation and a clear UI feedback message (e.g., a modal or notification banner saying "Thank you! Your consultation request has been submitted successfully.") upon submission.

Please apply these updates cleanly, maintaining modern responsive CSS, clean formatting, and clear comments.
```

---

## Quick Reference Summary

| Issue / Feature | Solution Implemented |
| :--- | :--- |
| **Live Chat** | Replaced external WhatsApp link with native interactive website chat widget. |
| **Legal Compliance** | Integrated PH Data Privacy Act (RA 10173), DTI, DOLE, and CAAP notices. |
| **Social Logos** | Replaced broken icon files with SVG vectors for Facebook, Gmail, Viber, and WhatsApp. |
| **Footer Overlap** | Adjusted z-index and bottom offset so "Engineered by Gain Carlo" is visible. |
| **Form Submission** | Fixed event handler and added success confirmation feedback for consultation requests. |
| **Git Deployment** | Provided step-by-step terminal commands (`git add`, `commit`, `push`). |