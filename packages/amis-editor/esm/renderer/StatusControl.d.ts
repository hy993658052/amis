/**
 * @file 状态配置组件
 */
import React from 'react';
import { Option } from 'amis';
import type { FormControlProps } from 'amis-core';
import type { SchemaCollection } from 'amis/lib/Schema';
import type { FormSchema } from 'amis/lib/schema';
export interface StatusControlProps extends FormControlProps {
    name: string;
    expressionName: string;
    trueValue?: boolean;
    falseValue?: boolean;
    options?: Option[];
    children?: SchemaCollection;
    messages?: Pick<FormSchema, 'messages'>;
}
type StatusFormData = {
    statusType: number;
    expression: string;
};
interface StatusControlState {
    checked: boolean;
    formData: StatusFormData;
}
export declare class StatusControl extends React.Component<StatusControlProps, StatusControlState> {
    static defaultProps: {
        trueValue: boolean;
        falseValue: boolean;
    };
    constructor(props: StatusControlProps);
    initState(): {
        checked: boolean;
        formData: StatusFormData;
    };
    shouldComponentUpdate(nextProps: StatusControlProps, nextState: StatusControlState): boolean;
    handleSwitch(value: boolean): void;
    handleFormSubmit(values: StatusFormData): void;
    render(): JSX.Element;
    renderContent(): JSX.Element;
}
export declare class StatusControlRenderer extends StatusControl {
}
export {};
