Blokus piece describer
==

For the hackathon project with Abhi:

Usage:

```javascript
const { type, getAllLabels, toString } = require('blokus-piece-describer');
const piece = getAllLabels([
  [type.block, type.block, type.empty],
  [type.empty, type.block, type.empty],
  [type.empty, type.block, type.block],
]);
getAllLabels(piece)
  .forEach(labeledPiece => {
    console.log(toString(labeledPiece);
  });

// output:
// *--*
// -██-
// *-█-*
//  -██-
//  *--*

//   *-*
// *--█-
// -███-
// -█--*
// *-*

//  *--*
//  -██-
// *-█-*
// -██-
// *--*

// *-*
// -█--*
// -███-
// *--█-
//   *-*
```

## License

MIT License

