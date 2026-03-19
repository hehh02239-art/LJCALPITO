# 🎓 Lab Deployment Guide for Instructors

This guide helps instructors deploy the Mini Car Marketplace lab and check student submissions.

---

## ✅ Pre-Lab Checklist

Before assigning this lab to students:

- [ ] Test the project locally first
- [ ] Create a Replit account (if using Replit)
- [ ] Set up a webhook.site account for demo
- [ ] Prepare deployment instructions for students
- [ ] Have support contact info ready

---

## 🚀 Instructor Setup (Local)

### 1. Install Node.js
```bash
# Download from nodejs.org
# Or use package manager:
# macOS: brew install node
# Windows: choco install nodejs
# Linux: sudo apt-get install nodejs npm
```

### 2. Clone/Download Project
```bash
cd "Mini Car Marketplace with Live Inquiry"
npm install
npm start
```

Server runs on `http://localhost:3000`

### 3. Test Core Functionality
- [ ] See 3 cars on landing page
- [ ] Click "Inquire Now" on a car
- [ ] Submit form without error
- [ ] Check `/api/inquiries` endpoint

---

## 🌐 Student Deployment Options

### Option A: Replit (Recommended - Easiest)

**Pros:**
- No local setup required
- Instant sharing via link
- Built-in code editor
- Automatic deployment

**Steps:**
1. Replit.com → "Create Repl" → "Node.js"
2. Upload all files
3. Click "Run"
4. Copy live URL to share

**Student URL Format:**
```
https://Mini-Car-Marketplace.{username}.repl.co
```

---

### Option B: Local Machine

**Pros:**
- Full control
- Can test webhooks locally
- Learn deployment tools

**Steps:**
1. Install Node.js
2. Download project files
3. `npm install`
4. `npm start`
5. Share via ngrok (for tunneling):
   ```bash
   npx ngrok http 3000
   # Share the ngrok URL
   ```

---

### Option C: Other Cloud Platforms

**Glitch:**
- Import GitHub repo
- Built-in deployment
- Similar to Replit

**CodeSandbox:**
- Requires tweaking for Node.js backend
- Better for frontend-only projects

**Heroku (Free tier deprecated):**
- Was popular, now paid
- Consider for production learning

---

## 🔗 Testing Student Submissions

### Checklist for Grading

Use this checklist when reviewing student work:

```
📋 FUNCTIONALITY
✅ Landing page displays 3 cars
✅ Car details visible (price, year, mileage, transmission)
✅ "Inquire Now" button opens modal
✅ Modal has form fields (Name, Email, Phone, Message)
✅ Form submits without page reload (AJAX)
✅ Success message appears after submission
✅ Modal closes automatically

📡 AJAX IMPLEMENTATION
✅ Network tab shows POST to /api/inquiry
✅ Request body contains form data
✅ Response status is 200 OK
✅ No console errors

🔗 WEBHOOK INTEGRATION
✅ Server.js contains webhook code
✅ Webhook URL can be configured
✅ webhook.site shows inquiry data received
✅ Timestamp and all fields present

📊 API ENDPOINTS
✅ GET /api/inquiries returns JSON
✅ GET /api/health returns status
✅ POST /api/inquiry processes data

🎨 USER EXPERIENCE
✅ Responsive (works on mobile)
✅ Loading state shown during submission
✅ Error messages if submission fails
✅ No JavaScript errors in console

📝 CODE QUALITY
✅ Comments explaining key sections
✅ Code is readable and organized
✅ Environment variables used for config
```

---

## 🧪 Step-by-Step Testing

### 1. Check Deployment Link
```bash
# Open in browser
https://[student-link]

# Should see:
✅ Page loads without errors
✅ 3 cars displayed with proper styling
✅ Responsive layout
```

### 2. Test AJAX
```bash
# In browser DevTools (F12)
# Network tab

# Click "Inquire Now" on Tesla Model 3
# Fill form:
  Name: Test User
  Email: test@example.com
  Message: Is this available?

# Click "Send Inquiry"
# Watch Network tab:
  ✅ POST request to api/inquiry
  ✅ Status 200
  ✅ Response shows success message
```

### 3. Verify Webhook
```bash
# Method 1: Using webhook.site
1. Student provides webhook URL in server.js
   console.log(process.env.WEBHOOK_URL)
2. Go to webhook.site/{their-id}
3. Submit inquiry
4. ✅ Should see POST request received
5. ✅ JSON payload contains inquiry data

# Method 2: Check logs
# View server logs for:
  ✅ "New Inquiry Received"
  ✅ "Webhook sent successfully"
```

### 4. Test API Endpoints
```bash
# Replace {student-url} with their link

# Get all inquiries
curl https://{student-url}/api/inquiries

# Should return:
{
  "total": 1,
  "inquiries": [...]
}

# Health check
curl https://{student-url}/api/health

# Should return:
{
  "status": "OK",
  "timestamp": "...",
  "inquiries_count": 1
}
```

---

## 🎯 Grading Rubric

### Total: 100 Points

**Functionality (30 points)**
- [ ] Cars display correctly (8 pts)
- [ ] Modal opens without page reload (8 pts)
- [ ] Form validation works (7 pts)
- [ ] Success/error messages (7 pts)

**AJAX Implementation (25 points)**
- [ ] POST request sent to API (10 pts)
- [ ] Request body formatted correctly (8 pts)
- [ ] Response handled properly (7 pts)

**Webhook Integration (25 points)**
- [ ] Webhook URL configured (8 pts)
- [ ] Data sent to webhook (10 pts)
- [ ] Webhook receives payload correctly (7 pts)

**Code Quality (15 points)**
- [ ] Code is commented (5 pts)
- [ ] No console errors (5 pts)
- [ ] Responsive design (5 pts)

**Deployment (5 points)**
- [ ] Working live link provided (3 pts)
- [ ] Accessible from any browser (2 pts)

---

## 🆘 Common Student Issues & Solutions

### Issue 1: "CORS Error"
**Symptom:** Request blocked by browser
**Solution:**
- Check `server.js` has `app.use(cors())`
- Ensure `package.json` has `"cors": "^2.8.5"`
- Run `npm install` again

### Issue 2: "Module not found: express"
**Symptom:** Node.js crash on startup
**Solution:**
```bash
npm install
npm start
```

### Issue 3: "Webhook not triggering"
**Symptom:** Inquiry saved but webhook not called
**Solution:**
- Check webhook URL in environment variable
- Verify internet connection
- Check `/api/inquiries` to confirm data saved
- Webhook trigger is non-critical (inquiry still works)

### Issue 4: "Port 3000 already in use"
**Symptom:** Server won't start
**Solution:**
```bash
PORT=4000 npm start
# Or kill process using port 3000
```

### Issue 5: "Cars not loading"
**Symptom:** Blank page or error message
**Solution:**
- Verify `cars.json` exists
- Check JSON syntax (no trailing commas)
- Check browser console for 404 errors
- Ensure `script.js` is loading correctly

---

## 📞 Quick Support Checklist

**When students report issues, check:**

1. [ ] Server is running
2. [ ] Correct URL opened (http://localhost:3000 or live link)
3. [ ] Browser console shows no errors (F12)
4. [ ] Network tab shows request/response (F12 → Network)
5. [ ] Files are in correct directory
6. [ ] npm packages installed (`node_modules` folder exists)
7. [ ] .json files are valid JSON format

---

## 📊 Sample Grading Scenarios

### Scenario A: Perfect Submission
```
Student deployed to Replit ✅
App works without errors ✅
AJAX visible in Network tab ✅
Webhook.site shows data ✅
Code has comments ✅
Grade: 95/100 (minor comment issues)
```

### Scenario B: No Webhook
```
App works, form submits ✅
AJAX working ✅
No webhook implementation ❌
Server.js missing webhook code
Grade: 75/100 (webhook worth 25 pts)
```

### Scenario C: Syntax Error
```
Page doesn't load
Console shows: "SyntaxError: Unexpected token"
Check .js files for typos
Fix: Add semicolons, correct brackets
Grade: 50/100 (needs debugging)
```

---

## 🎊 Celebration Moment

When everything works:
1. ✅ Student opens browser
2. ✅ Fills inquiry form
3. ✅ Hits submit
4. ✅ No page reload
5. ✅ Success message
6. ✅ Webhook.site gets notification

🎉 **This is real web development!**

Students completed:
- Frontend development
- Backend API creation
- Third-party integration
- Full-stack deployment

---

## 📚 Extension Ideas

For advanced students:

1. **Add Database**
   - Store inquiries in MongoDB
   - Query and display dashboard

2. **Email Notifications**
   - Send email when inquiry received
   - Use SendGrid or Mailgun

3. **Authentication**
   - User accounts
   - Admin dashboard to see all inquiries

4. **Payment Integration**
   - Stripe for deposits
   - Secure transactions

5. **Real Webhooks**
   - Slack notifications
   - Discord webhooks
   - Twilio SMS alerts

---

## 📞 Contact & Support

**If students have issues:**
1. Check this guide first
2. Have them share the live link
3. Debug using Network tab
4. Check server logs
5. Verify webhook setup

**Common resources:**
- MDN Documentation
- Stack Overflow
- Express.js docs
- Webhook.site docs

---

**Good luck with your lab!** 🚀
