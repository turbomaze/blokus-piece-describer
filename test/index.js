const assert = require('assert');
const { describe, it } = require('cafezinho');
const { type, addMoat } = require('../lib');

function deepEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

describe('Blokus', () => {
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
