document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedTime = document.getElementById('selectedTime');
    const summaryTime = document.getElementById('summaryTime');

    timeSlots.forEach((slot) => {
        slot.addEventListener('click', () => {
            timeSlots.forEach((item) => item.classList.remove('active'));
            slot.classList.add('active');

            const day = slot.dataset.day;
            const time = slot.dataset.time;
            const value = `${day} • ${time}`;

            if (selectedTime) selectedTime.textContent = value;
            if (summaryTime) summaryTime.textContent = value;
        });
    });

    const bookingForm = document.getElementById('bookingForm');
    bookingForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim() || 'Cliente';
        const phone = document.getElementById('phone')?.value.trim() || 'N/A';
        const chosen = document.getElementById('summaryTime')?.textContent || 'Segunda • 06:30';

        const message = encodeURIComponent(
            `Olá Karol! Gostaria de verificar a disponibilidade de horário e conversar sobre o contrato do treinamento.\n\nNome: ${name}\nWhatsApp: ${phone}\nHorário desejado: ${chosen}`
        );

        window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
    });

    document.querySelectorAll('.faq-item').forEach((item) => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach((faq) => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
});
