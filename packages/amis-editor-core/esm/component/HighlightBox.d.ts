import React from 'react';
import { EditorStoreType } from '../store/editor';
import { EditorNodeType } from '../store/node';
import { EditorManager } from '../manager';
export interface HighlightBoxProps {
    store: EditorStoreType;
    node: EditorNodeType;
    id: string;
    className?: string;
    title: string;
    toolbarContainer?: () => any;
    onSwitch?: (id: string) => void;
    manager: EditorManager;
    children?: React.ReactNode;
}
export default class HighlightBox extends React.Component<HighlightBoxProps> {
    mainRef: React.RefObject<HTMLDivElement>;
    handleWResizerMouseDown(e: MouseEvent): void;
    handleHResizerMouseDown(e: MouseEvent): void;
    handleResizerMouseDown(e: MouseEvent): void;
    startResize(e: MouseEvent, direction?: 'horizontal' | 'vertical' | 'both'): void;
    wResizerDom: HTMLElement;
    wResizerRef(ref: any): void;
    hResizerDom: HTMLElement;
    hResizerRef(ref: any): void;
    resizerDom: HTMLElement;
    resizerRef(ref: any): void;
    handleMouseEnter(): void;
    handleDragStart(e: React.DragEvent): void;
    render(): JSX.Element;
}
