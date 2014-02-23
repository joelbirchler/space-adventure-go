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