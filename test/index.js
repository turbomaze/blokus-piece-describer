const assert = require('assert');
const { describe, it } = require('cafezinho');
const { type, toString, addMoat, getLabeledPiece } = require('../lib');

function deepEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

describe('Blokus', () => {
  describe('#getLabeledPiece()', () => {
    it('should work for a simple piece', () => {
      const actual = getLabeledPiece([[type.block]]);
      const expected = [
        [type.corner, type.edge, type.corner],
        [type.edge, type.block, type.edge],
        [type.corner, type.edge, type.corner]
      ];
      assert(deepEquals(actual, expected));
    });

    it('should work for a square piece', () => {
      const actual = getLabeledPiece([
        [type.block, type.block, type.block],
        [type.block, type.block, type.block],
        [type.block, type.block, type.block]
      ]);
      const expected = [
        [type.corner, type.edge, type.edge, type.edge, type.corner],
        [type.edge, type.block, type.block, type.block, type.edge],
        [type.edge, type.block, type.block, type.block, type.edge],
        [type.edge, type.block, type.block, type.block, type.edge],
        [type.corner, type.edge, type.edge, type.edge, type.corner]
      ];
      assert(deepEquals(actual, expected));
    });

    it('should work for a concave piece', () => {
      const actual = getLabeledPiece([
        [type.block, type.edge],
        [type.block, type.edge],
        [type.block, type.block]
      ]);
      const expected = [
        [type.corner, type.edge, type.corner, type.empty],
        [type.edge, type.block, type.edge, type.empty],
        [type.edge, type.block, type.edge, type.corner],
        [type.edge, type.block, type.block, type.edge],
        [type.corner, type.edge, type.edge, type.corner]
      ];
      console.log(toString(actual));
      assert(deepEquals(actual, expected));
    });
  });

  describe('#addMoat()', () => {
    it('should work for a simple piece', () => {
      const actual = addMoat([[type.block]]);
      const expected = [
        [type.empty, type.empty, type.empty],
        [type.empty, type.block, type.empty],
        [type.empty, type.empty, type.empty]
      ];
      assert(deepEquals(actual, expected));
    })

    it('should work for a square piece', () => {
      const actual = addMoat([
        [type.block, type.block, type.block],
        [type.block, type.block, type.block],
        [type.block, type.block, type.block]
      ]);
      const expected = [
        [type.empty, type.empty, type.empty, type.empty, type.empty],
        [type.empty, type.block, type.block, type.block, type.empty],
        [type.empty, type.block, type.block, type.block, type.empty],
        [type.empty, type.block, type.block, type.block, type.empty],
        [type.empty, type.empty, type.empty, type.empty, type.empty]
      ];
      assert(deepEquals(actual, expected));
    })

    it('should work for a rectangular piece', () => {
      const actual = addMoat([
        [type.block, type.block],
        [type.block, type.block],
        [type.block, type.block]
      ]);
      const expected = [
        [type.empty, type.empty, type.empty, type.empty],
        [type.empty, type.block, type.block, type.empty],
        [type.empty, type.block, type.block, type.empty],
        [type.empty, type.block, type.block, type.empty],
        [type.empty, type.empty, type.empty, type.empty]
      ];
      assert(deepEquals(actual, expected));
    })
  });
});
