window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
    document.body.classList.add('fade-in');
});

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'particle';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = 5 + Math.random() * 5 + 's';
        document.body.appendChild(star);
    }
});

document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const isOpen = header.classList.contains('active');
            document.querySelectorAll('.accordion-header.active').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });
            if (!isOpen) {
                header.classList.add('active');
                const body = header.nextElementSibling;
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function() {
            const myP = this.closest('.card-body').querySelector('p');
            document.querySelectorAll('.card-body p.expanded').forEach(p => {
                if (p !== myP) {
                    p.classList.remove('expanded');
                    p.style.maxHeight = '';
                    const otherBtn = p.closest('.card-body').querySelector('.read-more');
                    if (otherBtn) otherBtn.textContent = 'Читать далее';
                }
            });

            if (myP.classList.contains('expanded')) {
                myP.classList.remove('expanded');
                myP.style.maxHeight = '';
                this.textContent = 'Читать далее';
            } else {
                myP.classList.add('expanded');
                myP.style.maxHeight = myP.scrollHeight + 'px';
                this.textContent = 'Свернуть';
            }
        });
    });

    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
