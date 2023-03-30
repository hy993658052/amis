import React from 'react';
import { PanelProps } from '../../plugin';
import { EditorNodeType } from '../../store/node';
export declare class OutlinePanel extends React.Component<PanelProps> {
    state: {
        curSearchElemKey: string;
    };
    handleClick(e: React.MouseEvent<HTMLAnchorElement>): void;
    handleEnter(e: React.MouseEvent): void;
    handleDragStart(e: React.DragEvent): void;
    handleDragOver(e: React.DragEvent): void;
    handleDrop(e: React.DragEvent): void;
    handleSearchElemKeyChange(searchVal: string): void;
    clearSearchElemKey(): void;
    renderTitleByKeyword(rendererTitle: string, curSearchTitle: string): string | JSX.Element;
    renderItem(option: EditorNodeType, index: number): JSX.Element | null;
    render(): JSX.Element;
}
