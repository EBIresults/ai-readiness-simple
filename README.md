# AI Readiness Simple Funnel

Clean, fast-converting funnel with backend lead capture to Close.com.

### Current Architecture
- **index.html** → Landing page with lead capture form
- **server.js** → Backend that captures leads and pushes them to Close.com with tag `AI-Scan-Initial`
- **upsell.html** → Page showing all 3 PayPal options ($7, $49, $479)
- **delivery.html** → Thank you / delivery page

### How It Works
1. User fills form on main page
2. Form submits to `/api/capture-lead` → lead is pushed to Close.com automatically
3. User is redirected to upsell.html (all 3 purchase options visible)
4. PayPal handles payments
5. After payment, user lands on delivery.html

### Live Website
- **Main Page:** https://ai-readiness-simple-production.up.railway.app/
- **Upsell Page:** https://ai-readiness-simple-production.up.railway.app/upsell.html
- **Delivery Page:** https://ai-readiness-simple-production.up.railway.app/delivery.html

### Tech Stack
- Railway (Node.js + static files)
- Express server for lead capture
- Close.com API integration
- PayPal Buy Now buttons on upsell page

### Deployment
Any change to the files triggers automatic redeploy on Railway.

---

Would you like me to add anything else to this README (such as environment variables needed, how to add more states, or abandoned cart ideas)?

Just say **"update it"** and I’ll give you the final version, or tell me what to add.
