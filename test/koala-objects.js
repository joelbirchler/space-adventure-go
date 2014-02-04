var oOo = require('../koala.js');

var obj = {id: 42, what: "Meaning of life, the universe", and: "everything."};

module.exports = {

    keys: function(test) {
        var keys = oOo.keys(obj);

        test.deepEqual(keys, ['id', 'what', 'and']);
        test.done();
    },

    values: function(test) {
        var values = oOo.values(obj);

        test.deepEqual(values, [42, "Meaning of life, the universe", "everything."]);
        test.done();
    },

    merge: function(test) {
        var obj2 = {id: 37, solong: "And thanks for all the fish."};

        var merged = oOo.merge(obj, obj2);

        test.deepEqual(merged, {id: 37, what: "Meaning of life, the universe", and: "everything.", solong: "And thanks for all the fish."});
        test.deepEqual(obj, {id: 42, what: "Meaning of life, the universe", and: "everything."});
        test.done();
    }

}