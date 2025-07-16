const setupGallery = () => {

    const body = document.querySelector("body");
    const modal = document.getElementById("gallery-modal");
    const modalImage = modal.getElementsByClassName("gallery-img")[0];
    const closeButtons = Array.from(modal.getElementsByClassName("gallery-close-button"));
    const galleryElements = Array.from(document.getElementsByClassName("gallery"));

    var imageSources = [];

    const loadImg = (img) => {
        modalImage.src = img.src;
        modalImage.srcset = img.srcset;
    }
    const iterateImagesInGallery = (gallery, callback) => {
        Array.from(gallery.getElementsByTagName("img")).forEach(callback);
    }

    const close = () => {
        modal.style.display = "none";
        body.style.overflow = 'auto';
    }
    const open = (gallery, img) => {
        imageSources = [];
        iterateImagesInGallery(gallery, (img) => {
            imageSources.push({ src: img.src, srcset: img.srcset });
        });
        loadImg(img);
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
    }

    const currentIndex = () => {
        const index = imageSources.findIndex(e =>
            (e.src && e.src === modalImage.src) ||
            (e.srcset && e.srcset === modalImage.srcset)
        );
        return index;
    }
    const next = () => {
        const next = (currentIndex() + 1) % imageSources.length;
        loadImg(imageSources[next]);
    }
    const previous = () => {
        const prev = (currentIndex() - 1 + imageSources.length) % imageSources.length;
        loadImg(imageSources[prev]);
    }

    const onKeyDown = (event) => {
        if (modal.style.display != "block") {
            return;
        }
        if (event.key == 'Escape') {
            close();
        } else if (event.key == 'ArrowRight') {
            next();
        } else if (event.key == 'ArrowLeft') {
            previous();
        }
    }
    let initialTouch = null;
    const onTouchStart = (event) => {
        if (event.touches.length == 1) {
            initialTouch = event.touches[0];
        }
    }
    const onTouchMove = (event) => {
        if (!initialTouch) { return }
        const touch = event.touches[0];
        const diffX = initialTouch.clientX - touch.clientX;
        const diffY = initialTouch.clientY - touch.clientY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            (diffX > 0) ? next() : previous();
        }
        initialTouch = null;
    }
    const onTouchEnd = (event) => {
        initialTouch = null;
    }

    modal.onclick = close;
    modalImage.onclick = (e) => {
        e.stopPropagation();
        const w = e.target.getBoundingClientRect().width;
        const p = (w - e.clientX) / w;
        if (p > 0.5) {
            previous();
        } else {
            next();
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onTouchEnd, false);

    closeButtons.forEach((button) => {
        button.onclick = close;
    })

    galleryElements.forEach((gallery) => {
        iterateImagesInGallery(gallery, (img, index, array) => {
            img.onclick = () => open(gallery, img);
            if (index == 2 && array.length > 3) {
                const text = document.createTextNode(`+${array.length - 3}`);
                const countLabel = document.createElement('div');
                countLabel.className = "gallery-count";
                countLabel.appendChild(text);
                img.parentElement.appendChild(countLabel);
            }
        })
    })
}

window.addEventListener("load", setupGallery, true);
