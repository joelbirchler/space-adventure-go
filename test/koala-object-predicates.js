var oOo = require('../koala.js');

var obj = {a: 42, b: 6, c: 3};

module.exports = {

    matchesIdentity: function(test) {
        test.ok(oOo.matches(obj, obj));
        test.done();
    },

    matchesEmpty: function(test) {
        test.ok(oOo.matches({}, obj));
        test.ok(!oOo.matches(obj, {}));
        test.done();
    },

    matches1: function(test) {
        test.ok(oOo.matches({a: 42}, obj));
        test.done();
    },

    matches2: function(test) {
        test.ok(!oOo.matches({a: 100000}, obj));
        test.done();
    },

    matches3: function(test) {
        test.ok(!oOo.matches({b: 42}, obj));
        test.done();
    }

};