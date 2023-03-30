/**
 * @file 时间选择器的快捷键
 */
import React from 'react';
import Sortable from 'sortablejs';
import type { FormControlProps } from 'amis-core';
import type { BaseEventContext } from 'amis-editor-core';
import type { Option } from 'amis';
type $Object = {
    [key: string]: string;
};
declare enum RangeType {
    Normal = "Normal",
    Custom = "Custom"
}
export interface DateShortCutControlProps extends FormControlProps {
    className?: string;
    /**
     * 编辑器上下文数据，用于获取字段所在Form的其他字段
     */
    context: BaseEventContext;
    normalDropDownOption: $Object;
    customDropDownOption: $Object;
}
interface OptionsType {
    label?: string;
    value: string;
    type: RangeType;
    inputType?: string;
}
interface DateShortCutControlState {
    options: Array<OptionsType>;
}
export declare class DateShortCutControl extends React.PureComponent<DateShortCutControlProps, DateShortCutControlState> {
    sortable?: Sortable;
    drag?: HTMLElement | null;
    target: HTMLElement | null;
    normalDropDownOptionArr: Array<Option>;
    customDropDownOptionArr: Array<Option>;
    static defaultProps: Partial<DateShortCutControlProps>;
    constructor(props: DateShortCutControlProps);
    dragRef(ref: any): void;
    scrollToBottom(): void;
    /**
     * 初始化拖动
     */
    initDragging(): void;
    /**
     * 拖动的销毁
     */
    destroyDragging(): void;
    /**
     * 生成内容体
     */
    renderContent(): JSX.Element;
    /**
     * 生成固定跨度选项
     */
    renderNormalOption(option: OptionsType, index: number): JSX.Element;
    /**
     * 生成自定义跨度选项
     */
    renderCustomOption(option: OptionsType, index: number): JSX.Element;
    /**
     * 自定义跨度变化
     */
    handleCustomItemChange(value: string, index: number): void;
    /**
     * option添加
     */
    addItem(item: Option, type: RangeType): void;
    /**
     * 删除选项
     */
    handleDelete(index: number, e: React.UIEvent<any>): void;
    /**
     * 更新options字段的统一出口
     */
    onChangeOptions(): void;
    render(): JSX.Element;
}
export declare class DateShortCutControlRender extends DateShortCutControl {
}
export {};
