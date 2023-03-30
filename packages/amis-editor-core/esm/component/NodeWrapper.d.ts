import { RendererProps } from 'amis-core';
import React from 'react';
import { RendererInfo } from '../plugin';
import { EditorNodeType } from '../store/node';
export interface NodeWrapperProps extends RendererProps {
    $$editor: RendererInfo;
    $$node?: EditorNodeType;
}
export declare class NodeWrapper extends React.Component<NodeWrapperProps> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: NodeWrapperProps): void;
    ref: any;
    getWrappedInstance(): any;
    refFn(ref: any): void;
    /**
     * 弄点标记
     */
    markDom(id: string): void;
    render(): any;
}
