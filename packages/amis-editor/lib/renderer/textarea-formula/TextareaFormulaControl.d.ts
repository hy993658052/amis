/**
 * @file 长文本公式输入框
 */
/// <reference types="lodash" />
import React from 'react';
import { FormControlProps } from 'amis-core';
import { FormulaPlugin } from './plugin';
import { CustomFormulaPickerProps } from './FormulaPicker';
import CodeMirror from 'codemirror';
import { VariableItem } from 'amis-ui/lib/components/formula/Editor';
export interface TextareaFormulaControlProps extends FormControlProps {
    /**
     * 输入框的高度， 默认 100 px
     */
    height?: number;
    /**
     * 用于提示的变量集合，默认为空
     */
    variables?: Array<VariableItem> | Function;
    /**
     * 配合 variables 使用
     * 当 props.variables 存在时， 是否再从 amis数据域中取变量集合，默认 false;
     */
    requiredDataPropsVariables?: boolean;
    /**
     * 变量展现模式，可选值：'tabs' ｜ 'tree'
     */
    variableMode?: 'tree' | 'tabs';
    /**
     *  附加底部按钮菜单项
     */
    additionalMenus?: Array<{
        label: string;
        onClick: () => void;
        icon?: string;
        className?: string;
    }>;
    /**
     * 整体点击长文本公式输入框
     */
    onOverallClick?: () => void;
    /**
     * 自定义fx面板
     */
    customFormulaPicker?: React.FC<CustomFormulaPickerProps>;
}
interface TextareaFormulaControlState {
    value: string;
    variables: Array<VariableItem>;
    formulaPickerOpen: boolean;
    formulaPickerValue: string;
    expressionBrace?: Array<CodeMirror.Position>;
    isFullscreen: boolean;
}
export declare class TextareaFormulaControl extends React.Component<TextareaFormulaControlProps, TextareaFormulaControlState> {
    static defaultProps: Partial<TextareaFormulaControlProps>;
    isUnmount: boolean;
    editorPlugin?: FormulaPlugin;
    unReaction: any;
    appLocale: string;
    appCorpusData: any;
    constructor(props: TextareaFormulaControlProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: TextareaFormulaControlProps): Promise<void>;
    componentWillUnmount(): void;
    onExpressionClick(expression: string, brace?: Array<CodeMirror.Position>): void;
    closeFormulaPicker(): void;
    handleConfirm(value: any): void;
    handleOnChange: import("lodash").DebouncedFunc<(value: any) => void>;
    editorFactory(dom: HTMLElement, cm: any): CodeMirror.Editor;
    handleEditorMounted(cm: any, editor: any): void;
    handleFullscreenModeChange(): void;
    handleFormulaClick(): void;
    editorAutoMark(): void;
    render(): JSX.Element;
}
export default class TextareaFormulaControlRenderer extends TextareaFormulaControl {
}
export {};
