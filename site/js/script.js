// script.js

// 1) Плавное появление при загрузке страницы
window.addEventListener('load', () => {
    // Когда страница загружена, добавляем класс fade-in к body
    document.body.classList.add('fade-in');
});

// 2) Плавный уход при клике на ссылки
document.addEventListener('DOMContentLoaded', () => {
    // Ищем все ссылки <a> на нашем сайте (включая меню),
    // которые, вероятнее всего, ведут на внутренние страницы .html
    const links = document.querySelectorAll('a[href$=".html"], nav a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const url = this.getAttribute('href');
            // Если ссылка идёт на другую страницу (не якорь #)
            if (url && !url.includes('#')) {
                e.preventDefault();

                // Убираем fade-in, ставим fade-out
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');

                // Ждём конца анимации ~0.4s (см. style.css)
                setTimeout(() => {
                    window.location = url;
                }, 400);
            }
        });
    });

    // 3) Плавное раскрытие постов в журнале
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const header = post.querySelector('.post-header');
        header.addEventListener('click', () => {
            // Переключаем класс .open
            post.classList.toggle('open');
        });
    });
});
