'use strict';

if ('ontouchstart' in window || 'onmsgesturechange' in window) {
    React.useTouch = true;
    React.initializeTouchEvents(true);
}

React.renderComponent(Board(), document.body);