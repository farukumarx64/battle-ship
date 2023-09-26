/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game-board */ \"./src/modules/game-board.js\");\n/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ship */ \"./src/modules/ship.js\");\n/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ \"./src/modules/player.js\");\n/* harmony import */ var _modules_render_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/render-game */ \"./src/modules/render-game.js\");\n\n\n\n\n\n// ... (Previous code for Ship, GameBoard, Player, ComputerPlayer, and initial setup)\n\n// Initialize game objects and render the initial game boards\nconst playerGameBoard = new _modules_game_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst computerPlayer = new _modules_player__WEBPACK_IMPORTED_MODULE_2__.ComputerPlayer();\nconst enemyGameBoard = new _modules_game_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst playerBoard = document.getElementById(\"player-board\");\nconst enemyBoard = document.getElementById(\"enemy-board\");\nconst attackButton = document.getElementById(\"attack-button\");\nconst startButton = document.getElementById(\"start-button\");\n\nlet isGameStarted = false;\n\n// Function to render the game boards with ships\nfunction renderInitialBoards() {\n  (0,_modules_render_game__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);\n\n  // Add event listeners to player's board for ship placement (drag and drop)\n  playerBoard.addEventListener(\"dragstart\", handleDragStart);\n  playerBoard.addEventListener(\"dragover\", handleDragOver);\n  playerBoard.addEventListener(\"dragenter\", handleDragEnter);\n  playerBoard.addEventListener(\"dragleave\", handleDragLeave);\n  playerBoard.addEventListener(\"drop\", handleDrop);\n  playerBoard.addEventListener(\"dragend\", handleDragEnd);\n}\n\n// Variables to keep track of the currently dragged ship\nlet draggedShip = null;\nlet draggedShipX = null;\nlet draggedShipY = null;\nlet isHorizontal = true; // Default orientation is horizontal\n\n// Function to handle the start of the drag operation\nfunction handleDragStart(event) {\n  const cell = event.target;\n  if (cell.classList.contains(\"ship\")) {\n    draggedShip = cell;\n    draggedShipX = parseInt(cell.dataset.x);\n    draggedShipY = parseInt(cell.dataset.y);\n    isHorizontal = cell.classList.contains(\"horizontal\");\n    cell.classList.add(\"dragging\");\n    event.dataTransfer.setData(\"text\", \"\"); // Required for some browsers to allow drag and drop\n  }\n}\n\n// Function to handle dragging over valid drop zones\nfunction handleDragOver(event) {\n  event.preventDefault();\n  const cell = event.target;\n  if (isValidDropZone(cell)) {\n    cell.classList.add(\"hovered\");\n  }\n}\n\n// Function to handle entering a valid drop zone\nfunction handleDragEnter(event) {\n  const cell = event.target;\n  if (isValidDropZone(cell)) {\n    cell.classList.add(\"hovered\");\n  }\n}\n\n// Function to handle leaving a valid drop zone\nfunction handleDragLeave(event) {\n  event.target.classList.remove(\"hovered\");\n}\n\n// Function to handle the drop operation\nfunction handleDrop(event) {\n  const cell = event.target;\n  if (isValidDropZone(cell)) {\n    const x = parseInt(cell.dataset.x);\n    const y = parseInt(cell.dataset.y);\n    playerGameboard.placeShip(draggedShip.dataset.length, x, y, isHorizontal);\n    (0,_modules_render_game__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(playerBoard, enemyBoard, playerGameboard, enemyGameboard);\n  }\n  event.target.classList.remove(\"hovered\");\n}\n\n// Function to handle the end of the drag operation\nfunction handleDragEnd(event) {\n  if (draggedShip) {\n    draggedShip.classList.remove(\"dragging\");\n    draggedShip = null;\n    draggedShipX = null;\n    draggedShipY = null;\n    isHorizontal = true; // Reset orientation to horizontal\n  }\n}\n\n// Function to check if a cell is a valid drop zone for ship placement\nfunction isValidDropZone(cell) {\n  if (cell.classList.contains(\"empty\")) {\n    const x = parseInt(cell.dataset.x);\n    const y = parseInt(cell.dataset.y);\n    return playerGameboard.canPlaceShip(\n      draggedShip.dataset.length,\n      x,\n      y,\n      isHorizontal\n    );\n  }\n  return false;\n}\n\n// Initialize game with ships placement\nstartButton.addEventListener(\"click\", () => {\n  if (!isGameStarted) {\n    playerGameBoard.placeShip(new _modules_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](5), 0, 0, true); // Example ship placement\n    playerGameBoard.placeShip(new _modules_ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4), 2, 2, false); // Example ship placement\n    // Add more ship placements as needed\n\n    renderInitialBoards();\n    startButton.disabled = true;\n    attackButton.disabled = false;\n    isGameStarted = true;\n  }\n});\n\n// Function to handle player's attack\nfunction handlePlayerAttack(x, y) {\n  if (isGameStarted && !playerGameBoard.allShipsSunk()) {\n    if (playerGameBoard.receiveAttack(x, y)) {\n      console.log(`Player hit at (${x}, ${y})!`);\n    } else {\n      console.log(`Player missed at (${x}, ${y}).`);\n    }\n    (0,_modules_render_game__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);\n\n    // Check if the game has ended\n    if (playerGameBoard.allShipsSunk()) {\n      console.log(\"Player wins!\");\n      attackButton.disabled = true;\n    } else {\n      // Computer player's turn\n      setTimeout(() => {\n        computerPlayer.makeRandomAttack(playerGameBoard);\n        (0,_modules_render_game__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n          playerBoard,\n          enemyBoard,\n          playerGameBoard,\n          enemyGameBoard\n        );\n\n        // Check if the game has ended\n        if (playerGameBoard.allShipsSunk()) {\n          console.log(\"Computer wins!\");\n          attackButton.disabled = true;\n        }\n      }, 1000); // Delay computer player's move for 1 second (simulating AI processing)\n    }\n  }\n}\n\n// Handle click event on the Attack button\nattackButton.addEventListener(\"click\", () => {\n  if (isGameStarted && !playerGameBoard.allShipsSunk()) {\n    const x = parseInt(prompt(\"Enter X coordinate (0-9):\"));\n    const y = parseInt(prompt(\"Enter Y coordinate (0-9):\"));\n    handlePlayerAttack(x, y);\n  }\n});\n\n\n//# sourceURL=webpack://battle-ship/./src/index.js?");

/***/ }),

/***/ "./src/modules/game-board.js":
/*!***********************************!*\
  !*** ./src/modules/game-board.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameBoard)\n/* harmony export */ });\nclass GameBoard {\n  constructor() {\n    this.board = Array(10)\n      .fill(null)\n      .map(() => Array(10).fill(null)); // Initialize a 10x10 grid\n    this.missedAttacks = [];\n    this.ships = [];\n  }\n\n  // Function to place a ship at specific coordinates\n  placeShip(ship, x, y, isHorizontal) {\n    if (this.canPlaceShip(ship, x, y, isHorizontal)) {\n      if (isHorizontal) {\n        for (let i = x; i < x + ship.length; i++) {\n          this.board[y][i] = ship;\n        }\n      } else {\n        for (let i = y; i < y + ship.length; i++) {\n          this.board[i][x] = ship;\n        }\n      }\n      this.ships.push(ship);\n      return true; // Ship placement successful\n    }\n    return false; // Cannot place ship at the specified coordinates\n  }\n\n  // Function to check if a ship can be placed at specific coordinates\n  canPlaceShip(ship, x, y, isHorizontal) {\n    if (x < 0 || y < 0 || x >= 10 || y >= 10) {\n      return false; // Coordinates are out of bounds\n    }\n\n    if (isHorizontal) {\n      if (x + ship.length > 10) {\n        return false; // Ship would go out of bounds horizontally\n      }\n\n      for (let i = x; i < x + ship.length; i++) {\n        if (this.board[y][i] !== null) {\n          return false; // Another ship is already placed there\n        }\n      }\n    } else {\n      if (y + ship.length > 10) {\n        return false; // Ship would go out of bounds vertically\n      }\n\n      for (let i = y; i < y + ship.length; i++) {\n        if (this.board[i][x] !== null) {\n          return false; // Another ship is already placed there\n        }\n      }\n    }\n\n    return true; // Ship can be placed at the specified coordinates\n  }\n\n  // Function to receive an attack at specific coordinates\n  receiveAttack(x, y) {\n    if (x < 0 || y < 0 || x >= 10 || y >= 10) {\n      return false; // Invalid coordinates\n    }\n\n    if (this.board[y][x] === null) {\n      this.missedAttacks.push({ x, y });\n      return false; // Attack missed\n    }\n\n    const ship = this.board[y][x];\n    const position = (isHorizontal) => (isHorizontal ? x - ship.x : y - ship.y);\n    const isHorizontal = (ship) => ship.x !== undefined;\n\n    const hitPosition = isHorizontal(ship) ? position(true) : position(false);\n    ship.hit(hitPosition); // Mark the ship as hit at the appropriate position\n    return true; // Attack hit\n  }\n\n  // Function to check if all ships on the board have been sunk\n  allShipsSunk() {\n    return this.ships.every((ship) => ship.sunk);\n  }\n}\n\n\n//# sourceURL=webpack://battle-ship/./src/modules/game-board.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ComputerPlayer: () => (/* binding */ ComputerPlayer),\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n  constructor(name) {\n    this.name = name;\n  }\n\n  // Function for a human player to make an attack on the enemy's gameboard\n  makeAttack(enemyGameBoard, x, y) {\n    if (enemyGameBoard.receiveAttack(x, y)) {\n      console.log(`${this.name} hit at (${x}, ${y})!`);\n    } else {\n      console.log(`${this.name} missed at (${x}, ${y}).`);\n    }\n  }\n}\n\n// Function to generate a random integer between min and max (inclusive)\nfunction getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nclass ComputerPlayer extends Player {\n  constructor() {\n    super(\"Computer\");\n  }\n\n  // Function for the computer player to make a random legal attack on the enemy's gameboard\n  makeRandomAttack(enemyGameBoard) {\n    let x, y;\n\n    do {\n      x = getRandomInt(0, 9);\n      y = getRandomInt(0, 9);\n    } while (!enemyGameBoard.receiveAttack(x, y));\n\n    console.log(`${this.name} attacked at (${x}, ${y}).`);\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battle-ship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/render-game.js":
/*!************************************!*\
  !*** ./src/modules/render-game.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderGameBoards)\n/* harmony export */ });\n// Function to render the game boards\nfunction renderGameBoards(\n  playerBoard,\n  enemyBoard,\n  playerGameBoard,\n  enemyGameBoard\n) {\n  // Clear existing boards\n  playerBoard.innerHTML = \"\";\n  enemyBoard.innerHTML = \"\";\n\n  // Render player's board (replace with your own rendering logic)\n  playerGameBoard.board.forEach((row, rowIndex) => {\n    row.forEach((cell, columnIndex) => {\n      const cellElement = document.createElement(\"div\");\n      cellElement.classList.add(\"cell\");\n      if (cell !== null) {\n        cellElement.classList.add(\"ship\");\n      }\n      playerBoard.appendChild(cellElement);\n    });\n  });\n\n  // Render enemy's board (replace with your own rendering logic)\n  enemyGameBoard.board.forEach((row, rowIndex) => {\n    row.forEach((cell, columnIndex) => {\n      const cellElement = document.createElement(\"div\");\n      cellElement.classList.add(\"cell\");\n      if (cell === null) {\n        cellElement.classList.add(\"empty\");\n      } else if (cell.sunk) {\n        cellElement.classList.add(\"sunk\");\n      } else {\n        cellElement.classList.add(\"ship\");\n      }\n      enemyBoard.appendChild(cellElement);\n    });\n  });\n}\n\n// Function to handle player's attack\nfunction handlePlayerAttack(player, enemyGameBoard, x, y) {\n  if (isGameStarted && !playerGameBoard.allShipsSunk()) {\n    if (enemyGameBoard.receiveAttack(x, y)) {\n      console.log(`${player.name} hit at (${x}, ${y})!`);\n    } else {\n      console.log(`${player.name} missed at (${x}, ${y}).`);\n    }\n    renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);\n\n    // Check if the game has ended\n    if (enemyGameBoard.allShipsSunk()) {\n      console.log(`${player.name} wins!`);\n      attackButton.disabled = true;\n    } else {\n      // Computer player's turn\n      setTimeout(() => {\n        computerPlayer.makeRandomAttack(playerGameBoard);\n        renderGameBoards(playerBoard, enemyBoard, playerGameBoard, enemyGameBoard);\n\n        // Check if the game has ended\n        if (playerGameBoard.allShipsSunk()) {\n          console.log(`${computerPlayer.name} wins!`);\n          attackButton.disabled = true;\n        }\n      }, 1000); // Delay computer player's move for 1 second (simulating AI processing)\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battle-ship/./src/modules/render-game.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = Array(length).fill(false); // Initialize hits array with 'false' values\n    this.sunk = false;\n  }\n\n  // Function to mark a ship as hit at a specific position\n  hit(position) {\n    if (position >= 0 && position < this.length) {\n      this.hits[position] = true;\n      this.checkSunk();\n      return true; // Indicates a successful hit\n    }\n    return false; // Invalid position\n  }\n\n  // Function to check if the ship is sunk\n  checkSunk() {\n    if (this.hits.every((hit) => hit)) {\n      this.sunk = true;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battle-ship/./src/modules/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;