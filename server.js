const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
const FROM_EMAIL = 'angela@ebiresults.com';
const CC_EMAIL = '14calder@gmail.com';

if (!SENDGRID_API_KEY || !CLOSE_API_KEY) {
  console.error('❌ Missing API keys in environment variables');
}

sgMail.setApiKey(SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Capture Lead + Push to Close.com
app.post('/api/capture-lead', async (req, res) => {
  try {
    const { name, email, phone, website, city, state } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    // Push to Close.com
    const body = {
      name: name,
      contacts: [{ 
        name: name,
        emails: [{ email: email, type: 'office' }],
        phones: phone ? [{ phone: phone, type: 'office' }] : []
      }],
      "custom.lf_cf_custom_website": website || '',
      "custom.lf_cf_custom_city": city || '',
      "custom.lf_cf_custom_state": state || '',
      description: `AI-Scan-Initial\nAI Readiness Simple Funnel Lead\nName: ${name}\nEmail: ${email}`,
      "custom.lf_cf_custom_funnel_source": "simple-funnel"
    };

    try {
      const closeResp = await fetch('https://api.close.com/api/v1/lead/', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(CLOSE_API_KEY + ':').toString('base64'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (closeResp.ok) {
        console.log(`✅ Close: Lead created — ${name} (${email})`);
      } else {
        console.error('❌ Close push failed');
      }
    } catch (e) {
      console.error('❌ Close API error:', e.message);
    }

    res.redirect('/upsell.html');
  } catch (err) {
    console.error('Capture lead error:', err.message);
    res.redirect('/upsell.html');
  }
});

// Serve pages
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/upsell.html', (req, res) => res.sendFile(__dirname + '/upsell.html'));
app.get('/delivery.html', (req, res) => res.sendFile(__dirname + '/delivery.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Simple AI Readiness Funnel running on port ${PORT}`);
});
