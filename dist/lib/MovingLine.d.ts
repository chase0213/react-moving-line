import * as React from 'react';
export declare enum AnimationDirection {
    Upward = 1,
    Downward = 2,
    Leftward = 3,
    Rightward = 4
}
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
declare class MovingLine extends React.Component<Props> {
    constructor(props: Props);
    componentDidMount(): void;
    startAnimation(): void;
    preprocess(directions: AnimationDirection[]): void;
    playAnimation(direction: AnimationDirection, duration: number, transition: string): void;
    private playAnimationUpward;
    private playAnimationDownward;
    private playAnimationLeftward;
    private playAnimationRightward;
    render(): JSX.Element;
}
export default MovingLine;
