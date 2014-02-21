//
// Sprint 1: Game Mechanics
// ========================
//
// TODO: Slide transition
// TODO: Hold down to keep moving
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
            style: { 
                top: this.props.y * 32, 
                left: this.props.x * 32,
                zIndex: (this.props.y * 5000) + this.props.x
            } 
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

    collidesAt: function(x, y) {
        return any(function(tile) {
            return tile.x == x && tile.y == y;
        }, concat(this.state.walls, this.state.boxes));
    },

    moveTo: function(x, y) {
        var safe = !this.collidesAt(x, y);

        if (safe) {
            this.setState({ 
                hero: merge(this.state.hero, {x: x, y: y}) 
            });    
        }

        return safe;
    },

    moveToward: function(pixelX, pixelY) {
        var hero = this.state.hero,
            towards = {x: Math.floor(pixelX/32), y: Math.floor(pixelY/32)};

        var newPos = map(
            function(plane) {
                var current = this.state.hero[plane];
                if (towards[plane] < current) { return current - 1; }
                else if (towards[plane] > current) { return current + 1; }
                else { return current; }
            }.bind(this), 
            ['x', 'y']
        );
        
        this.moveTo(newPos[0], newPos[1]);
    },

    onClick: function(event) {
        if (!React.useTouch) {
            this.moveToward(event.clientX, event.clientY);
        }
    },

    onTouch: function(event) {
        var touch = event.touches[0];
        this.moveToward(touch.clientX, touch.clientY);
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

        return React.DOM.div(
            { className: 'board', onClick: this.onClick, onTouchStart: this.onTouch }, 
            [background, foreground]
        );
    }
});

if ('ontouchstart' in window || 'onmsgesturechange' in window) {
    React.useTouch = true;
    React.initializeTouchEvents(true);
}

React.renderComponent(Board(), document.body);