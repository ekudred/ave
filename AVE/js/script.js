const images = document.images;
const imagesTotalCount = images.length;
const preloader = document.getElementById('page-preloader');

let imagesLoaderCount = 0;

const imageLoader = () => {
    imagesLoaderCount++;

    if (imagesLoaderCount >= imagesTotalCount) {
        window.onload = function () {
            setTimeout(() => {
                if (!preloader.classList.contains('done')) {
                    preloader.classList.add('done')
                }
            }, 1000);
        };
    };
};

if (!sessionStorage.getItem('preload')) {
    for (let i = 0; i < imagesTotalCount; i++) {
        imageClone = new Image();
        imageClone.onload = imageLoader;
        imageClone.onerror = imageLoader;
        imageClone.src = images[i].src;
    };

    sessionStorage.setItem('preload', true);
} else {
    preloader.style.display = 'none';
};;
class Modal {
    constructor(options) {
        let defaultConfig = {
            blocks: "",
            destroyed: false
        }

        this.config = Object.assign(defaultConfig, options)

        this.blocks = document.querySelectorAll(this.config.blocks)
        this.btnOpen = document.querySelector(this.config.btnOpen)

        this.modals = document.querySelectorAll('.modal-wrapper')

        this.render()
        this.open()
        this.close()
    }

    render() {
        this.blocks.forEach((block, index) => {
            block.dataset.index = index;
        })

        this.blocks.forEach((block, index) => {
            block.insertAdjacentHTML('beforebegin', `
                <div class="modal-wrapper" data-modal-index="${index}">
                    <div class="modal">
                        <div class="modal-container">
                            <div class="modal-close">
                                <svg viewBox="0 0 32 32">
                                    <g>
                                        <line class="cls-1" x1="7" x2="25" y1="7" y2="25"/>
                                        <line x1="7" x2="25" y1="25" y2="7"/>
                                    </g>
                                </svg>
                                </div>
                            <img src="${block.children[0].src}">
                        </div>
                    </div>
                </div>
            `)
        })
    }

    open() {
        const modals = document.querySelectorAll('.modal-wrapper')

        this.blocks.forEach((block, index) => {
            block.addEventListener('click', () => {
                modals[index].classList.add('modal-open')

                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    if (document.body.offsetHeight > window.innerHeight || document.body.offsetHeight > document.documentElement.clientHeight) {
                        document.body.style.paddingRight = "17px"
                    }
                }
                document.body.style.overflow = "auto hidden"

                setTimeout(() => {
                    modals[index].children[0].children[0].classList.add('anim')
                }, 20)
            })
        })
    }

    close() {
        const modals = document.querySelectorAll('.modal-wrapper')

        const closeModal = (item) => {
            setTimeout(() => {
                item.classList.remove('modal-open')
            }, 100)
            item.children[0].children[0].classList.remove('anim')
            document.body.style.paddingRight = "0"
            document.body.style.overflow = "auto"
        }

        modals.forEach(modal => {
            const btnClose = modal.querySelector('.modal-close')

            btnClose.addEventListener('click', () => {
                closeModal(modal)
            })
            
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal)
                }
            })

            document.body.addEventListener('keydown', () => {
                if (event.keyCode === 27 && modal.classList.contains('modal-open')) {
                    closeModal(modal)
                }
            })
        })
    }
}

const rangeModal = new Modal({
    blocks: ".range-modal"
})

const mainModal = new Modal({
    blocks: ".main-modal"
});
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
});;
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [51.511561, -0.139167],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-icon.png',
            iconImageSize: [50, 50],
            iconImageOffset: [0, 0]
        });
        
    myMap.behaviors.disable('scrollZoom');
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

        myMap.behaviors.disable('drag');
    }

    myMap.geoObjects
        .add(myPlacemark);
});;
$(document).ready(function(){
    $('.product-images').slick({
        infinite: true,
        slidesToScroll: true,
        draggable: true,
        // centerMode: true,
        // variableWidth: true,
        slidesToShow: 1,
        adaptiveHeight: true,
        speed: 100,
        fade: true,
        cssEase: 'linear'
    });
});;
const defaultSelect = () => {
    const colourSelect = document.querySelector("#colour-select");
    const sizeSelect = document.querySelector("#size-select");

    const selectOne = new Choices(colourSelect, {
        searchEnabled: false,
    })

    const selectTwo = new Choices(sizeSelect, {
        searchEnabled: false,
    })
}

defaultSelect();
class Tab {
    constructor(tabs, tabsContent, classTabActive, classTabContentActive) {
        this.tabs = document.querySelectorAll(tabs);
        this.tabsContent = document.querySelectorAll(tabsContent);
        this.tabActive = classTabActive;
        this.tabContentActive = classTabContentActive;
        
        this.addIndex();
        this.clickHandler();
        this.hook();
    };

    addIndex() {
        this.tabs.forEach((tab, index) => {
            tab.dataset.index = index;
        });

        this.tabsContent.forEach((tabContent, index) => {
            tabContent.dataset.index = index;
        });
    };

    clickHandler() {
        const itemsRemove = (item, itemClass) => {
            item.forEach(function(item) {
                item.classList.remove(itemClass);
            });
        };
 
        this.tabs.forEach((currentTab) => {
            currentTab.addEventListener('click', () => {
                if (!currentTab.classList.contains(this.tabActive)) {
                    itemsRemove(this.tabs, this.tabActive);
                    itemsRemove(this.tabsContent, this.tabContentActive);

                    this.tabsContent.forEach((tabContent) => {
                        if (currentTab.dataset.index === tabContent.dataset.index) {
                            tabContent.classList.add(this.tabContentActive);
                            currentTab.classList.add(this.tabActive);
                        };
                    });
                };
            });
        });
    };

    hook() {
        this.tabs[0].click();
    };
};

const tab = new Tab (
    '.product-tab',
    '.tab-content',
    'product-tab-active',
    'tab-content-active'
);;