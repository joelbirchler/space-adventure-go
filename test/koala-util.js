var oOo = require('../koala.js');

module.exports = {

    toArray: function(test) {
        var arr = oOo.toArray({0: 'a', 1: 'b', 2: 'c', length: 3});
        test.ok(arr instanceof Array);
        test.equal('c', arr[2]);
        test.equal(3, arr.length);
        test.done();
    },

    identity: function(test) {
        var five = oOo.identity(5);
        test.equal(five(), 5);
        test.done();
    },

    not: function(test) {
        test.ok(oOo.not(false));
        test.ok(!oOo.not(true));
        test.done();
    }

}