// Efeito de scroll suave para links de navegação
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

// Animação do menu ao rolar a página
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animação de entrada dos elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para animar
document.querySelectorAll('.service-card, .atendimento-card, .about-text, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animação de envio
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulação de envio (substitua por sua lógica de envio real)
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.backgroundColor = '#27ae60';
            
            // Reset do formulário
            this.reset();
            
            // Restauração do botão após 3 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Contador de caracteres para o textarea
const textarea = document.querySelector('textarea');
if (textarea) {
    const maxLength = 500;
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0/${maxLength}`;
    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        counter.textContent = `${this.value.length}/${maxLength}`;
        
        if (remaining < 50) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = '#666';
        }
    });
} 