/**
 * @file 组件选项组件的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type { FormControlProps } from 'amis-core';
import { SchemaApi } from 'amis/lib/Schema';
export type valueType = 'text' | 'boolean' | 'number';
export type NavControlItem = {
    label: string;
    to: string;
    target: string;
    icon?: string;
    unfolded?: boolean;
    active?: boolean;
    activeOn?: string;
    overflow?: {
        enable: boolean;
        overflowLabel: string;
        overflowIndicator: string;
        maxVisibleCount: number;
    };
    children?: Array<any>;
};
export interface NavControlProps extends FormControlProps {
}
export interface OptionControlState {
    links: Array<NavControlItem>;
    api: SchemaApi;
    source: 'custom' | 'api' | 'apicenter';
}
type IconType = {
    id: string;
    name: string;
};
export default class NavSourceControl extends React.Component<NavControlProps, OptionControlState> {
    sortable?: Sortable;
    drag?: HTMLElement | null;
    target: HTMLElement | null;
    $comp: string;
    internalProps: string[];
    constructor(props: NavControlProps);
    transformOptions(props: NavControlProps): any;
    /**
     * 更新options字段的统一出口
     */
    onChange(): void;
    /**
     * 切换选项类型
     */
    handleSourceChange(source: 'custom' | 'api' | 'apicenter'): void;
    /**
     * 删除选项
     */
    handleDelete(index: string): void;
    handleAdd(): void;
    renderHeader(): JSX.Element;
    handleEditLabel(index: string, value: string | boolean | IconType, key: string): void;
    handleAddChildren(index: string, value: boolean): void;
    renderNav(props: any): JSX.Element;
    renderOption(props: any): JSX.Element;
    handleAPIChange(source: SchemaApi): void;
    renderApiPanel(): any;
    render(): JSX.Element;
}
export declare class NavSourceControlRenderer extends NavSourceControl {
}
export {};
