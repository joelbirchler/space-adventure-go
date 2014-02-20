//
// Sprint 1: Game Mechanics
// ========================
//
// TODO: Add the hero and make him move
// TODO: Deal with depths properly (this is probably a simple z-index=y*5000 + x in the Sprite render method)
// TODO: Collision detection
// TODO: Push boxes
// TODO: Solving puzzles opens doors
//

'use strict';

oOo.importKoala(this);


var Sprite = React.createClass({

    propTypes: {
        type: React.PropTypes.string,
        x: React.PropTypes.number,
        y: React.PropTypes.number
    },

    render: function() {
        return React.DOM.span({
            className: this.props.type,
            style: { top: this.props.y * 32, left: this.props.x * 32 } 
        });
    }

});



var Board = React.createClass({

    getInitialState: function() {
        var rectangle = function(type, x0, y0, x1, y1) {
            // FIXME: This code is ugly
            return flatten(
                map(function(x) {
                    return map(function(y) { 
                            return {type: type, x: x, y: y}; 
                        }, range(y0, y1));
                    }, range(x0, x1)));
        };

        // background
        var floor = rectangle('floor', 0, 0, 12, 12);

        // walls
        var walls = rectangle('wall', 0, 0, 12, 1)
            .concat(rectangle('wall', 0, 11, 12, 12))
            .concat(rectangle('wall', 0, 0, 1, 12))
            .concat(rectangle('wall', 11, 0, 12, 12));

        // boxes
        var boxes = [
            {type: 'box', x: 3, y: 4},
            {type: 'box', x: 3, y: 5},
            {type: 'box', x: 5, y: 7},
            {type: 'box', x: 6, y: 9},
            {type: 'box', x: 9, y: 3}
        ];

        // hero
        var hero = {type: 'hero', x: 6, y:6};

        return { floor: floor, walls: walls, boxes: boxes, hero: hero };
    },

    render: function() {
        var state = this.state;

        var createSprite = function(tile, i) { 
            return Sprite(merge({key: i}, tile)); 
        };

        var background = React.DOM.div(
            { key: 'background', className: 'layer layer-background' }, 
            map(createSprite, state.floor)
        );

        var foreground = React.DOM.div(
            { key: 'foreground', className: 'layer layer-foreground' }, 
            map(createSprite, concat(state.walls, state.boxes, state.hero))
        );

        return React.DOM.div({className: 'board'}, [background, foreground]);
    }
});

React.initializeTouchEvents(true);
React.renderComponent(Board(), document.body);