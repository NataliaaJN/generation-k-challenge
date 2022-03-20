"use strict";

const sideSize = 6; // Grid de lado 6
const gridPosBase = [
  [1, 1],
  [4, 1],
  [2, 2],
  [6, 2],
  [5, 3],
  [1, 4],
  [4, 4],
  [3, 5],
  [6, 5],
];
const encriptedMessage = "lróaon. sg sdersoildsu.:.cc kiomamii";

//
// Cojo el mensaje encriptado y, por cada 6 letras, creo un array. 
const gridFromEncriptedMessage = (encriptedMessage) => {
  const encryptedGrid = [];
  for (let i = 0; i < 6; i++) {
    const originIndex = i * 6;
    encryptedGrid.push(
      encriptedMessage.substring(originIndex, originIndex + 6)
    );
  }
  return encryptedGrid;
};

// Creo una grid 6x6, que, al girarla, me va a servir para descifrar el mensaje
const gridPosBaseToIndexedGrid = (gridPosBase) => {
  const grid = [];

  for (let i = 0; i < 6; i++) {
    grid.push([]);
  }
  gridPosBase
    .map((pos) => pos.map((subpos) => subpos - 1))
    .forEach((gridPosition) => {
      grid[gridPosition[1]][gridPosition[0]] = true;
    });
  return grid;
};

// Giro la grid
const rotateGrid = (grid) => {
  const rotatedGrid = [];
  for (let i = 0; i < 6; i++) {
    const rotatedRow = [];
    for (let j = 5; j >= 0; j--) {
      rotatedRow.push(grid[j][i]);
    }
    rotatedGrid.push(rotatedRow);
  }
  return rotatedGrid;
};

// Obtengo el mensaje cifrado
const getTextFromGrid = (grid, indexedDecryptionGrid) => {
  let textContainer = [];
  indexedDecryptionGrid.forEach((decryptionRow, rowIndex) => {
    decryptionRow.forEach((decryptionCell, cellIndex) => {
      if (decryptionCell) {
        textContainer.push(grid[rowIndex][cellIndex]);
      }
    });
  });
  return textContainer.join("");
};

// Función para desencriptar el mensaje
const decrypt = (encriptedMessage, gridPosBase) => {
  if (encriptedMessage.length != 36) {
    throw "Message length is mandatory 36 characters";
  }
  let encryptedGrid = gridFromEncriptedMessage(encriptedMessage); 
  let decryptionGrid = gridPosBaseToIndexedGrid(gridPosBase);
  let decryptedText = getTextFromGrid(encryptedGrid, decryptionGrid);

  for (let i = 0; i < 3; i++) {
    decryptionGrid = rotateGrid(decryptionGrid);
    decryptedText += getTextFromGrid(encryptedGrid, decryptionGrid);
  }
  return decryptedText;
};

//
const decryptedMessage = decrypt(encriptedMessage, gridPosBase);
console.log(decryptedMessage);
