var oOo = require('../koala.js');

module.exports = {

    koala: function(test) {
        var f = function(x) { return x + "f"; },
            g = function(x) { return x + "g"; },
            h = function(x) { return x + "h"; };

        var sequenced1 = oOo(f, g, h)("x"),
            sequenced2 = oOo.sequence(f, g, h)("x");

        test.equal(sequenced1, "xfgh");
        test.equal(sequenced2, "xfgh");
        test.done();
    },

    compose: function(test) {
        var f = function(x) { return x + "f"; },
            g = function(x) { return x + "g"; },
            h = function(x) { return x + "h"; };

        var composed = oOo.compose(f, g, h)("x");

        test.equal(composed, "xhgf");
        test.done();
    },
    
    curry1: function(test) {
        var curried = oOo.curry(function(x, y, z) {
            return "a" + x + y + z;
        });

        var result = curried("b")("c")("d");

        test.equal(result, "abcd");
        test.done();
    },

    curry2: function(test) {
        var curried = oOo.curry(function(x, y, z) {
            return "a" + x + y + z;
        });

        var result = curried("b", "c")("d");

        test.equal(result, "abcd");
        test.done();
    },

    curry3: function(test) {
        var curried = oOo.curry(function(x, y, z) {
            return "a" + x + y;
        }, 2);

        var result = curried("b")("c");

        test.equal(result, "abc");
        test.done();
    },

    partial: function(test) {
        // use oOo.__ for blanks
        test.done();
    },

    testKoalaCurried1: function(test) {
        test.done();
    }
    
}