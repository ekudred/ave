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
};