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

module.exports = { type, piece, addMoat };
