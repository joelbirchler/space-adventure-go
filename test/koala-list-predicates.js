var oOo = require('../koala.js');

var list = [1, 2, 3, 4, 5];

module.exports = {

    has: function(test) {
        test.ok(oOo.has(2, list));
        test.ok(!oOo.has(108, list));
        test.done();
    },

    all: function(test) {
        test.ok(oOo.all(oOo.isEven, [2, 4, 6]));
        test.ok(!oOo.all(oOo.isEven, list));
        test.done();
    },

    any: function(test) {
        test.ok(oOo.any(oOo.isEven, list));
        test.ok(!oOo.any(oOo.isEven, [1, 3, 5]));
        test.done();
    }

};