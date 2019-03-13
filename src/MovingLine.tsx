import * as React from 'react';

export enum AnimationDirection {
  Upward = 1,
  Downward,
  Leftward,
  Rightward,
};

interface Props {
  content: string;
  height: string;
  width: string;
  background: string;
  color: string;
  boxShadow: string;
  lineWidth: string;
  durations: number[];
  directions: AnimationDirection[];
  transitionFuncs: string[];
}

class MovingLine extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    this.preprocess(this.props.directions);
    setTimeout(() => {
      this.startAnimation();
    }, 200);
  }

  startAnimation() {
    let directions = this.props.directions || [];
    let durations = this.props.durations || [];
    let transactionFuncs = this.props.transitionFuncs || [];
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
    setTimeout(() => {
      this.playAnimation(directions[1], durations[1], transactionFuncs[1]);
      setTimeout(() => {
        let embeddedContentStyle = Object.assign({}, this.state['embeddedContentStyle']);
        embeddedContentStyle['opacity'] = 1.0;
        embeddedContentStyle['transform'] = 'translateY(0px)'
        this.setState({embeddedContentStyle: embeddedContentStyle});
      }, 1000 * durations[1]);
    }, 1000 * durations[0]);
  }

  preprocess(directions: AnimationDirection[]) {
    for (let d of directions) {
      let innerContainerStyle;
      switch (d) {
        case AnimationDirection.Upward:
          innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
          innerContainerStyle['bottom'] = '0px';
          this.setState({innerContainerStyle: innerContainerStyle});
          break;
        case AnimationDirection.Downward:
          innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
          innerContainerStyle['top'] = '0px';
          this.setState({innerContainerStyle: innerContainerStyle});
          break;
        case AnimationDirection.Leftward:
        innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
          innerContainerStyle['right'] = '0px';
          this.setState({innerContainerStyle: innerContainerStyle});
          break;
        case AnimationDirection.Rightward:
          innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
          innerContainerStyle['left'] = '0px';
          this.setState({innerContainerStyle: innerContainerStyle});
          break;
      }
    }
  }

  playAnimation(direction: AnimationDirection, duration: number, transition: string) {
    let innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
    innerContainerStyle['transitionDuration'] = duration + 's';
    innerContainerStyle['transitionTimingFunction'] = transition;
    this.setState({innerContainerStyle: innerContainerStyle});

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
  }


  private playAnimationUpward() {
    let innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
    innerContainerStyle['bottom'] = '0px';
    innerContainerStyle['height'] = this.state['movingLineStyle']['height'];
    this.setState({innerContainerStyle: innerContainerStyle});
  }

  private playAnimationDownward() {
    let innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
    innerContainerStyle['top'] = '0px';
    innerContainerStyle['height'] = this.state['movingLineStyle']['height'];
    this.setState({innerContainerStyle: innerContainerStyle});
  }

  private playAnimationLeftward() {
    let innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
    innerContainerStyle['right'] = '0px';
    innerContainerStyle['width'] = this.state['movingLineStyle']['width'];
    this.setState({innerContainerStyle: innerContainerStyle});
  }

  private playAnimationRightward() {
    let innerContainerStyle = Object.assign({}, this.state['innerContainerStyle']);
    innerContainerStyle['left'] = '0px';
    innerContainerStyle['width'] = this.state['movingLineStyle']['width'];
    this.setState({innerContainerStyle: innerContainerStyle});
  }


  render() {
    return (
      <div className="moving-line" style={this.state['movingLineStyle']}>
        <div className="moving-line__outer-container" style={this.state['outerContainerStyle']}>
          <div className="moving-line__inner-container" style={this.state['innerContainerStyle']}>
            <div className="embedded-content"
              dangerouslySetInnerHTML={this.state['content']}
              style={this.state['embeddedContentStyle']}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovingLine;