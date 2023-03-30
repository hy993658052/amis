import React from 'react';
import { EditorManager } from '../manager';
import { EditorStoreType } from '../store/editor';
export interface SubEditorProps {
    store: EditorStoreType;
    manager: EditorManager;
    theme?: string;
}
interface ScaffoldState {
    step: number;
}
export declare class ScaffoldModal extends React.Component<SubEditorProps, ScaffoldState> {
    constructor(props: SubEditorProps);
    handleConfirm([values]: any): void;
    buildSchema(): {
        wrapperComponent: string;
        data: {
            __step: number;
        };
        type: string;
        wrapWithPanel: boolean;
        initApi: any;
        api: any;
    };
    amisScope: any;
    scopeRef(scoped: any): void;
    goToNextStep(): void;
    goToPrevStep(): void;
    handleConfirmClick(): Promise<void>;
    handleCancelClick(): void;
    render(): JSX.Element;
}
export {};
