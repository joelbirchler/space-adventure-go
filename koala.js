       /*OOOo.              o                   o       
      .O     o.             O                  O        
      O       o             o                  o        
      o       O             o                  O        
.oOo. O       o .oOo.       O  o  .oOo. .oOoO' o  .oOoO'
O   o o       O O   o       OoO   O   o O   o  O  O   o 
o   O `o     O' o   O       o  O  o   O o   O  o  o   O 
`OoO'  `OoooO'  `OoO'       O   o `OoO' `OoO'o Oo `OoO */ 


var oOo = function(/* functions */) {  // <--- That's a koala.
    var funcs = arguments, 
        count = funcs.length;

    return function() {
        var result = funcs[0].apply(this, arguments);
        for (var i = 1; i < count; i++) {
            result = funcs[i](result);
        }
        return result;
    };
};


//
// Util
//

oOo.not = function(b) { return !b; }

oOo.toArray = function(obj) { return Array.prototype.slice.call(obj); }



//
// Function functions
//

oOo.sequence = oOo;

oOo.compose = function(/* funcs.. */) {
    var funcs = arguments, 
        count = funcs.length;

    return function() {
        var result = funcs[count - 1].apply(this, arguments);
        for (var i = count - 2; i > -1; i--) {
            result = funcs[i](result);
        }
        return result;
    };
};

oOo.curry = function(func, /* optional */ fullArgCount) {
    fullArgCount || (fullArgCount = func.length);

    return function(/* args */) {
        if (arguments.length < fullArgCount) {
            return oOo.curry(
                func.bind.apply(func, [this].concat(oOo.toArray(arguments))),
                fullArgCount - arguments.length
            );
        } else {
            return func.apply(this, arguments);
        }
    };
};

oOo.__ = {};

oOo.partial = function(func /*, variadic arguments */) {
    if (arguments.length == 1) { return func; }

    var partialArgs = Array.prototype.slice.call(arguments, 1);

    return function(/* args */) {
        var appliedArgs = oOo.toArray(arguments);
        return func.apply(
            this, 
            partialArgs.map(function(arg, i) {
                return (arg === oOo.__) ? appliedArgs.shift() : arg;
            })
        );
    };
};



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

oOo.has = function(value, list) {
    return list.indexOf(value) !== -1;
};

oOo.any = function(func, list) {
    return list.some(func);
};

oOo.all = function(func, list) {
    return list.every(func);
};


//
// Type Predicates
//

oOo.isArray = Array.isArray;


//
// Filters
//

oOo.select = function(predicate, list) {
    return list.filter(predicate);
};

oOo.reject = function(predicate, list) {
    return list.filter( oOo.compose(oOo.not, predicate) );
};

oOo.head = function(list) {
    return list[0];
};

oOo.tail = function(list) {
    return list.slice(1);
};

oOo.unique = function(list) {
    var result = [], seen = {};

    list.forEach(function(element) {
        if (!seen[element]) {
            seen[element] = true;
            result.push(element);
        }
    });

    return result;
};

oOo.at = function(key, obj) {
    return obj[key];
};


//
// Object Util
//

oOo.keys = function(obj) {
    return Object.keys(obj);
};

oOo.values = function(obj) {
    return Object.keys(obj).map(function(key) { 
        return obj[key]; 
    });
};

oOo.merge = function(/* sources... */) {
    var target = {}, 
        sources = Array.prototype.slice.call(arguments, 0);

    sources.forEach(function(source) {
      if (source) {
        for (var prop in source) {
          target[prop] = source[prop];
        }
      }
    });

    return target;
};


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