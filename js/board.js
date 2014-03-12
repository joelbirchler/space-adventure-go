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
            {type: 'box', x: 3, y: 4, key: 'box-0', value: 'O'},
            {type: 'box', x: 3, y: 5, key: 'box-1', value: 'B'},
            {type: 'box', x: 5, y: 7, key: 'box-2', value: 'I'}
        ];

        // hero
        var hero = {type: 'hero', x: 6, y:6};

        return { floor: floor, walls: walls, boxes: boxes, hero: hero };
    },

    findAt: function(x, y) {
        return find(function(tile) {
            return tile.x == x && tile.y == y;
        }, concat(this.state.walls, this.state.boxes));
    },

    isValidAnswer: function(answer) {
        console.log("isValidAnswer", answer);
        return answer.join('') === 'OBI';
    },

    checkWin: function(boxes) {
        // FIXME: Refactor with less optimizations for now. In theory we can do something like:
        // pluck y && check horizontal, pluck x, (max - min) should be length
        //

        return false; //&& this.isValidAnswer(orderedValues());
    },

    move: function(deltaX, deltaY) {
        var hero = this.state.hero,
            future = {x: hero.x + deltaX, y: hero.y + deltaY},
            futureTile = this.findAt(future.x, future.y);

        if (!futureTile) { // empty tile, simple move
            this.setState({
                hero: merge(this.state.hero, {x: future.x, y: future.y})
            });
        } else if (futureTile.type == 'box') { // box tile, attempt a slide
            var boxFuture = {x: futureTile.x + deltaX, y: futureTile.y + deltaY};
            if (!this.findAt(boxFuture.x, boxFuture.y)) {
                var updatedBoxes = concat([merge(futureTile, boxFuture)], without(futureTile, this.state.boxes))

                this.setState({
                    boxes: updatedBoxes,
                    hero: merge(this.state.hero, {x: future.x, y: future.y})
                });

                if (this.checkWin(updatedBoxes)) { console.log('WIN!'); }
            }
        }
    },

    onTouch: function(event) {
        var touch = event.touches[0];
        // TODO: swipe
    },

    onKey: function(event) {
        var keyMap = {
            "Up": [0, -1],
            "Down": [0, 1],
            "Left": [-1, 0],
            "Right": [1, 0]
        };

        var deltas = keyMap[event.keyIdentifier];
        if (deltas) { this.move.apply(this, deltas); }
    },

    componentDidMount: function() {
        window.addEventListener('keydown', this.onKey);
    },

    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.onKey);
    },

    render: function() {
        var state = this.state;

        var createSprite = function(tile, i) {
            return Sprite(merge({key: tile.key || i}, tile));
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
            { className: 'board', onTouchStart: this.onTouch },
            [background, foreground]
        );
    }
});
