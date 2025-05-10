window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
    document.body.classList.add('fade-in');
});

document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 3;
    const y = (e.clientY / window.innerHeight - 0.5) * 3;
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

        header.addEventListener('mouseenter', () => {
            if (!header.classList.contains('active')) {
                header.style.backgroundColor = 'rgba(41, 98, 255, 0.05)';
                header.style.borderLeft = '2px solid var(--color-primary-light)';
            }
        });

        header.addEventListener('mouseleave', () => {
            if (!header.classList.contains('active')) {
                header.style.backgroundColor = '';
                header.style.borderLeft = '';
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

    setTimeout(() => {
        document.querySelectorAll('.card-grid').forEach(grid => {
            grid.classList.add('loaded');
        });
        document.querySelectorAll('.command-grid').forEach(grid => {
            grid.classList.add('loaded');
        });
    }, 300);

    if (document.getElementById('resources')) {
        document.querySelectorAll('#resources .card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    document.querySelectorAll('.card, .command-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(41, 98, 255, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    document.querySelectorAll('.card img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 5px 15px rgba(41, 98, 255, 0.3)';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = '';
            img.style.boxShadow = '';
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.textShadow = '0 0 10px rgba(41, 98, 255, 0.5)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.textShadow = '';
        });
    }

    document.querySelectorAll('.btn, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = '50% 50%';
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    createThemeToggle();
});

function detectPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        return;
    }

    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMatcher.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

detectPreferredTheme();

function createThemeToggle() {
    const btn = document.createElement('button');
    btn.id = 'themeToggleBtn';
    btn.setAttribute('aria-label', 'Переключить тему');
    btn.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark'
        ? '<span class="material-icons">light_mode</span>'
        : '<span class="material-icons">dark_mode</span>';

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', toggleTheme);
    document.body.appendChild(btn);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.innerHTML = newTheme === 'dark'
            ? '<span class="material-icons">light_mode</span>'
            : '<span class="material-icons">dark_mode</span>';
    }
}
