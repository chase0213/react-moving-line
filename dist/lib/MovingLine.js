"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["Upward"] = 1] = "Upward";
    AnimationDirection[AnimationDirection["Downward"] = 2] = "Downward";
    AnimationDirection[AnimationDirection["Leftward"] = 3] = "Leftward";
    AnimationDirection[AnimationDirection["Rightward"] = 4] = "Rightward";
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));
;
var MovingLine = /** @class */ (function (_super) {
    tslib_1.__extends(MovingLine, _super);
    function MovingLine(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            content: {
                __html: props.content,
            },
            movingLineStyle: {
                height: props.height || '450px',
                width: props.width || '600px',
            },
            outerContainerStyle: {
                position: 'relative',
                height: '100%',
                width: '100%',
            },
            innerContainerStyle: {
                position: 'absolute',
                height: props.lineWidth || '2px',
                width: props.lineWidth || '2px',
                overflow: 'hidden',
                background: props.background || 'rgba(172, 218, 253, 1.0)',
                boxShadow: props.boxShadow || '0 1px 3px 0 rgba(32, 32, 32, .6)',
                color: props.color || 'rgba(0, 0, 0, 1.0)',
                top: 'auto',
                bottom: 'auto',
                left: 'auto',
                right: 'auto',
                transitionTimingFunction: props.transitionFuncs || 'easeInOutQuart',
                transitionDuration: '0.0s',
                transitionProperty: 'height, width',
            },
            embeddedContentStyle: {
                opacity: 0.0,
                transform: 'translateY(-8px)',
                transitionProperty: 'transform, opacity',
                transitionDuration: '1.0s',
            },
        };
        return _this;
    }
    MovingLine.prototype.componentDidMount = function () {
        var _this = this;
        this.preprocess(this.props.directions);
        setTimeout(function () {
            _this.startAnimation();
        }, 200);
    };
    MovingLine.prototype.startAnimation = function () {
        var _this = this;
        var directions = this.props.directions || [];
        var durations = this.props.durations || [];
        var transactionFuncs = this.props.transitionFuncs || [];
        if (directions.length < 2) {
            directions = [AnimationDirection.Downward, AnimationDirection.Rightward];
        }
        if (durations.length < 2) {
            durations = [1.0, 1.0];
        }
        if (transactionFuncs.length < 2) {
            transactionFuncs = ['easeInOutQuart', 'easeInOutQuart'];
        }
        this.playAnimation(directions[0], durations[0], transactionFuncs[0]);
        setTimeout(function () {
            _this.playAnimation(directions[1], durations[1], transactionFuncs[1]);
            setTimeout(function () {
                var embeddedContentStyle = Object.assign({}, _this.state['embeddedContentStyle']);
                embeddedContentStyle['opacity'] = 1.0;
                embeddedContentStyle['transform'] = 'translateY(0px)';
                _this.setState({ embeddedContentStyle: embeddedContentStyle });
            }, 1000 * durations[1]);
        }, 1000 * durations[0]);
    };
    MovingLine.prototype.preprocess = function (directions) {
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var d = directions_1[_i];
            var innerContainerStyle = void 0;
            switch (d) {
                case AnimationDirection.Upward:
                    innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
                    innerContainerStyle['bottom'] = '0px';
                    this.setState({ innerContainerStyle: innerContainerStyle });
                    break;
                case AnimationDirection.Downward:
                    innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
                    innerContainerStyle['top'] = '0px';
                    this.setState({ innerContainerStyle: innerContainerStyle });
                    break;
                case AnimationDirection.Leftward:
                    innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
                    innerContainerStyle['right'] = '0px';
                    this.setState({ innerContainerStyle: innerContainerStyle });
                    break;
                case AnimationDirection.Rightward:
                    innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
                    innerContainerStyle['left'] = '0px';
                    this.setState({ innerContainerStyle: innerContainerStyle });
                    break;
            }
        }
    };
    MovingLine.prototype.playAnimation = function (direction, duration, transition) {
        var innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
        innerContainerStyle['transitionDuration'] = duration + 's';
        innerContainerStyle['transitionTimingFunction'] = transition;
        this.setState({ innerContainerStyle: innerContainerStyle });
        switch (direction) {
            case AnimationDirection.Upward:
                this.playAnimationUpward();
                break;
            case AnimationDirection.Downward:
                this.playAnimationDownward();
                break;
            case AnimationDirection.Leftward:
                this.playAnimationLeftward();
                break;
            case AnimationDirection.Rightward:
                this.playAnimationRightward();
                break;
        }
    };
    MovingLine.prototype.playAnimationUpward = function () {
        var innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
        innerContainerStyle['bottom'] = '0px';
        innerContainerStyle['height'] = this.state['movingLineStyle']['height'];
        this.setState({ innerContainerStyle: innerContainerStyle });
    };
    MovingLine.prototype.playAnimationDownward = function () {
        var innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
        innerContainerStyle['top'] = '0px';
        innerContainerStyle['height'] = this.state['movingLineStyle']['height'];
        this.setState({ innerContainerStyle: innerContainerStyle });
    };
    MovingLine.prototype.playAnimationLeftward = function () {
        var innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
        innerContainerStyle['right'] = '0px';
        innerContainerStyle['width'] = this.state['movingLineStyle']['width'];
        this.setState({ innerContainerStyle: innerContainerStyle });
    };
    MovingLine.prototype.playAnimationRightward = function () {
        var innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
        innerContainerStyle['left'] = '0px';
        innerContainerStyle['width'] = this.state['movingLineStyle']['width'];
        this.setState({ innerContainerStyle: innerContainerStyle });
    };
    MovingLine.prototype.render = function () {
        return (React.createElement("div", { className: "moving-line", style: this.state['movingLineStyle'] },
            React.createElement("div", { className: "moving-line__outer-container", style: this.state['outerContainerStyle'] },
                React.createElement("div", { className: "moving-line__inner-container", style: this.state['innerContainerStyle'] },
                    React.createElement("div", { className: "embedded-content", dangerouslySetInnerHTML: this.state['content'], style: this.state['embeddedContentStyle'] })))));
    };
    return MovingLine;
}(React.Component));
exports.default = MovingLine;
