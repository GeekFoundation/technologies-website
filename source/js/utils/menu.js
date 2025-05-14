const menu = () => {
    const nav = document.querySelector('[data-main-menu="menu"]');
    const triggerNav = document.querySelectorAll('[data-main-menu="trigger"]');
    const wrapper = document.querySelector('body');
    const linksScrollTo = document.querySelectorAll('.js-scrollto-link');

    triggerNav.forEach(current => {
        current.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 1081.1px)').matches) {
                nav.classList.toggle('is-active');
                current.classList.toggle('is-open');
                wrapper.classList.toggle('is-hidden');
            }
        });
    });

    linksScrollTo.forEach(current => {
        current.addEventListener('click', (e) => {
            const selector = current.getAttribute('href');
            if (selector.startsWith("#")) {
                e.preventDefault();
                wrapper.classList.remove('is-hidden');
                const element = document.querySelector(selector);
                element.scrollIntoView({ behavior : 'smooth' });
                nav.classList.remove('is-active');
                document.querySelector('[data-main-menu="trigger"]').classList.remove('is-open');
            }
        });
    });

};

export default menu;
