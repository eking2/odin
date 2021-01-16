// drawing toggle
let active = false
const grid = document.querySelector('.grid')
grid.addEventListener('click', () => active = !active)

// randomly color after hovering on a cell
function colorCell(e) {
    let red = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)

    if (active) e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue}`
}

// make individual cells and place into grid
function makeGrid(side) {

    for(let i = 1; i < side*side+1; i++){

        // create and append to grid
        let newCell = document.createElement('div')
        newCell.classList.add('cell')
        newCell.addEventListener('mouseover', colorCell)
        grid.appendChild(newCell)
    }
}

// clear grids
function reset() {
    const cells = document.querySelectorAll('.cell')

    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'white'
    }
}

// resize grid
function resize() {

    let newSide = prompt('Side length (2-100):')

    // not numeric, size out of range
    if (isNaN(newSide) || newSide > 100 || newSide < 2) {
        newSide = 16
        alert('Invalid target side, setting to 16')
    }

    document.documentElement.style.setProperty('--side', `${newSide}`)

    // remove current grid and make new
    let cells = document.querySelectorAll('.cell')
    cells.forEach(element => element.remove())
    makeGrid(newSide)
}

function setupButtons() {
    const resetBtn = document.querySelector('#reset')
    const newGridBtn = document.querySelector('#new')

    resetBtn.addEventListener('click', reset)
    newGridBtn.addEventListener('click', resize)
}

// default start with 16
setupButtons()
makeGrid(16)

