// Efeito de scroll suave para links de navegacao
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

const header = document.querySelector('header');
let lastScroll = 0;

function atualizarAlturaHeader() {
    if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
}

atualizarAlturaHeader();
window.addEventListener('load', atualizarAlturaHeader);
window.addEventListener('resize', atualizarAlturaHeader);

// Animacao do menu ao rolar a pagina
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Animacao de entrada dos elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            currentObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para animar
document.querySelectorAll('.service-card, .atendimento-card, .about-text, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Popup
const popup = document.getElementById('popup-sucesso');
const popupFechar = document.getElementById('popup-fechar');

function abrirPopup() {
    if (popup) {
        popup.classList.add('ativo');
    }
}

function fecharPopup() {
    if (popup) {
        popup.classList.remove('ativo');
    }
}

if (popupFechar) {
    popupFechar.addEventListener('click', fecharPopup);
}

if (popup) {
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            fecharPopup();
        }
    });
}

function mostrarErroEnvio(message) {
    alert(message || 'Nao foi possivel enviar sua mensagem. Tente novamente mais tarde.');
}

// Formulario com FormSubmit AJAX
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        const formData = new FormData(this);

        try {
            const response = await fetch('https://formsubmit.co/ajax/liditerapia.a@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const data = await response.json();

            if (data.success === 'true' || data.success === true) {
                this.reset();
                abrirPopup();
            } else {
                const mensagemErro = data.message
                    ? `Nao foi possivel enviar o formulario: ${data.message}`
                    : 'Nao foi possivel enviar sua mensagem. Tente novamente mais tarde.';
                mostrarErroEnvio(mensagemErro);
            }
        } catch (error) {
            mostrarErroEnvio('Nao foi possivel enviar sua mensagem. Tente novamente mais tarde.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Contador de caracteres para o textarea
const textarea = document.querySelector('textarea');

if (textarea) {
    const maxLength = 500;
    textarea.setAttribute('maxlength', maxLength);

    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0/${maxLength}`;
    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', function () {
        const remaining = maxLength - this.value.length;
        counter.textContent = `${this.value.length}/${maxLength}`;

        if (remaining < 50) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = '#666';
        }
    });
}
