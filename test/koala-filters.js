var oOo = require('../koala.js');

var list = [1, 2, 3, 4, 5];

module.exports = {

    select: function(test) {
        test.ok(oOo.select(oOo.isEven, [2, 4]));
        test.done();
    },

    reject: function(test) {
        test.ok(oOo.reject(oOo.isEven, [1, 3, 5]));
        test.done();
    },

    head: function(test) {
        test.equal(oOo.head(list), 1);
        test.done();
    },

    tail: function(test) {
        test.deepEqual(oOo.tail(list), [2, 3, 4, 5]);
        test.done();
    },

    unique: function(test) {
        var duped = [1, 1, 2, 3, 3, 1, 4, 5, 2, 5, 1, 5];
        test.deepEqual(oOo.unique(duped), list);
        test.done();
    },

    at: function(test) {
        test.equal(oOo.at(1, list), 2);
        test.equal(oOo.at('cow', {'cow': 'dog'}), 'dog');
        test.done();
    }

};