const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Debug logging
app.use((req, res, next) => {
    if (req.method === 'GET' && req.path.includes('cars')) {
        console.log(`📋 Request: ${req.method} ${req.path} from ${req.get('host')}`);
    }
    next();
});

// In-memory storage for inquiries (for demo purposes)
const inquiries = [];

// API endpoint to handle inquiry submissions
app.post('/api/inquiry', async (req, res) => {
    try {
        const inquiry = {
            id: inquiries.length + 1,
            ...req.body,
            receivedAt: new Date().toISOString()
        };

        // Store inquiry in memory
        inquiries.push(inquiry);
        console.log('📮 New Inquiry Received:', inquiry);

        // Trigger webhook (send data to external service)
        try {
            await triggerWebhook(inquiry);
        } catch (webhookError) {
            console.warn('⚠️ Webhook trigger failed (but inquiry was saved):', webhookError.message);
            // Don't fail the request if webhook fails
        }

        // Return success response
        res.json({
            success: true,
            message: 'Inquiry received successfully!',
            inquiryId: inquiry.id
        });

    } catch (error) {
        console.error('❌ Error processing inquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process inquiry'
        });
    }
});

// Function to trigger webhook
async function triggerWebhook(inquiry) {
    // Option 1: Use webhook.site (free webhook testing service)
    // Replace with your actual webhook URL
    const webhookUrl = process.env.WEBHOOK_URL || 'https://webhook.site/862a2018-0f58-4d47-ae1b-1a2792a37682';

    const payload = {
        event: 'car_inquiry',
        data: inquiry,
        source: 'Mini Car Marketplace',
        timestamp: new Date().toISOString()
    };

    try {
        console.log('🔗 Sending webhook to:', webhookUrl);
        const response = await axios.post(webhookUrl, payload, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mini-Car-Marketplace/1.0'
            }
        });
        console.log('✅ Webhook sent successfully!');
        return response.data;
    } catch (error) {
        console.error('❌ Webhook error:', error.message);
        throw error;
    }
}

// GET endpoint to retrieve all inquiries (for testing)
app.get('/api/inquiries', (req, res) => {
    res.json({
        total: inquiries.length,
        inquiries: inquiries
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        inquiries_count: inquiries.length
    });
});

// Cars data endpoint (fallback if static file doesn't serve)
app.get('/api/cars', (req, res) => {
    const cars = [
        {
            id: 1,
            name: "Tesla Model 3",
            emoji: "⚡",
            price: "$45,000",
            year: 2024,
            mileage: "5,000 km",
            transmission: "Automatic",
            description: "Latest electric sedan with incredible performance"
        },
        {
            id: 2,
            name: "Honda Civic",
            emoji: "🏎️",
            price: "$28,000",
            year: 2023,
            mileage: "12,000 km",
            transmission: "Manual",
            description: "Reliable sedan perfect for daily commute"
        },
        {
            id: 3,
            name: "Toyota RAV4",
            emoji: "🚙",
            price: "$35,000",
            year: 2023,
            mileage: "8,500 km",
            transmission: "Automatic",
            description: "Spacious SUV ideal for families"
        }
    ];
    res.json(cars);
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║  🚗 Mini Car Marketplace Server Started       ║');
    console.log('╚════════════════════════════════════════════════╝');
    console.log('');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
    console.log(`📮 API Inquiries: http://localhost:${PORT}/api/inquiries`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('🔗 Webhook Setup:');
    console.log('   1. Visit https://webhook.site');
    console.log('   2. Copy your unique URL');
    console.log('   3. Set env: export WEBHOOK_URL="your-url"');
    console.log('');
});
