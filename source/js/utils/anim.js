import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const Anim = () => {
    if (window.matchMedia('(min-width: 681.2px)').matches) {
        const cardsWrappers = gsap.utils.toArray('[ data-panels="section"]');
        const cards = gsap.utils.toArray('[data-panels="item"]');

        cardsWrappers.forEach((wrapper, i) => {
            const card = cards[i];
            let scale = 1,
                rotation = 0;
            if (i !== cards.length - 1) {
                rotation = -10;
            }
            gsap.to(card, {
                y: rotation,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top " + (60 + 10 * i),
                    end: "bottom 350",
                    endTrigger: "[data-panels='wrapper']",
                    scrub: true,
                    pin: wrapper,
                    pinSpacing: false,
                    id: i + 1
                }
            });
        });
    }

    let itemAnimate = document.querySelectorAll('[data-scroll-animate]');

    itemAnimate.forEach(item => {
        let anim = JSON.parse(item.getAttribute('data-scroll-animate'));

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                // toggleActions: 'restart none none reset',
            }
        })

        tl.from(item, anim.duration, {
            x: anim.x,
            y: anim.y,
            opacity: anim.opacity,
            ease: "none",
        })
    })
};

export default Anim;
