// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Animaciones reveal
  const elements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(el => obs.observe(el));
  } else {
    elements.forEach(el => el.classList.add('show'));
  }

  // Envío de formulario de contacto
  const form = document.getElementById('contact-form');
  if (form) {
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 👉 CAMBIA ESTA LÍNEA CON TU ENDPOINT REAL DE FORMSPREE
      const FORMSPREE_URL = 'https://formspree.io/f/xgvrreyo';

      if (FORMSPREE_URL.includes('YOUR_FORMSPREE_ENDPOINT')) {
        statusEl.textContent = 'Configura primero tu endpoint de Formspree en main.js';
        return;
      }

      statusEl.textContent = 'Enviando...';

      const formData = new FormData(form);

      try {
        const resp = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (resp.ok) {
          statusEl.textContent = '✅ Gracias, tu mensaje fue enviado.';
          form.reset();
        } else {
          statusEl.textContent = '❌ Ocurrió un problema al enviar el mensaje.';
        }
      } catch (err) {
        console.error(err);
        statusEl.textContent = '❌ Error de conexión al enviar el mensaje.';
      }
    });
  }
});
