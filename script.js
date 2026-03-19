// DOM Elements
const carsList = document.getElementById('carsList');
const inquiryModal = document.getElementById('inquiryModal');
const closeBtn = document.getElementById('closeBtn');
const inquiryForm = document.getElementById('inquiryForm');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');

let currentCar = null;

// Load cars from JSON
async function loadCars() {
    try {
        // Try to load from static file first
        let response = await fetch('/cars.json');
        
        // If static file fails, try API endpoint as fallback
        if (!response.ok) {
            console.warn('⚠️ Static cars.json not found, trying API endpoint...');
            response = await fetch('/api/cars');
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const cars = await response.json();
        
        if (!Array.isArray(cars) || cars.length === 0) {
            throw new Error('Invalid cars data');
        }
        
        console.log('✅ Cars loaded successfully:', cars.length, 'cars');
        displayCars(cars);
    } catch (error) {
        console.error('Error loading cars:', error);
        carsList.innerHTML = '<p style="color: white; text-align: center;">❌ Failed to load cars.<br>Check browser console for details.<br><small>' + error.message + '</small></p>';
    }
}

// Display cars in the grid
function displayCars(cars) {
    carsList.innerHTML = '';
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-image">${car.emoji}</div>
            <div class="car-details">
                <div class="car-title">${car.name}</div>
                <div class="car-price">${car.price}</div>
                <div class="car-info">
                    <p>📅 Year: ${car.year}</p>
                    <p>🛣️  Mileage: ${car.mileage}</p>
                    <p>⚙️ Transmission: ${car.transmission}</p>
                    <p>📝 ${car.description}</p>
                </div>
                <button class="btn-inquire" onclick="openInquiryModal(${car.id}, '${car.name}')">Inquire Now</button>
            </div>
        `;
        carsList.appendChild(carCard);
    });
}

// Open the inquiry modal
function openInquiryModal(carId, carName) {
    currentCar = { id: carId, name: carName };
    document.getElementById('carName').textContent = carName;
    document.getElementById('carId').value = carId;
    document.getElementById('displayCarId').textContent = `Car #${carId}`;
    inquiryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close the inquiry modal
function closeInquiryModal() {
    inquiryModal.classList.add('hidden');
    inquiryForm.reset();
    statusMessage.classList.add('hidden');
    statusMessage.textContent = '';
    document.body.style.overflow = 'auto'; // Allow scrolling
}

// Close modal when clicking the X button
closeBtn.addEventListener('click', closeInquiryModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === inquiryModal) {
        closeInquiryModal();
    }
});

// Handle form submission with AJAX
inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        carId: document.getElementById('carId').value,
        carName: currentCar.name,
        buyerName: document.getElementById('buyerName').value,
        buyerEmail: document.getElementById('buyerEmail').value,
        buyerPhone: document.getElementById('buyerPhone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Show loading state
    showStatus('Sending your inquiry...', 'loading');
    submitBtn.disabled = true;

    try {
        // Send to backend via AJAX
        const response = await fetch('/api/inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showStatus('✅ Inquiry sent successfully! We will contact you soon.', 'success');
            inquiryForm.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                closeInquiryModal();
            }, 2000);
        } else {
            showStatus('❌ ' + (data.message || 'Failed to send inquiry. Please try again.'), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('❌ Network error. Please check your connection and try again.', 'error');
    } finally {
        submitBtn.disabled = false;
    }
});

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCars);
