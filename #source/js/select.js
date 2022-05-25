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

defaultSelect()