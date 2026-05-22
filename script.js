const menuData = [
    {
        id: 'espresso',
        name: 'Espresso',
        price: '$3.00',
        shortDesc: 'Rich, full-bodied coffee shot.',
        description: 'Our signature espresso roast with rich flavor and caramelly sweetness is at the very heart of everything we do.',
        ingredients: [
            'Our Signature Espresso Roast Beans',
            'Filtered Water'
        ]
    },
    {
        id: 'americano',
        name: 'Caffè Americano',
        price: '$3.50',
        shortDesc: 'Espresso shots topped with hot water.',
        description: 'Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.',
        ingredients: [
            'Espresso',
            'Hot Filtered Water'
        ]
    },
    {
        id: 'latte',
        name: 'Caffè Latte',
        price: '$4.50',
        shortDesc: 'Espresso balanced with steamed milk.',
        description: 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm up.',
        ingredients: [
            'Espresso',
            'Steamed Whole Milk (Substitutes available)',
            'Milk Foam'
        ]
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        price: '$4.50',
        shortDesc: 'Dark, rich espresso lying in wait under foam.',
        description: 'Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.',
        ingredients: [
            'Espresso',
            'Steamed Milk',
            'Deep Layer of Milk Foam'
        ]
    },
    {
        id: 'mocha',
        name: 'Caffè Mocha',
        price: '$5.00',
        shortDesc: 'Espresso with mocha sauce and steamed milk.',
        description: 'Our rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk, then topped with sweetened whipped cream.',
        ingredients: [
            'Espresso',
            'Bittersweet Mocha Sauce',
            'Steamed Milk',
            'Whipped Cream'
        ]
    },
    {
        id: 'caramel-macchiato',
        name: 'Caramel Macchiato',
        price: '$5.25',
        shortDesc: 'Freshly steamed milk with vanilla and caramel.',
        description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish.',
        ingredients: [
            'Espresso',
            'Steamed Milk',
            'Vanilla Syrup',
            'Caramel Drizzle'
        ]
    },
    {
        id: 'cold-brew',
        name: 'Cold Brew Coffee',
        price: '$4.25',
        shortDesc: 'Slow-steeped custom blend.',
        description: 'Handcrafted in small batches daily, slow-steeped in cool water for 20 hours, without touching heat to give a super smooth flavor.',
        ingredients: [
            'Cold-Steeped Custom Blend Coffee',
            'Ice'
        ]
    },
    {
        id: 'matcha-latte',
        name: 'Matcha Tea Latte',
        price: '$4.75',
        shortDesc: 'Smooth and creamy matcha sweetened just right.',
        description: 'Smooth and creamy matcha sweetened just right and served with steamed milk. This favorite will transport your senses to pure green delight.',
        ingredients: [
            'Premium Matcha Green Tea Powder',
            'Steamed Milk',
            'Liquid Cane Sugar'
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('close-btn');

    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const ingredientsList = document.getElementById('ingredients-list');

    // Render Menu Items
    menuData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.dataset.id = item.id;

        itemElement.innerHTML = `
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price}</span>
            </div>
            <p class="item-short-desc">${item.shortDesc}</p>
            <div class="tap-indicator">Tap for Details</div>
        `;

        // Add tap event
        itemElement.addEventListener('click', () => openModal(item));
        menuContainer.appendChild(itemElement);
    });

    // Open Modal Function
    function openModal(item) {
        modalTitle.textContent = item.name;
        modalPrice.textContent = item.price;
        modalDescription.textContent = item.description;

        // Populate Ingredients
        ingredientsList.innerHTML = '';
        item.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

        // Show Modal
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
    }

    // Close Modal Function
    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    // Close Modal Events
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Auto-reset functionality for Kiosks (close modal after 30 seconds of inactivity)
    let resetTimer;
    function resetKioskTimer() {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            if (modalOverlay.classList.contains('active')) {
                closeModal();
            }
        }, 30000); // 30 seconds
    }

    // Listen for any interactions to reset the timer
    document.addEventListener('click', resetKioskTimer);
    document.addEventListener('touchstart', resetKioskTimer);

    // Initialize timer
    resetKioskTimer();
});