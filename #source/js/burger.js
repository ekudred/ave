const burger = document.querySelector('.burger-wrapper');
const burgerNav = document.querySelector('.burger-navigation-wrapper');

burger.addEventListener('click', () => {
    if (burgerNav.classList.contains('active')) {
        burgerNav.classList.remove('anim');

        setTimeout(() => {
            burgerNav.classList.remove('active')
        }, 200);

        return;
    };

    burgerNav.classList.add('active');

    setTimeout(() => {
        burgerNav.classList.add('anim');
    }, 20);
});

const addIndex = (items) => {
    items.forEach((item, index) => {
        item.dataset.index = index;
    });
};

const bt = document.querySelectorAll('.bt');
const bsn = document.querySelectorAll('.burger-sub-nav');

addIndex(bt);
addIndex(bsn);

bt.forEach(item => {
    item.addEventListener('click', () => {
        if (bsn[item.dataset.index].classList.contains('open')) {
            bsn[item.dataset.index].classList.remove('open');

            return
        };
        bsn[item.dataset.index].classList.add('open');
    });
});