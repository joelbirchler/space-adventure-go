var oOo = {}; // <--- That's a koala.


//
// Number Predicates
//

oOo.isEven = function(n) { 
    return n % 2 == 0; 
};

oOo.isOdd = function(n) { 
    return !isEven(n); 
};


//
// List Predicates
//




//
// Type Predicates
//

oOo.isArray = Array.isArray;


//
// Filters
//

oOo.at = function(key, obj) {
    return obj[key];
}


//
// Iterators
//

oOo.each = function(iterator, obj, context) {
    obj.forEach(iterator, context);
};

oOo.map = function(iterator, obj, context) {
    return obj.map(iterator, context)
};

oOo.reduce = function(iterator, initial, obj) {
    return obj.reduce(iterator, initial)
};

oOo.reduceRight = function(iterator, initial, obj) {
    return obj.reduceRight(iterator, initial)
};

oOo.times = function(iterator, count, context) {
    for (var i = 0; i < count; i++) { 
        iterator.call(context, i);
    }
};

oOo.pluck = function(key, obj) {
    return obj.map(oOo.at.bind(obj, key));
};


//
// Export
//

if (typeof module !== 'undefined') {
    module.exports = oOo;
};