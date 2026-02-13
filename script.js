// Elementos del DOM
const floatingMenuBtn = document.getElementById('floating-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// Crear overlay para cerrar el menú al hacer click fuera
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

// Función para abrir el menú móvil
function openMobileMenu() {
    mobileMenu.classList.add('active');
    floatingMenuBtn.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    floatingMenuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Event listener para el botón hamburguesa
floatingMenuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Event listener para el botón de cerrar
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Event listener para el overlay
overlay.addEventListener('click', closeMobileMenu);

// Cerrar menú al hacer click en un link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scroll para todos los enlaces (desktop y móvil)
const allNavLinks = document.querySelectorAll('a[href^="#"]');

allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerOffset = window.innerWidth <= 768 ? 60 : 82;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Prevenir scroll horizontal en móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;

    // Swipe desde la izquierda para abrir menú
    if (swipeDistance > swipeThreshold && touchStartX < 50 && !mobileMenu.classList.contains('active')) {
        openMobileMenu();
    }

    // Swipe hacia la izquierda para cerrar menú
    if (swipeDistance < -swipeThreshold && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Animación para header al hacer scroll (opcional)
let lastScroll = 0;
const header = document.querySelector('header');
const mobileHeader = document.querySelector('.mobile-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // En desktop
    if (window.innerWidth > 768 && header) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            header.style.transform = 'translateY(0)';
        }
    }

    // En móvil
    if (window.innerWidth <= 768 && mobileHeader) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo
            mobileHeader.style.transform = 'translateY(-100%)';
            floatingMenuBtn.style.top = '10px';
        } else {
            // Scroll hacia arriba
            mobileHeader.style.transform = 'translateY(0)';
            floatingMenuBtn.style.top = '20px';
        }
    }

    lastScroll = currentScroll;
});

// Lazy loading para imágenes (mejor performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// Log para confirmar que el script está cargado
console.log('ARTEMODA - Website cargado correctamente');
