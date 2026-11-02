# SkyCrane Mobility — Form Notification Email Template Update

**Date:** November 2, 2026  
**Subject:** Implementation of Responsive Notification Email Template for Website Forms  
**Recipient:** Antigravity Engineering / Backend Team  

---

## 1. Executive Summary

We have created and finalized a standardized, production-ready HTML email template for **SkyCrane Mobility** incoming website notifications. This template supports both low-friction actions (e.g., newsletter subscriptions) and high-touch requests (e.g., Mission Consultation submissions).

---

## 2. Template Highlights & Features

* **Cross-Client Compatibility:** Clean table-based layout built for max delivery consistency across major email clients (Gmail, Outlook, Apple Mail, Zoho Mail).
* **Brand Styling:** Embedded SkyCrane Mobility header branding, logo slot, dark top bar (`#0f172a`), and branded accent callouts (`#2563eb`).
* **Flexible Data Layout:** Structured key-value grid for metadata (`Request Type`, `Corporate Email`, `Submission Date`).
* **Dynamic Scope/Notes Box:** Formatted styled callout block specifically for detailed mission consultation notes or user comments.
* **Responsive Layout:** Constrained to a `600px` max-width container with responsive scaling for mobile viewports.

---

## 3. Dynamic Field Mapping Guide

When wiring this template into your backend mailer (e.g., SendGrid, Nodemailer, AWS SES, Postmark, etc.), replace the static sample content with your dynamic template variables:

| Section | Template Sample Text | Recommended Template Tag |
| :--- | :--- | :--- |
| **Logo Image Source** | `https://skycranemobility.com/assets/images/logo.png` | `{{ logo_url }}` |
| **Badge Text** | `New Website Lead` | `{{ lead_status_badge }}` |
| **Request Type** | `Mission Consultation Request` | `{{ request_type }}` |
| **Corporate Email** | `client@company.com` | `{{ user_email }}` |
| **Submission Date** | `November 2, 2026` | `{{ submission_timestamp }}` |
| **Scope / Notes** | `Inquiry regarding heavy-lift cargo...` | `{{ consultation_notes }}` |

---

## 4. Production HTML Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyCrane Mobility Form Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .email-header {
      background-color: #0f172a;
      padding: 24px 32px;
      text-align: center;
    }
    .email-header img {
      max-height: 48px;
      width: auto;
      vertical-align: middle;
    }
    .brand-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-top: 8px;
      text-transform: uppercase;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: #2563eb;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 12px;
    }
    .email-body {
      padding: 32px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 8px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table td {
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      vertical-align: top;
    }
    .data-label {
      font-weight: 600;
      color: #64748b;
      width: 35%;
    }
    .data-value {
      color: #0f172a;
      width: 65%;
      word-break: break-word;
    }
    .message-box {
      margin-top: 20px;
      padding: 16px;
      background-color: #f8fafc;
      border-left: 4px solid #2563eb;
      border-radius: 4px;
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
    }
    .email-footer {
      background-color: #f8fafc;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <img src="https://skycranemobility.com/assets/images/logo.png" alt="SkyCrane Mobility Logo">
      <div class="brand-title">SkyCrane Mobility</div>
      <div class="badge">New Website Lead</div>
    </div>

    <!-- Body -->
    <div class="email-body">
      <h2 class="section-title">Submission Details</h2>

      <table class="data-table">
        <tr>
          <td class="data-label">Request Type</td>
          <td class="data-value"><strong>Mission Consultation Request</strong></td>
        </tr>
        <tr>
          <td class="data-label">Corporate Email</td>
          <td class="data-value"><a href="mailto:client@company.com" style="color: #2563eb; text-decoration: none;">client@company.com</a></td>
        </tr>
        <tr>
          <td class="data-label">Submission Date</td>
          <td class="data-value">November 2, 2026</td>
        </tr>
      </table>

      <!-- Optional message field for consultation requests -->
      <div style="margin-top: 24px;">
        <span class="data-label" style="display: block; margin-bottom: 8px;">Consultation Notes / Scope:</span>
        <div class="message-box">
          Inquiry regarding heavy-lift cargo drone operations for industrial equipment transport.
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      This is an automated operational notification from <strong>SkyCrane Mobility Website Form Engine</strong>.<br>
      © 2026 SkyCrane Mobility Corporation. All rights reserved.
    </div>
  </div>

</body>
</html>
```

---

## 5. Next Steps for Antigravity

1. **Host Logo Asset:** Ensure the SkyCrane Mobility logo image is publicly hosted on a CDN and update the image `src` URL accordingly.
2. **Hook Up Dynamic Variables:** Inject submission payload data into the corresponding template locations prior to sending.
3. **Conditional Rendering:** If the form type is a simple newsletter subscription, conditionally omit the lower "Consultation Notes / Scope" block.