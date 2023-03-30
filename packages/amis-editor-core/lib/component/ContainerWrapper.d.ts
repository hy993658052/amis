import { NodeWrapperProps } from './NodeWrapper';
import React from 'react';
import { Schema } from 'amis';
export interface ContainerWrapperProps extends NodeWrapperProps {
}
export declare class ContainerWrapper extends React.Component<ContainerWrapperProps> {
    ref: any;
    getWrappedInstance(): any;
    refFn(ref: any): void;
    renderChild(region: string, node: Schema, props: any): any;
    render(): JSX.Element;
}
