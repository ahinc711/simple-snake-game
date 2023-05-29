import _ from 'lodash';
import './style.css';

const gameBoardSize = 30
const snakeSize = 5
const gameSpeedMs = 1000
const Sides = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left'
}
const Directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}
let gameBoard = []
let currRow, currCol, direction
let intervalId
let snakeCells = []


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


function initStartingPosition() {
  // Pick a random spot from the snake to come from (edge of game board)
  // 0, 1, 2, 3 will be top, right, bottom, left respectively
  let startSide = Sides[Math.floor(Math.random() * 4)]
  let startPos = Math.floor(Math.random() * gameBoardSize)
  console.log(`starting from side ${startSide} at pos ${startPos}`)
  switch (startSide) {
    case 'top':
      currRow = 0
      currCol = startPos
      direction = Directions.down 
      break
    case 'right':
      currRow = startPos
      currCol = gameBoardSize - 1
      direction = Directions.left
      break
    case 'bottom':
      currRow = gameBoardSize - 1
      currCol = startPos
      direction = Directions.up
      break
    case 'left':
      currRow = startPos
      currCol = 0
      direction = Directions.right
      break
    default:
      displayError('Could not start the game. Invalid starting side ' + startSide)
      return
  }

  setCellActive(currRow, currCol)
}


function moveSnake() {
  try {
    switch (direction) {
      case 'up':
        currRow--
        break
      case 'right':
        currCol++
        break
      case 'left':
        currCol--
        break
      case 'down':
        currRow++
        break
      default:
        displayError('Invalid direction encountered: ' + startSide)
        return
    }
    
    // Temporarily stopping when the snake hits the edge of the board
    if (currRow < 0 || currRow >= gameBoardSize || currCol < 0 || currCol >= gameBoardSize) {
      displayGameOver()
      clearInterval(intervalId)
      return;
    }

    // If snake size has grown to max size, start disabling
    if (snakeCells.length == snakeSize) {
      setCellInactive(snakeCells[0][0], snakeCells[0][1])
    }

    setCellActive(currRow, currCol)
  }
  catch(ex) {
    displayError('Encountered unexpected error: ' + ex)
    clearInterval(intervalId)
  }
}

function setCellActive(row, col) {
  gameBoard[row][col].classList.add('active')
  snakeCells.push([row, col])
}

function setCellInactive(row, col) {
  gameBoard[row][col].classList.remove('active')
  snakeCells.shift()
}

function displayError(errorText) {
  const errorContainer = document.createElement('div')
  errorContainer.classList.add('error')
  errorContainer.innerText = errorText
  document.body.insertBefore(errorContainer, document.body.firstChild)
}

function displayGameOver() {
  const gameOverContainer = document.createElement('div')
  gameOverContainer.classList.add('gameOver')
  gameOverContainer.innerText = "GAME OVER! :("
  document.body.insertBefore(gameOverContainer, document.body.firstChild)
}


function main() {
  initGameBoard()
  initStartingPosition()  
  console.log("Starting snake!")
  intervalId = setInterval(moveSnake, gameSpeedMs)
}

main()