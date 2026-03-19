# 🚗 Mini Car Marketplace with Live Inquiry

A simple but functional car marketplace web application demonstrating **AJAX** communication and **webhook** integration for third-party service notification.

## ✨ Features

✅ **View Cars** - Browse 3 sample cars with details
✅ **AJAX Inquiry Form** - Submit inquiries without page reload
✅ **Webhook Integration** - Automatically notify external services
✅ **Real-time Feedback** - Loading states, success/error messages
✅ **Responsive Design** - Works on mobile and desktop
✅ **REST API** - Simple endpoints for inquiry management

---

## 🚀 Quick Start

### Local Deployment (Node.js)

#### Prerequisites
- Node.js 14+ installed
- npm installed

#### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

4. **Test the App**
   - Click "Inquire Now" on any car
   - Fill in the form
   - Click "Send Inquiry"
   - ✅ See success message

---

## 🌐 Deploy to Cloud (Replit)

### Option 1: Deploy to Replit (Recommended for Lab)

1. **Go to [Replit.com](https://replit.com)**

2. **Create a New Repl**
   - Click "+ Create" → "New Repl"
   - Select "Node.js" as template
   - Name it "Mini-Car-Marketplace"

3. **Upload Project Files**
   - Copy all files from this project into Replit:
     - `index.html`
     - `style.css`
     - `script.js`
     - `cars.json`
     - `server.js`
     - `package.json`

4. **Install Dependencies**
   - In Replit terminal:
   ```bash
   npm install
   ```

5. **Run the Project**
   - Click "Run" button
   - Replit will automatically open the live link

6. **Share the Link**
   - Copy the URL from Replit (e.g., `https://Mini-Car-Marketplace.username.repl.co`)
   - Share with instructor

---

## 🔗 Webhook Setup (For Real Notifications)

This project supports webhook integration. Here's how to set it up:

### Using Webhook.site (Free)

1. **Go to [webhook.site](https://webhook.site)**
2. **Copy your unique URL** (you'll see it on the page)
3. **Set Environment Variable**
   
   **Local (Terminal):**
   ```bash
   export WEBHOOK_URL="https://webhook.site/your-unique-id"
   npm start
   ```

   **Replit:**
   - Go to "Secrets" (lock icon)
   - Add: `WEBHOOK_URL = https://webhook.site/your-unique-id`
   - Run the project
   
4. **Test the Webhook**
   - Submit an inquiry
   - Go back to webhook.site
   - 🎉 See your inquiry data in real-time!

### Using Custom Webhook (Advanced)

Replace the webhook URL in `server.js`:

```javascript
const webhookUrl = 'YOUR_CUSTOM_WEBHOOK_URL';
```

---

## 📡 API Endpoints

### 1. Submit Inquiry (AJAX)
```
POST /api/inquiry
Content-Type: application/json

{
  "carId": 1,
  "carName": "Tesla Model 3",
  "buyerName": "John Doe",
  "buyerEmail": "john@example.com",
  "buyerPhone": "+1234567890",
  "message": "Is this car still available?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry received successfully!",
  "inquiryId": 1
}
```

### 2. Get All Inquiries
```
GET /api/inquiries
```

**Response:**
```json
{
  "total": 2,
  "inquiries": [...]
}
```

### 3. Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-03-19T10:30:00Z",
  "inquiries_count": 0
}
```

---

## 🧪 Testing AJAX

### Manual Testing
1. Open browser DevTools (`F12`)
2. Go to Network tab
3. Submit an inquiry
4. Watch the POST request to `/api/inquiry`
5. Check response in DevTools

### Using cURL
```bash
curl -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "carId": 1,
    "carName": "Tesla Model 3",
    "buyerName": "Test User",
    "buyerEmail": "test@example.com",
    "message": "Hello!"
  }'
```

---

## 📊 Project Structure

```
mini-car-marketplace/
├── index.html          # Main HTML page
├── style.css           # Styling & responsive design
├── script.js           # Frontend AJAX logic
├── cars.json          # Static car data
├── server.js          # Express backend & webhook trigger
├── package.json       # Node dependencies
└── README.md          # This file
```

---

## 🎯 Learning Objectives

This lab demonstrates:

✅ **AJAX** - Asynchronous data submission without page reload
✅ **Webhooks** - Trigger external service notifications
✅ **REST API** - Create POST/GET endpoints
✅ **Frontend to Backend** - Communication patterns
✅ **Error Handling** - Try-catch blocks, status feedback
✅ **JSON** - Data format for web services

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=4000 npm start
```

### CORS Errors
The app uses `cors` middleware by default. If issues persist, check:
- Browser console for error details
- Server logs for request info

### Webhook Not Triggering
- Check webhook URL is correct
- Verify internet connection
- Check browser console Network tab
- Review server logs with `console.log`

### Cars Not Loading
- Ensure `cars.json` is in the same directory
- Check browser console for errors
- Verify JSON file format is valid

---

## 📚 Resources

- [MDN AJAX Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
- [Express.js Docs](https://expressjs.com/)
- [Webhook.site](https://webhook.site/)
- [Replit Docs](https://docs.replit.com/)

---

## 📝 Notes for Instructor

### What Students Should Demonstrate:
1. ✅ App loads with 3 cars displayed
2. ✅ Click "Inquire Now" opens modal without page reload
3. ✅ Form submission triggers AJAX request (check Network tab)
4. ✅ Success message appears after submission
5. ✅ Webhook receives inquiry data (check webhook.site)
6. ✅ API endpoints respond correctly (`/api/inquiries`)

### Evaluation Criteria:
- [ ] AJAX working (no page reload on submit)
- [ ] Webhook triggered and data received
- [ ] Error handling implemented
- [ ] Responsive UI
- [ ] Code comments present

---

## 🎉 Enjoy!

This is a hands-on lab to learn web service integration. Feel free to extend it with:
- Database integration (MongoDB/PostgreSQL)
- Authentication (Login/Signup)
- Email notifications
- Payment gateway integration
- Real webhook with a real service (Twilio, SendGrid, etc.)

**Happy Learning!** 🚀
