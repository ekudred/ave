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
})