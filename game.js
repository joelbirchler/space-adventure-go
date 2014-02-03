var Sprite = React.createClass({
    getInitialState: function() {
        return {x: 0, y: 0};
    },
    render: function() {
        return React.DOM.span({
            className: this.props.type,
            style: {top: x * 32, left: y * 32} 
        });
    }
});

Sprite.create = function(type) { 
    return Sprite({type: type}); 
};


// TODO: Let's move all sprite data to be represented with coordinates (including in Background)
// Background and Foreground can be same component. Move state to Game. -- Sincerely, Captain Obvious.




var Board = React.createClass({
    getInitialState: function() {
        return {spriteMap: fill2d(12, 12, 'floor')}; // TODO: No state
    },
    render: function() {
        var sprites = map2d(Sprite.create, this.state.spriteMap); 
        return React.DOM.div({className: 'background'}, sprites);
    }
});

var Game = React.createClass({
    getInitialState: function() {
        // walls
        var walls = _.flatten(_.map(_.range(12), function(n) { 
            return [ {x: n, y: 0}, {x: n, y: 11}, {x: 0, y: n}, {x: 11, y: n} ];
        }));

        // box
        // hero

        return {walls: walls};
    },
    render: function() {
        var sprites = _.map(this.state.walls, Sprite.create.bind(Sprite, 'walls')); // FIXME: gahhh! create a func.js with map and other global functional functions
        return React.DOM.div({className: 'foreground'}, sprites);
    }
});

React.initializeTouchEvents(true);
React.renderComponent(Board(), document.body);