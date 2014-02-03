var oOo = require('../koala.js');

module.exports = {
    
    each: function(test) {
        var list = [1, 2, 3],
            sum = 0;

        oOo.each(function(n) { sum += n; }, list);

        test.equal(sum, 6);
        test.done();
    },

    map: function(test) {
        var list = [1, 2, 3];

        var mapped = oOo.map(function(n) { return n * 2; }, list);

        test.deepEqual(mapped, [2, 4, 6]);
        test.done();
    },

    reduce: function(test) {
        var list = [1, 2, 3];

        var summed = oOo.reduce(function(memo, n) { return memo + n; }, 0, list);

        test.equal(summed, 6);
        test.done();
    },

    reduceRight: function(test) {
        var list = [10, 5];

        var divided = oOo.reduceRight(function(memo, n) { return memo / n; }, 100, list);

        test.equal(divided, 2);
        test.done();
    },

    times: function(test) {
        var count = 0;

        oOo.times(function(n) { count++; }, 3);

        test.equal(3, 3);
        test.done();
    },

    pluck: function(test) {
        var list = [{id: 2, color: 'blue'}, {id: 3, color: 'green'}, {color: 'red'}];

        var plucked = oOo.pluck('color', list);

        test.deepEqual(plucked, ['blue', 'green', 'red']);
        test.done();
    }

};