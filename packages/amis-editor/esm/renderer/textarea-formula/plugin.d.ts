/**
 * @file 扩展 codemirror
 */
import type CodeMirror from 'codemirror';
import { TextareaFormulaControlProps } from './TextareaFormulaControl';
export declare function editorFactory(dom: HTMLElement, cm: typeof CodeMirror, props: any): CodeMirror.Editor;
export declare class FormulaPlugin {
    readonly editor: CodeMirror.Editor;
    readonly cm: typeof CodeMirror;
    readonly getProps: () => TextareaFormulaControlProps;
    readonly onExpressionClick: (expression: string, brace?: Array<CodeMirror.Position>) => any;
    constructor(editor: CodeMirror.Editor, cm: typeof CodeMirror, getProps: () => TextareaFormulaControlProps, onExpressionClick: (expression: string, brace?: Array<CodeMirror.Position>) => any);
    autoMark(): void;
    getExpressionBrace(expression: string): {
        line: number;
        ch: number;
    }[] | undefined;
    computedBracesPosition(exp: string): {
        begin: number;
        end: number;
    }[];
    checkStrIsInBraces([from, to]: number[], braces: {
        begin: number;
        end: number;
    }[]): boolean;
    insertBraces(originFrom: CodeMirror.Position, originTo: CodeMirror.Position): void;
    insertContent(value: any, type?: 'expression', brace?: Array<CodeMirror.Position>): void;
    markExpression(from: CodeMirror.Position, to: CodeMirror.Position, expression?: string, className?: string): void;
    focus(value: string): void;
    dispose(): void;
    validate(): void;
}
