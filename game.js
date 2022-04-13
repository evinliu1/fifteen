const puzzleContainer = document.querySelector("#puzzle-container")
let puzzle = []
let grid = 4

var shuffle = document.getElementById("shuffle");
shuffle.onclick = function(){
location.reload()
}

window.onload = function (){
	generatePuzzle()
	randomizePuzzle()
	renderPuzzle()
	handleInput()
}



function getRow(pos) {
	return Math.ceil(pos / 4)
}

function getCol(pos) {
	const col = pos % 4
	if (col === 0) {
		return 4
	}
	return col
}

function generatePuzzle() {
	for (let i = 1; i <= 16; i++) {
		puzzle.push({
		value: i,
		position: i,
		x: (getCol(i) - 1) * 100,
		y: (getRow(i) - 1) * 100,
		hidden: false,
			})
		}
}
function renderPuzzle() {
	puzzleContainer.innerHTML = ""
	for (let puzzleItem of puzzle) {
		if (puzzleItem.hidden) continue
		puzzleContainer.innerHTML += `
			<div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
				${puzzleItem.value}
			</div>
		`
  }
}

function randomizePuzzle() {
	const randomValues = getRandomValues()
	let i = 0
	for (let puzzleItem of puzzle) {
		puzzleItem.value = randomValues[i]
		i++
	}
	const invisible = puzzle.find((item) => item.value === 16)
	invisible.hidden = true
}

function getRandomValues() {
	const values = []
	for (let i = 1; i <= 16; i++) {
		values.push(i)
	}
	const randomValues = values.sort(() => Math.random() - 0.5)
	return randomValues
}

function handleInput() {
	document.addEventListener("keydown", handleKeyDown)
}

function handleKeyDown(e) {
	console.log(e.key)
	switch (e.key) {
			case "ArrowLeft":
				moveLeft()
				break
			case "ArrowRight":
				moveRight()
				break
			case "ArrowUp":
				moveUp()
				break
			case "ArrowDown":
				moveDown()
				break
			}
			renderPuzzle()
}

function moveLeft() {
	const emptyPuzzle = getEmptyPuzzle()
	const rightPuzzle = getRightPuzzle()
		if (rightPuzzle) {
			swapPositions(emptyPuzzle, rightPuzzle, true)
		}
}
function moveRight() {
	const emptyPuzzle = getEmptyPuzzle()
	const leftPuzzle = getLeftPuzzle()
	if (leftPuzzle) {
		swapPositions(emptyPuzzle, leftPuzzle, true)
	}
}
function moveUp() {
	const emptyPuzzle = getEmptyPuzzle()
	const belowPuzzle = getBelowPuzzle()
	if (belowPuzzle) {
		swapPositions(emptyPuzzle, belowPuzzle, false)
	}
}
function moveDown() {
	const emptyPuzzle = getEmptyPuzzle()
	const abovePuzzle = getAbovePuzzle()
	if (abovePuzzle) {
		swapPositions(emptyPuzzle, abovePuzzle, false)
	}
}

function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
	let temp = firstPuzzle.position
	firstPuzzle.position = secondPuzzle.position
	secondPuzzle.position = temp
	if (isX) {
		temp = firstPuzzle.x
		firstPuzzle.x = secondPuzzle.x
		secondPuzzle.x = temp
	} else {
		temp = firstPuzzle.y
		firstPuzzle.y = secondPuzzle.y
		secondPuzzle.y = temp
	}
		}

function getRightPuzzle() {
		const emptyPuzzle = getEmptyPuzzle()
		const isRightEdge = getCol(emptyPuzzle.position) === grid
		if (isRightEdge) {
			return null
		}
		const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
		return puzzle
		}

function getLeftPuzzle() {
		const emptyPuzzle = getEmptyPuzzle()
		const isLeftEdge = getCol(emptyPuzzle.position) === 1
		if (isLeftEdge) {
			return null
		}
		const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
		return puzzle
}

function getAbovePuzzle() {
	const emptyPuzzle = getEmptyPuzzle()
	const isTopEdge = getRow(emptyPuzzle.position) === 1
	if (isTopEdge) {
		return null
	}
	const puzzle = getPuzzleByPos(emptyPuzzle.position - grid)
	return puzzle
	}

function getBelowPuzzle() {
	const emptyPuzzle = getEmptyPuzzle()
	const isBottomEdge = getRow(emptyPuzzle.position) === grid
	if (isBottomEdge) {
		return null
	}
	const puzzle = getPuzzleByPos(emptyPuzzle.position + grid)
	return puzzle
}

function getEmptyPuzzle() {
	return puzzle.find((item) => item.hidden)
}

function getPuzzleByPos(pos) {
	return puzzle.find((item) 	=> item.position === pos)
}
