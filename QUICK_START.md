# ⚡ Quick Start Guide

Get the Mini Car Marketplace running in 2 minutes!

---

## 🎯 Choose Your Path

### 👉 Path 1: Replit (Easiest - Recommended)

1. Go to **[Replit.com](https://replit.com)**
2. Click **"+ Create"** → **"New Repl"**
3. Choose **"Node.js"** template
4. Name it **"Mini-Car-Marketplace"**
5. Upload these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `cars.json`
   - `server.js`
   - `package.json`
6. Click **"Run"** button
7. 🎉 Your app is live!

**Share the URL** (looks like: `https://Mini-Car-Marketplace.yourname.repl.co`)

---

### 👉 Path 2: Local Machine

1. **Install Node.js** from [nodejs.org](https://nodejs.org)

2. **Open Terminal/Command Prompt** in project folder

3. **Install packages:**
   ```bash
   npm install
   ```

4. **Start server:**
   ```bash
   npm start
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

6. 🎉 App is running!

---

## 🧪 Test It Works

1. **See the cars**
   - 3 cars should display: Tesla, Honda, Toyota

2. **Click "Inquire Now"**
   - Modal (popup) should open
   - Modal should NOT reload page ✅ (This is AJAX!)

3. **Fill the form**
   - Name: Your name
   - Email: your@email.com
   - Phone: Optional
   - Message: Any message

4. **Click "Send Inquiry"**
   - ✅ Success message appears
   - Modal closes after 2 seconds

5. **Check the API** (test endpoint)
   - Go to `http://localhost:3000/api/inquiries`
   - You should see your inquiry data in JSON

---

## 🔗 Add Webhook (Optional but Cool!)

Want real-time notifications? Follow these steps:

### Step 1: Get a Webhook URL
- Go to **[webhook.site](https://webhook.site)**
- Copy your unique URL (begins with `https://webhook.site/`)

### Step 2: Configure Server

**Local Machine:**
```bash
# In terminal, before npm start:
export WEBHOOK_URL="https://webhook.site/your-unique-id"
npm start
```

**Replit:**
- Click 🔒 **"Secrets"** icon
- Add: `WEBHOOK_URL` = `https://webhook.site/your-unique-id`
- Click "Run"

### Step 3: Test Webhook
- Submit an inquiry
- Go back to webhook.site
- 🎉 See your data received in real-time!

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module 'express'" | Run `npm install` |
| "Port 3000 already in use" | Run `PORT=4000 npm start` |
| "Cars not loading" | Check `cars.json` exists |
| "Form doesn't submit" | Check browser console (F12) |
| "No webhook received" | Verify webhook URL is correct |

---

## 📋 What You Just Built

✅ **Frontend** - HTML, CSS, JavaScript with AJAX
✅ **Backend** - Node.js Express server
✅ **API** - POST and GET endpoints
✅ **Webhooks** - External service integration
✅ **Full Stack** - Complete web application

---

## 🎓 Learning Points

This shows you:
- How modern web apps work (AJAX = no page reload)
- How to communicate with backends via API
- How webhooks notify external services
- Full-stack development (frontend + backend)

---

## 📞 Need Help?

1. Check browser console: **F12** → **Console tab**
2. Check Network: **F12** → **Network tab** → submit form
3. Check server logs: Look at terminal where you ran `npm start`
4. Read **README.md** for detailed docs

---

## 🚀 Next Steps

After getting this working:
- Add more cars to `cars.json`
- Customize styles in `style.css`
- Modify form fields in `index.html`
- Add database storage (MongoDB, etc.)
- Send real email notifications

---

**You're all set!** 🎉 Click "Run" and start testing!
