// ========================================
// JAVASCRIPT FOR ÉLEGANCE RESTAURANT
// ========================================

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORM VALIDATION
// ========================================

const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        // Basic validation
        if (!name || !email || !phone || !date || !time || !guests) {
            showAlert('Please fill in all required fields.', 'danger');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'danger');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\-\+\s\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showAlert('Please enter a valid phone number.', 'danger');
            return;
        }
        
        // Check if date is in the future
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showAlert('Please select a future date.', 'danger');
            return;
        }
        
        // Success message
        showAlert('Thank you for your reservation request! We will contact you shortly to confirm.', 'success');
        
        // Reset form
        this.reset();
    });
}

// ========================================
// ALERT HELPER FUNCTION
// ========================================

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert alert at the top of the page
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    } else {
        document.body.insertBefore(alertDiv, document.body.firstChild);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all card elements for animation
document.querySelectorAll('.dish-card, .gallery-item, .contact-card, .achievement-card, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active link on page load
updateActiveNavLink();

// ========================================
// MENU ITEM HOVER EFFECT
// ========================================

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '15px';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0';
    });
});

// ========================================
// GALLERY MODAL (Optional Enhancement)
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.querySelector('img').src;
        const imageName = this.nextElementSibling?.textContent || 'Image';
        openImageModal(imageSrc, imageName);
    });
});

function openImageModal(src, name) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'imageModal');
    modal.setAttribute('tabindex', '-1');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-dark">
                <div class="modal-header border-secondary">
                    <h5 class="modal-title text-light">${name}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <img src="${src}" alt="${name}" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Clean up modal on hide
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// ========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================================

const navbarToggle = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (navbarToggle.offsetParent !== null) { // Check if navbar is in mobile view
            navbarToggle.click();
        }
    });
});

// ========================================
// FORM INPUT FOCUS EFFECTS
// ========================================

const formInputs = document.querySelectorAll('.form-control, .form-select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#d4af37';
        this.style.boxShadow = '0 0 0 0.2rem rgba(212, 175, 55, 0.25)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ========================================
// LAZY LOADING IMAGE OPTIMIZATION
// ========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                }
                observer.unobserve(image);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// UTILITY FUNCTION: FORMAT PHONE NUMBER
// ========================================

function formatPhoneNumber(value) {
    const phoneRegex = /^(\d{3})(\d{3})(\d{4})$/;
    const match = value.replace(/\D/g, '').match(phoneRegex);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        this.value = formatPhoneNumber(this.value);
    });
}

// ========================================
// DOCUMENT READY INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Élegance Restaurant Website Loaded Successfully');
    
    // Initialize tooltips (Bootstrap)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
