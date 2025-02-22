document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const langButtons = document.querySelectorAll('.lang-btn');
    const hexagons = document.querySelectorAll('.hexagon');
    const cards = document.querySelectorAll('.certificate-card, .project-card');

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambio de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remover clase activa de todos los botones
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activar el botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido del idioma seleccionado
            document.querySelectorAll('.content').forEach(content => {
                content.classList.remove('active');
                if (content.classList.contains(lang)) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Efecto parallax suave para hexágonos
    document.addEventListener('mousemove', function(e) {
        hexagons.forEach(hexagon => {
            const speed = 1.5;
            const rect = hexagon.getBoundingClientRect();
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            hexagon.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Animación de cards al hacer hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Observador de intersección para animaciones al scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Actualizar navegación activa
                navLinks.forEach(link => {
                    const sectionId = entry.target.getAttribute('id');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-hidden');
    });

    // Animación de la firma
    const signature = document.querySelector('.signature');
    if (signature) {
        const signatureObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    signature.classList.add('signature-visible');
                }
            });
        }, { threshold: 0.5 });

        signatureObserver.observe(signature);
    }

    // Efecto de brillo al hover en hexágonos
    hexagons.forEach(hexagon => {
        hexagon.addEventListener('mouseenter', function() {
            this.classList.add('hexagon-glow');
        });

        hexagon.addEventListener('mouseleave', function() {
            this.classList.remove('hexagon-glow');
        });
    });

    // Animación de carga inicial
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});