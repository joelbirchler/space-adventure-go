var oOo = require('../koala.js');

var list = [1, 2, 3, 4, 5],
    hashList = [{a: 42, b: 6, c: 3}, {a: 10, b: 7}, {a: 42, b: 2, c: 108}];

module.exports = {

    select: function(test) {
        test.ok(oOo.select(oOo.isEven, [2, 4]));
        test.done();
    },

    where: function(test) {
        var found = oOo.where({a: 42}, hashList);
        test.ok(found.length == 2);
        test.ok(found[0].a == 42);
        test.ok(found[0].b == 6);
        test.ok(found[0].c == 3);
        test.ok(found[1].a == 42);
        test.ok(found[1].b == 2);
        test.ok(found[1].c == 108);
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