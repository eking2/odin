const playerMove = document.querySelector('#player')
const compMove = document.querySelector('#comp')
const matchText = document.querySelector('.matchText')
const pScore = document.querySelector('#playerScore')
const cScore = document.querySelector('#compScore')
const tScore = document.querySelector('#ties')
let playerScore = 0
let compScore = 0
let ties = 0

// randomly select computer move
function compPick() {
    let picks = ['Rock', 'Paper', 'Scissors']
    let randomNum = Math.floor(Math.random() * picks.length)
    return picks[randomNum]
}

// compare player to computer move
function playRound(playerSel, compSel) {
    if (playerSel === compSel) {
        console.log('tie')
        return 0
    } else if (playerSel === 'Rock' && compSel === 'Scissors' || 
               playerSel === 'Scissors' && compSel === 'Paper' ||
               playerSel === 'Paper' && compSel === 'Rock')  {
        console.log('player win')
        return 1
    } else {
        console.log('comp win')
        return 2
    }
}

function updateScore(res) {
    if (res === 0) {
        ties++
    } else if (res === 1) {
        playerScore++
    } else {
        compScore++
    }
}

function updateBoard(playerScore, compScore, ties) {
    pScore.innerHTML = playerScore
    cScore.innerHTML = compScore
    tScore.innerHTML = ties
}

// change background color based on match result
function showMatch(playerSel, compSel, res) {
    playerMove.textContent = playerSel
    compMove.textContent = compSel

    if (res === 0) {
        playerMove.setAttribute('style', 'background-color: rgb(239, 244, 250)')
        compMove.setAttribute('style', 'background-color: rgb(239, 244, 250)')
        let text = '<h2>Tie<br><br><\h2>'
        matchText.innerHTML = text
    } else if (res === 1) {
        playerMove.setAttribute('style', 'background-color: rgb(221, 255, 217)')
        compMove.setAttribute('style', 'background-color: rgb(255, 217, 217)')
        let text = `<h2>You win<br> ${playerSel} beats ${compSel}<\h2>`
        matchText.innerHTML = text
    } else {
        compMove.setAttribute('style', 'background-color: rgb(221, 255, 217)')
        playerMove.setAttribute('style', 'background-color: rgb(255, 217, 217)')
        let text = `<h2>You lose<br> ${playerSel} is beaten by ${compSel}<\h2>`
        matchText.innerHTML = text
    }
}

// on click, play a single round
function game(playerSel) {

    let compSel = compPick()
    let res = playRound(playerSel, compSel)
    updateScore(res)
    showMatch(playerSel, compSel, res)
    updateBoard(playerScore, compScore, ties)

    // start with text hidden to put reset button in right place
    matchText.style.visibility = 'visible'
}

// wait for any button other than reset
const buttons = document.querySelectorAll('.sel')
buttons.forEach((button) => {
    button.addEventListener('click', () => game(button.id))
})
