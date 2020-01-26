const type = Object.freeze({
  empty: 0,
  block: 1,
  corner: 2,
  edge: 3,
});

const piece = [
  [type.corner, type.edge, type.corner],
  [type.edge, type.block, type.edge],
  [type.corner, type.edge, type.corner],
];

function getAllLabels(piece) {
  const pieces = new Set();
  return getPotentialSymmetries(piece)
    .map(getLabeledPiece)
    .filter(piece => {
      const stringPiece = toString(piece);
      if (pieces.has(stringPiece)) {
        return false;
      }

      pieces.add(stringPiece);
      return true;
    });
}
  
function getPotentialSymmetries(piece) {
  return [
    piece,
    rotate(piece),
    rotate(rotate(piece)),
    rotate(rotate(rotate(piece))),
    flip(piece),
    rotate(flip(piece)),
    rotate(rotate(flip(piece))),
    rotate(rotate(rotate(flip(piece)))),
  ];
}

function rotate(piece) {
  const rotatedPiece = [];
  for (let j = 0; j < piece[0].length; j++) {
    rotatedPiece.push([]);
    for (let i = 0; i < piece.length; i++) {
      rotatedPiece[j].push(piece[i]);
    }
  }
  return flip(rotatedPiece);
}

function flip(piece) {
  return JSON.parse(JSON.stringify(piece.reverse()));
}

function toString(piece) {
  return piece.map(row => {
    return row.map(cell => {
      if (cell === type.block) {
        return '*';
      } else if (cell === type.corner) {
        return '+';
      } else if (cell === type.edge) {
        return '-';
      } else {
        return '_';
      }
    }).join('');
  }).join('\n');
}

function getLabeledPiece(piece) {
  const kernel = [
    [type.corner, type.edge, type.corner],
    [type.edge, type.block, type.edge],
    [type.corner, type.edge, type.corner],
  ];
  const paddedPiece = addMoat(piece);
  const cellsWithBlocks = [];
  for (let i = 0; i < paddedPiece.length; i++) {
    for (let j = 0; j < paddedPiece[0].length; j++) {
      if (paddedPiece[i][j] === type.block) {
        // invariant: i, j > 0, i <= piece.length, j <= piece[0].length
        for (let ii = i - 1; ii <= i + 1; ii++) {
          for (let jj = j - 1; jj <= j + 1; jj++) {
            const kernelState = kernel[ii - i + 1][jj - j + 1];
            const newState = merge(paddedPiece[ii][jj], kernelState);
            paddedPiece[ii][jj] = newState;
          }
        }
      }
    }
  }

  return paddedPiece;
}

function merge(currentType, kernelType) {
  if ([currentType, kernelType].includes(type.block)) {
    return type.block;
  } else if ([currentType, kernelType].includes(type.edge)) {
    return type.edge;
  } else if ([currentType, kernelType].includes(type.corner)) {
    return type.corner;
  } else {
    return type.empty;
  }
}

function addMoat(piece) {
  if (piece.length === 0 || piece[0].length === 0) {
    throw new Error('Received zero width piece');
  }

  const pieceWithMoat = [];
  for (let i = 0; i < piece.length + 2; i++) {
    pieceWithMoat.push([type.empty]);
    for (let j = 0; j < piece[0].length; j++) {
      if (i >= 1 && i <= piece.length) {
        pieceWithMoat[i].push(piece[i - 1][j]);
      } else {
        pieceWithMoat[i].push(type.empty);
      }
    }
    pieceWithMoat[i].push(type.empty);
  }

  return pieceWithMoat;
}

module.exports = { type, piece, toString, addMoat, getLabeledPiece };
