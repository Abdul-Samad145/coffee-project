"use strict";

// ============================================
// DATA & STATE MANAGEMENT
// ============================================

// Coffee data from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light', origin: 'Ethiopia', notes: 'Floral, Citrus', rating: 4.5},
    {id: 2, name: 'Half City', roast: 'light', origin: 'Kenya', notes: 'Berry, Wine-like', rating: 4.3},
    {id: 3, name: 'Cinnamon', roast: 'light', origin: 'Guatemala', notes: 'Spicy, Sweet', rating: 4.2},
    {id: 4, name: 'City', roast: 'medium', origin: 'Colombia', notes: 'Balanced, Smooth', rating: 4.6},
    {id: 5, name: 'American', roast: 'medium', origin: 'Brazil', notes: 'Nutty, Chocolate', rating: 4.4},
    {id: 6, name: 'Breakfast', roast: 'medium', origin: 'Costa Rica', notes: 'Bright, Clean', rating: 4.5},
    {id: 7, name: 'High', roast: 'dark', origin: 'Sumatra', notes: 'Earthy, Bold', rating: 4.7},
    {id: 8, name: 'Continental', roast: 'dark', origin: 'Indonesia', notes: 'Rich, Full-bodied', rating: 4.4},
    {id: 9, name: 'New Orleans', roast: 'dark', origin: 'Vietnam', notes: 'Chicory, Strong', rating: 4.3},
    {id: 10, name: 'European', roast: 'dark', origin: 'Italy', notes: 'Intense, Smoky', rating: 4.6},
    {id: 11, name: 'Espresso', roast: 'dark', origin: 'Italy', notes: 'Caramel, Robust', rating: 4.8},
    {id: 12, name: 'Viennese', roast: 'dark', origin: 'Austria', notes: 'Sweet, Creamy', rating: 4.5},
    {id: 13, name: 'Italian', roast: 'dark', origin: 'Italy', notes: 'Bittersweet, Oily', rating: 4.7},
    {id: 14, name: 'French', roast: 'dark', origin: 'France', notes: 'Charred, Bold', rating: 4.4},
];

// Application state
const state = {
    favorites: new Set(JSON.parse(localStorage.getItem('favorites') || '[]')),
    currentTheme: localStorage.getItem('theme') || 'classic',
    layoutStyle: localStorage.getItem('layoutStyle') || 'grid',
    cardStyle: localStorage.getItem('cardStyle') || 'elevated',
    animationSpeed: parseFloat(localStorage.getItem('animationSpeed') || '1'),
    particlesEnabled: localStorage.getItem('particlesEnabled') !== 'false',
    soundEnabled: localStorage.getItem('soundEnabled') === 'true',
    showFavoritesOnly: false,
    searchTerm: '',
    roastFilter: 'all',
    sortBy: 'id-asc'
};

// Load coffees from localStorage if available
const savedCoffees = localStorage.getItem('coffees');
if (savedCoffees) {
    coffees = JSON.parse(savedCoffees);
}

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    coffeeGrid: document.getElementById('coffeeGrid'),
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    roastFilter: document.getElementById('roastFilter'),
    sortBy: document.getElementById('sortBy'),
    showFavorites: document.getElementById('showFavorites'),
    addCoffeeToggle: document.getElementById('addCoffeeToggle'),
    addCoffeeForm: document.getElementById('addCoffeeForm'),
    cancelAdd: document.getElementById('cancelAdd'),
    resultsCount: document.getElementById('resultsCount'),
    emptyState: document.getElementById('emptyState'),
    totalCoffees: document.getElementById('totalCoffees'),
    favoritesCount: document.getElementById('favoritesCount'),
    themePanelToggle: document.getElementById('themePanelToggle'),
    themePanelContent: document.getElementById('themePanelContent'),
    layoutStyle: document.getElementById('layoutStyle'),
    cardStyle: document.getElementById('cardStyle'),
    animationSpeed: document.getElementById('animationSpeed'),
    particlesToggle: document.getElementById('particlesToggle'),
    soundToggle: document.getElementById('soundToggle'),
    resetTheme: document.getElementById('resetTheme'),
    modal: document.getElementById('coffeeModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    modalBody: document.getElementById('modalBody'),
    toastContainer: document.getElementById('toastContainer'),
    particleCanvas: document.getElementById('particleCanvas')
};

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1
            });
        }
    }

    animate() {
        if (!state.particlesEnabled) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(139, 69, 19, 0.1)';
        this.ctx.strokeStyle = 'rgba(139, 69, 19, 0.05)';

        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

let particleSystem;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : 
              type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
              '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
        </svg>
        <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function playSound(type) {
    if (!state.soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
        click: 800,
        favorite: 1000,
        add: 1200,
        delete: 600
    };
    
    oscillator.frequency.value = frequencies[type] || 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function saveCoffees() {
    localStorage.setItem('coffees', JSON.stringify(coffees));
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...state.favorites]));
}

// ============================================
// COFFEE RENDERING
// ============================================

function getRoastColor(roast) {
    const colors = {
        light: '#d4a574',
        medium: '#8b4513',
        dark: '#3e2723'
    };
    return colors[roast] || '#8b4513';
}

function getRoastIcon(roast) {
    const icons = {
        light: '☀️',
        medium: '🌤️',
        dark: '🌙'
    };
    return icons[roast] || '☕';
}

function createCoffeeCard(coffee) {
    const isFavorite = state.favorites.has(coffee.id);
    
    return `
        <div class="coffee-card ${state.cardStyle}" data-id="${coffee.id}" style="animation-duration: ${state.animationSpeed}s">
            <div class="coffee-card-header">
                <span class="roast-badge" style="background: ${getRoastColor(coffee.roast)}">
                    ${getRoastIcon(coffee.roast)} ${coffee.roast}
                </span>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${coffee.id}" aria-label="Toggle favorite">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="coffee-card-body">
                <h3 class="coffee-name">${coffee.name}</h3>
                ${coffee.origin ? `<p class="coffee-origin">📍 ${coffee.origin}</p>` : ''}
                ${coffee.notes ? `<p class="coffee-notes">${coffee.notes}</p>` : ''}
                ${coffee.rating ? `
                    <div class="coffee-rating">
                        ${'★'.repeat(Math.floor(coffee.rating))}${'☆'.repeat(5 - Math.floor(coffee.rating))}
                        <span>${coffee.rating}</span>
                    </div>
                ` : ''}
            </div>
            <div class="coffee-card-footer">
                <button class="btn-view" data-id="${coffee.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Details
                </button>
                <button class="btn-delete" data-id="${coffee.id}" aria-label="Delete coffee">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function renderCoffees() {
    let filteredCoffees = [...coffees];

    // Apply search filter
    if (state.searchTerm) {
        filteredCoffees = filteredCoffees.filter(coffee =>
            coffee.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
    }

    // Apply roast filter
    if (state.roastFilter !== 'all') {
        filteredCoffees = filteredCoffees.filter(coffee => coffee.roast === state.roastFilter);
    }

    // Apply favorites filter
    if (state.showFavoritesOnly) {
        filteredCoffees = filteredCoffees.filter(coffee => state.favorites.has(coffee.id));
    }

    // Apply sorting
    filteredCoffees.sort((a, b) => {
        switch (state.sortBy) {
            case 'id-asc': return a.id - b.id;
            case 'id-desc': return b.id - a.id;
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'roast': return a.roast.localeCompare(b.roast);
            default: return 0;
        }
    });

    // Update UI
    elements.coffeeGrid.className = `coffee-grid layout-${state.layoutStyle}`;
    
    if (filteredCoffees.length === 0) {
        elements.coffeeGrid.style.display = 'none';
        elements.emptyState.style.display = 'flex';
    } else {
        elements.coffeeGrid.style.display = 'grid';
        elements.emptyState.style.display = 'none';
        elements.coffeeGrid.innerHTML = filteredCoffees.map(createCoffeeCard).join('');
    }

    // Update counts
    elements.resultsCount.innerHTML = `Showing <strong>${filteredCoffees.length}</strong> ${filteredCoffees.length === 1 ? 'coffee' : 'coffees'}`;
    elements.totalCoffees.textContent = coffees.length;
    elements.favoritesCount.textContent = state.favorites.size;
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function showCoffeeDetails(coffeeId) {
    const coffee = coffees.find(c => c.id === coffeeId);
    if (!coffee) return;

    const isFavorite = state.favorites.has(coffee.id);

    elements.modalBody.innerHTML = `
        <div class="modal-header">
            <div>
                <h2>${coffee.name}</h2>
                <p class="modal-subtitle">${coffee.origin || 'Origin Unknown'}</p>
            </div>
            <button class="favorite-btn-large ${isFavorite ? 'active' : ''}" data-id="${coffee.id}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="modal-details">
            <div class="detail-item">
                <span class="detail-label">Roast Type</span>
                <span class="roast-badge" style="background: ${getRoastColor(coffee.roast)}">
                    ${getRoastIcon(coffee.roast)} ${coffee.roast}
                </span>
            </div>
            ${coffee.notes ? `
                <div class="detail-item">
                    <span class="detail-label">Tasting Notes</span>
                    <span class="detail-value">${coffee.notes}</span>
                </div>
            ` : ''}
            ${coffee.rating ? `
                <div class="detail-item">
                    <span class="detail-label">Rating</span>
                    <div class="coffee-rating-large">
                        ${'★'.repeat(Math.floor(coffee.rating))}${'☆'.repeat(5 - Math.floor(coffee.rating))}
                        <span>${coffee.rating}/5.0</span>
                    </div>
                </div>
            ` : ''}
            <div class="detail-item">
                <span class="detail-label">Coffee ID</span>
                <span class="detail-value">#${coffee.id}</span>
            </div>
        </div>
    `;

    elements.modal.classList.add('active');
    playSound('click');
}

function closeModal() {
    elements.modal.classList.remove('active');
}

// ============================================
// THEME MANAGEMENT
// ============================================

function applyTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    state.currentTheme = themeName;
    localStorage.setItem('theme', themeName);
    
    document.querySelectorAll('.theme-preset').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

function applyLayoutStyle(layout) {
    state.layoutStyle = layout;
    localStorage.setItem('layoutStyle', layout);
    elements.layoutStyle.value = layout;
    renderCoffees();
}

function applyCardStyle(style) {
    state.cardStyle = style;
    localStorage.setItem('cardStyle', style);
    elements.cardStyle.value = style;
    renderCoffees();
}

function applyAnimationSpeed(speed) {
    state.animationSpeed = speed;
    localStorage.setItem('animationSpeed', speed);
    document.documentElement.style.setProperty('--animation-speed', `${speed}s`);
}

function toggleParticles(enabled) {
    state.particlesEnabled = enabled;
    localStorage.setItem('particlesEnabled', enabled);
    elements.particleCanvas.style.display = enabled ? 'block' : 'none';
    if (enabled && particleSystem) {
        particleSystem.animate();
    }
}

function resetTheme() {
    applyTheme('classic');
    applyLayoutStyle('grid');
    applyCardStyle('elevated');
    applyAnimationSpeed(1);
    toggleParticles(true);
    state.soundEnabled = false;
    localStorage.setItem('soundEnabled', 'false');
    elements.soundToggle.checked = false;
    elements.particlesToggle.checked = true;
    elements.animationSpeed.value = 1;
    document.querySelector('.slider-value').textContent = '1x';
    showToast('Theme reset to default', 'info');
}

// ============================================
// EVENT HANDLERS
// ============================================

// Search functionality
elements.searchInput.addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    elements.clearSearch.style.display = state.searchTerm ? 'block' : 'none';
    renderCoffees();
});

elements.clearSearch.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchTerm = '';
    elements.clearSearch.style.display = 'none';
    renderCoffees();
    playSound('click');
});

// Filter functionality
elements.roastFilter.addEventListener('change', (e) => {
    state.roastFilter = e.target.value;
    renderCoffees();
    playSound('click');
});

elements.sortBy.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCoffees();
    playSound('click');
});

// Favorites toggle
elements.showFavorites.addEventListener('click', () => {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    elements.showFavorites.classList.toggle('active', state.showFavoritesOnly);
    elements.showFavorites.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${state.showFavoritesOnly ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        ${state.showFavoritesOnly ? 'Show All' : 'Show Favorites'}
    `;
    renderCoffees();
    playSound('click');
});

// View options
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLayoutStyle(btn.dataset.view);
        playSound('click');
    });
});

// Add coffee form
elements.addCoffeeToggle.addEventListener('click', () => {
    elements.addCoffeeForm.classList.toggle('active');
    playSound('click');
});

elements.cancelAdd.addEventListener('click', () => {
    elements.addCoffeeForm.classList.remove('active');
    elements.addCoffeeForm.reset();
});

elements.addCoffeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newCoffee = {
        id: Math.max(...coffees.map(c => c.id)) + 1,
        name: document.getElementById('coffeeName').value,
        roast: document.getElementById('coffeeRoast').value,
        origin: document.getElementById('coffeeOrigin').value || undefined,
        notes: document.getElementById('coffeeNotes').value || undefined,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    };

    coffees.push(newCoffee);
    saveCoffees();
    renderCoffees();
    elements.addCoffeeForm.classList.remove('active');
    elements.addCoffeeForm.reset();
    showToast(`${newCoffee.name} added successfully!`, 'success');
    playSound('add');
});

// Coffee card interactions (using event delegation)
elements.coffeeGrid.addEventListener('click', (e) => {
    const favoriteBtn = e.target.closest('.favorite-btn');
    const viewBtn = e.target.closest('.btn-view');
    const deleteBtn = e.target.closest('.btn-delete');

    if (favoriteBtn) {
        const coffeeId = parseInt(favoriteBtn.dataset.id);
        if (state.favorites.has(coffeeId)) {
            state.favorites.delete(coffeeId);
            showToast('Removed from favorites', 'info');
        } else {
            state.favorites.add(coffeeId);
            showToast('Added to favorites!', 'success');
        }
        saveFavorites();
        renderCoffees();
        playSound('favorite');
    }

    if (viewBtn) {
        const coffeeId = parseInt(viewBtn.dataset.id);
        showCoffeeDetails(coffeeId);
    }

    if (deleteBtn) {
        const coffeeId = parseInt(deleteBtn.dataset.id);
        const coffee = coffees.find(c => c.id === coffeeId);
        if (confirm(`Are you sure you want to delete "${coffee.name}"?`)) {
            coffees = coffees.filter(c => c.id !== coffeeId);
            state.favorites.delete(coffeeId);
            saveCoffees();
            saveFavorites();
            renderCoffees();
            showToast(`${coffee.name} deleted`, 'info');
            playSound('delete');
        }
    }
});

// Modal interactions
elements.modalBody.addEventListener('click', (e) => {
    const favoriteBtn = e.target.closest('.favorite-btn-large');
    if (favoriteBtn) {
        const coffeeId = parseInt(favoriteBtn.dataset.id);
        if (state.favorites.has(coffeeId)) {
            state.favorites.delete(coffeeId);
        } else {
            state.favorites.add(coffeeId);
        }
        saveFavorites();
        showCoffeeDetails(coffeeId);
        renderCoffees();
        playSound('favorite');
    }
});

elements.modalClose.addEventListener('click', closeModal);
elements.modalOverlay.addEventListener('click', closeModal);

// Theme panel
elements.themePanelToggle.addEventListener('click', () => {
    elements.themePanelContent.classList.toggle('active');
    playSound('click');
});

document.querySelectorAll('.theme-preset').forEach(btn => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
        playSound('click');
    });
});

elements.layoutStyle.addEventListener('change', (e) => {
    applyLayoutStyle(e.target.value);
    playSound('click');
});

elements.cardStyle.addEventListener('change', (e) => {
    applyCardStyle(e.target.value);
    playSound('click');
});

elements.animationSpeed.addEventListener('input', (e) => {
    const speed = parseFloat(e.target.value);
    applyAnimationSpeed(speed);
    document.querySelector('.slider-value').textContent = `${speed}x`;
});

elements.particlesToggle.addEventListener('change', (e) => {
    toggleParticles(e.target.checked);
    playSound('click');
});

elements.soundToggle.addEventListener('change', (e) => {
    state.soundEnabled = e.target.checked;
    localStorage.setItem('soundEnabled', e.target.checked);
    if (e.target.checked) playSound('click');
});

elements.resetTheme.addEventListener('click', resetTheme);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elements.modal.classList.contains('active')) {
            closeModal();
        } else if (elements.addCoffeeForm.classList.contains('active')) {
            elements.addCoffeeForm.classList.remove('active');
        }
    }
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        elements.searchInput.focus();
    }
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Apply saved theme settings
    applyTheme(state.currentTheme);
    applyLayoutStyle(state.layoutStyle);
    applyCardStyle(state.cardStyle);
    applyAnimationSpeed(state.animationSpeed);
    
    elements.particlesToggle.checked = state.particlesEnabled;
    elements.soundToggle.checked = state.soundEnabled;
    elements.animationSpeed.value = state.animationSpeed;
    document.querySelector('.slider-value').textContent = `${state.animationSpeed}x`;

    // Initialize particle system
    particleSystem = new ParticleSystem(elements.particleCanvas);
    if (state.particlesEnabled) {
        particleSystem.animate();
    } else {
        elements.particleCanvas.style.display = 'none';
    }

    // Initial render
    renderCoffees();

    // Add entrance animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Start the application
init();
