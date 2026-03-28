// Billing Toggle Functionality
const toggleButtons = document.querySelectorAll('.toggle-btn');
const priceAmounts = document.querySelectorAll('.amount');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get billing type
        const billingType = button.dataset.billing;
        
        // Update prices
        priceAmounts.forEach(amount => {
            const monthlyPrice = amount.dataset.monthly;
            const yearlyPrice = amount.dataset.yearly;
            
            // Animate price change
            amount.style.opacity = '0';
            amount.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                amount.textContent = billingType === 'monthly' ? monthlyPrice : yearlyPrice;
                amount.style.opacity = '1';
                amount.style.transform = 'translateY(0)';
            }, 150);
        });
    });
});

// Plan Button Click Handlers
const planButtons = document.querySelectorAll('.plan-button');

planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('.plan-name').textContent;
        const price = card.querySelector('.amount').textContent;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Simulate checkout (replace with actual payment logic)
        console.log(`Selected Plan: ${planName} - $${price}`);
        alert(`You selected the ${planName} plan!\nPrice: $${price}\n\nRedirecting to checkout...`);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observe FAQ items
document.querySelectorAll('.faq-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(item);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});
