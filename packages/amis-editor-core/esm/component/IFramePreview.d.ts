import React from 'react';
import { EditorManager } from '../manager';
import { EditorStoreType } from '../store/editor';
import { RenderOptions } from 'amis-core';
import { Schema } from 'amis';
export interface IFramePreviewProps {
    className: string;
    editable?: boolean;
    isMobile?: boolean;
    schema: any;
    theme?: string;
    store: EditorStoreType;
    manager: EditorManager;
    autoFocus?: boolean;
    data?: any;
    envCreator?: (props: IFramePreviewProps) => any;
}
export default class IFramePreview extends React.Component<IFramePreviewProps> {
    env: RenderOptions;
    componentDidMount(): void;
    componentWillUnmount(): void;
    dom?: HTMLElement;
    unSensor?: () => void;
    contentsRef(ref: HTMLDivElement | null): void;
    syncIframeHeight(): void;
    handleClick(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
    handleMouseLeave(): void;
    handeMouseOver(e: MouseEvent): void;
    handleDragEnter(e: React.DragEvent): void;
    handleDragLeave(e: React.DragEvent): void;
    handleDragOver(e: React.DragEvent): void;
    handleDrop(e: React.DragEvent): void;
    handleContextMenu(e: React.MouseEvent<HTMLElement>): void;
    rendererResolver(path: string, schema: Schema, props: any): RendererConfig;
    render(): JSX.Element;
}
