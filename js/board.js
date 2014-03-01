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
        var previousBox, minX, maxX, boxXMap = {};

        // FIXME: Refactor with less optimizations for now

        // We are going to have some minor internal side-effects here for efficiency. Our firstPass() sets minX
        // and maxX (used to quickly determine if we have a connected chain) and boxXMap (used to create an ordered
        // list of box values).
        var firstPass = function(box) {
            if (!previousBox) {
                minX = maxX = box.x;
            } else if (box.y != previousBox.y) {
                return false;
            } else if (box.x < minX) {
                minX = box.x;
            } else if (box.x > maxX) {
                maxX = box.x;
            }

            boxXMap[box.x] = box;

            previousBox = box;
            return true;
        };

        var isConnected = function() {
            return (1 + maxX - minX === boxes.length);
        };

        var orderedValues = function() {
            var values = [];
            for (var x = minX; x <= maxX; x++) { values.push(boxXMap[x].value); }
            return values;
        };

        return all(firstPass, boxes) && isConnected() && this.isValidAnswer(orderedValues());
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

    moveToward: function(pixelX, pixelY) {
        var hero = this.state.hero,
            towards = {x: Math.floor(pixelX/32), y: Math.floor(pixelY/32)},
            delta = {x: 0, y: 0},
            plane = ['x', 'y'];

        // swap plan ordering for diagonal stepping when tapping on same tile
        if (this.moveWiggler) { plane = ['y', 'x']; }
        this.moveWiggler = !this.moveWiggler;

        if (towards[plane[0]] < hero[plane[0]]) {
            delta[plane[0]] = -1;
        } else if (towards[plane[0]] > hero[plane[0]]) {
            delta[plane[0]] = 1;
        } else if (towards[plane[1]] < hero[plane[1]]) {
            delta[plane[1]] = -1;
        } else if (towards[plane[1]] > hero[plane[1]]) {
            delta[plane[1]] = 1;
        }

        this.move(delta.x, delta.y);
    },

    onMouseDown: function(event) {
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
            { className: 'board', onMouseDown: this.onMouseDown, onTouchStart: this.onTouch },
            [background, foreground]
        );
    }
});
