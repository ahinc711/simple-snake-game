import _ from 'lodash';
import './style.css';

let gameBoardSize = 30
let gameBoard = []
let sides = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left'
}

function initGameBoard() {
  // Initialize the HTML elements for the game board and
  // set up the references to the elements in gameBoard
  const container = document.createElement('div')
  container.classList.add('game-container')

  for (var i = 0; i < gameBoardSize; ++i) {
    let row = []
    let rowElem = document.createElement('div')
    rowElem.classList.add('row')

    for (var j = 0; j < gameBoardSize; ++j) {
      let cellElem = document.createElement('span')
      cellElem.classList.add('cell')
      rowElem.appendChild(cellElem)
      row.push(cellElem)
    }

    container.appendChild(rowElem)
    gameBoard.push(row)
  }
  
  document.body.appendChild(container);
}

function gameLoop() {
  console.log("Starting snake!")

  // Pick a random spot from the snake to come from (edge of game board)
  // 0, 1, 2, 3 will be top, right, bottom, left respectively
  let startSide = sides[Math.floor(Math.random() * 4)]
  let startPos = Math.floor(Math.random() * gameBoardSize)
  console.log(`starting from side ${startSide} at pos ${startPos}`)
  let currRow, currCol
  switch (startSide) {
    case 'top':
      currRow = 0
      currCol = startPos
      break
    case 'right':
      currRow = startPos
      currCol = gameBoardSize - 1
      break
    case 'bottom':
      currRow = gameBoardSize - 1
      currCol = startPos
      break
    case 'left':
      currRow = startPos
      currCol = 0
      break
    default:
      displayError('Could not start the game. Invalid starting side ' + startSide)
      return
  }

  setCellActive(currRow, currCol)
}

function setCellActive(row, col) {
  gameBoard[row][col].classList.add('active')
}

function setCellInactive(row, col) {
  gameBoard[row][col].classList.remove('active')
}

function displayError(errorText) {
  const errorContainer = document.createElement('div')
  errorContainer.classList.add('error')
  errorContainer.innerText = errorText
  document.body.insertBefore(errorContainer, document.body.firstChild)
}


function main() {
  initGameBoard()
  setTimeout(gameLoop, 1000)
}

main()