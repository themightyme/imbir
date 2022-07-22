// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.menu'),
//     menuItem = document.querySelectorAll('.menu_item'),
//     hamburger = document.querySelector('.hamburger');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('hamburger_active');
//         menu.classList.toggle('menu_active');
//     });

//     menuItem.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.toggle('hamburger_active');
//             menu.classList.toggle('menu_active');
//         })
//     })
// })

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
            //gsap.from(".element-show", { duration: 2, rotation: 360, scale: 0.0, ease: Elastic.easeOut });
        }
    });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
    observer.observe(elm);
}

$(document).ready(function () {
    $('[data-modal=order]').on('click', function () {
        $('.overlay, #order').fadeIn(300);
    });

    $('[data-modal=question]').on('click', function () {
        $('.overlay, #question').fadeIn(300);
    });

    $('.modal-window__close').on('click', function () {
        $('.overlay, #order, #thanks, #question').fadeOut(300);
    });
});