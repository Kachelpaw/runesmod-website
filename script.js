// ==========================================
// TEBEX INTEGRATION - REPLACE WITH YOUR STORE
// ==========================================

// YOUR TEBEX STORE URL (Replace this!)
const TEBEX_STORE_URL = 'https://pawrl01s-mods.tebex.io';

// Package IDs from your Tebex dashboard (Replace these!)
const TEBEX_PACKAGES = {
    '1-week': '7361909',      // Replace with actual Tebex package ID
    '1-month': 'PACKAGE_ID_2',     // Replace with actual Tebex package ID
    '3-months': 'PACKAGE_ID_3',    // Replace with actual Tebex package ID
    '12-months': 'PACKAGE_ID_4',   // Replace with actual Tebex package ID
    'lifetime': 'PACKAGE_ID_5',    // Replace with actual Tebex package ID
    'team-deal': 'PACKAGE_ID_6',   // Replace with actual Tebex package ID
    'team-deal-plus': 'PACKAGE_ID_7' // Replace with actual Tebex package ID
};

// Early Updates add-on package IDs
const EARLY_ACCESS_PACKAGES = {
    'monthly': 'EARLY_ACCESS_MONTHLY_ID',
    'lifetime': 'EARLY_ACCESS_LIFETIME_ID'
};

// ==========================================
// PLAN BUTTON CLICK HANDLERS
// ==========================================

const planButtons = document.querySelectorAll('.plan-button');

planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const plan = this.dataset.plan;
        const price = this.dataset.price;
        
        // Check for early access checkbox
        const card = this.closest('.pricing-card');
        const earlyAccessCheckbox = card?.querySelector('.early-access-checkbox');
        const hasEarlyAccess = earlyAccessCheckbox?.checked || false;
        
        // Get package ID
        const packageId = TEBEX_PACKAGES[plan];
        
        if (!packageId || packageId.includes('PACKAGE_ID')) {
            // Tebex not configured - show alert
            showPurchaseModal(plan, price, hasEarlyAccess);
        } else {
            // Redirect to Tebex
            redirectToTebex(packageId, hasEarlyAccess, plan);
        }
    });
});

function redirectToTebex(packageId, hasEarlyAccess, plan) {
    // Build Tebex URL with basket
    let tebexUrl = `${TEBEX_STORE_URL}/checkout/packages`;
    
    // If has early access, add that package too
    if (hasEarlyAccess) {
        const earlyPackage = plan === 'lifetime' ? EARLY_ACCESS_PACKAGES.lifetime : EARLY_ACCESS_PACKAGES.monthly;
        // Tebex basket with multiple items
        tebexUrl = `${TEBEX_STORE_URL}/checkout/packages?packages[]=${packageId}&packages[]=${earlyPackage}`;
    } else {
        tebexUrl = `${TEBEX_STORE_URL}/checkout/packages/${packageId}`;
    }
    
    window.location.href = tebexUrl;
}

// ==========================================
// PURCHASE MODAL (Before Tebex Setup)
// ==========================================

function showPurchaseModal(plan, price, hasEarlyAccess) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    
    let earlyAccessText = '';
    if (hasEarlyAccess) {
        const earlyPrice = plan === 'lifetime' ? '$10' : '$2/mo';
        earlyAccessText = `<div class="modal-addon">+ Early Updates (${earlyPrice})</div>`;
    }
    
    const planNames = {
        '1-week': '1 Week',
        '1-month': '1 Month',
        '3-months': '3 Months',
        '12-months': '12 Months',
        'lifetime': 'Lifetime',
        'team-deal': 'Team Deal (5 Users)',
        'team-deal-plus': 'Team Deal+'
    };
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 12 15 16 10"/>
                </svg>
            </div>
            <h3>Purchase ${planNames[plan] || plan}</h3>
            <div class="modal-price">$${price}</div>
            ${earlyAccessText}
            <p>Join our Discord to complete your purchase!</p>
            <a href="https://discord.gg/KACarkUz5X" target="_blank" class="modal-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Join Discord to Purchase
            </a>
            <p class="modal-note">Tebex payment coming soon!</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// ==========================================
// MOBILE MENU
// ==========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

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

// ==========================================
// INTERSECTION OBSERVER ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
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
    card.style.transition = `all 0.5s ease-out ${index * 0.08}s`;
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease-out ${index * 0.05}s`;
    observer.observe(card);
});

// Observe addon cards
document.querySelectorAll('.addon-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.4s ease-out ${index * 0.03}s`;
    observer.observe(card);
});

// Observe FAQ items
document.querySelectorAll('.faq-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.5s ease-out ${index * 0.08}s`;
    observer.observe(item);
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// EARLY ACCESS TOGGLE PRICE UPDATE
// ==========================================

document.querySelectorAll('.early-access-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const card = this.closest('.pricing-card');
        const button = card.querySelector('.plan-button');
        const addonPrice = parseFloat(this.dataset.addon) || 0;
        const basePrice = parseFloat(button.dataset.price) || 0;
        
        if (this.checked) {
            // Visual feedback
            card.style.boxShadow = '0 0 50px rgba(167, 139, 250, 0.3)';
        } else {
            card.style.boxShadow = '';
        }
    });
});

// ==========================================
// ADD MODAL STYLES
// ==========================================

const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .purchase-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .purchase-modal.active {
        opacity: 1;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: relative;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 2.5rem;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s;
    }
    
    .purchase-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .modal-close:hover {
        color: var(--text);
    }
    
    .modal-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
    }
    
    .modal-content h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    
    .modal-price {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
    }
    
    .modal-addon {
        color: var(--success);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .modal-content p {
        color: var(--text-muted);
        margin-bottom: 1.5rem;
    }
    
    .modal-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 1rem;
        background: #5865F2;
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s;
    }
    
    .modal-btn:hover {
        background: #4752C4;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
    }
    
    .modal-note {
        font-size: 0.8rem !important;
        color: var(--text-muted) !important;
        margin-top: 1rem !important;
        margin-bottom: 0 !important;
        opacity: 0.7;
    }
`;
document.head.appendChild(modalStyles);

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log('%c🔮 RunesMod', 'font-size: 24px; font-weight: bold; color: #a78bfa;');
console.log('%cWebsite loaded successfully!', 'color: #10b981;');
console.log('%cJoin Discord: https://discord.gg/KACarkUz5X', 'color: #5865F2;');
