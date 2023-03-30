/**
 * @file 开关 + 更多编辑组合控件
 * 使用时需关注所有的配置项是一个object还是整个data中，可使用bulk来区分
 *
 */
import React from 'react';
import type { Action } from 'amis';
import type { SchemaCollection } from 'amis/lib/Schema';
import type { IScopedContext } from 'amis-core';
import type { FormSchema } from 'amis/lib/schema';
import type { FormControlProps } from 'amis-core';
export interface SwitchMoreProps extends FormControlProps {
    className?: string;
    form?: Omit<FormSchema, 'type'>;
    formType: 'extend' | 'dialog' | 'pop';
    body?: SchemaCollection;
    rootClose?: boolean;
    autoFocus?: boolean;
    overlay?: boolean;
    container?: HTMLElement | (() => HTMLElement) | Function;
    target?: React.ReactNode | Function;
    trueValue?: any;
    falseValue?: any;
    removable?: boolean;
    hiddenOnDefault?: boolean;
    bulk?: boolean;
    onRemove?: (e: React.UIEvent<any> | void) => void;
    onClose: (e: React.UIEvent<any> | void) => void;
    defaultData?: any;
}
interface SwitchMoreState {
    /**
     * 是否展示更多编辑内容
     */
    show: boolean;
    /**
     * 是否开启编辑
     */
    checked: boolean;
}
export default class SwitchMore extends React.Component<SwitchMoreProps, SwitchMoreState> {
    static defaultProps: Pick<SwitchMoreProps, 'container' | 'autoFocus' | 'overlay' | 'rootClose' | 'trueValue' | 'falseValue' | 'formType' | 'bulk'>;
    overlay: HTMLElement | null;
    formNames: null | Array<string>;
    constructor(props: SwitchMoreProps);
    initState(): {
        checked: boolean;
        show: boolean;
    };
    getFormItemNames(): any[];
    overlayRef(ref: any): void;
    openPopover(): void;
    toogleExtend(): void;
    closePopover(): void;
    handleDelete(e: React.UIEvent<any> | void): void;
    handleSwitchChange(checked: boolean): void;
    handleSubmit(values: any): void;
    handleAction(e: React.UIEvent<any> | void, action: Action, data: object, throwErrors?: boolean, delegate?: IScopedContext): void;
    renderActions(): any[] | null;
    renderPopover(): JSX.Element;
    renderExtend(): JSX.Element | null;
    renderDialogMore(): {
        type: string;
        btnLabel: string;
        className: string;
        itemClassName: string;
        icon: string;
        form: {
            name?: string | undefined;
            tabs?: any;
            data: any;
            horizontal: import("packages/amis-core/lib").FormHorizontal;
            labelAlign?: import("packages/amis-core/lib/renderers/Item").LabelAlign | undefined;
            body?: SchemaCollection | undefined;
            title: any;
            primaryField?: string | undefined;
            messages?: {
                validateFailed?: string | undefined;
            } | undefined;
            reload?: string | undefined;
            actions?: import("packages/amis/lib/renderers/Action").ActionSchema[] | undefined;
            fieldSet?: any;
            mode: string;
            static?: boolean | undefined;
            staticOn?: string | undefined;
            submitText?: string | undefined;
            api?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
            target?: string | undefined;
            feedback?: any;
            staticClassName?: import("packages/amis-core/lib").SchemaClassName | undefined;
            initFetch?: boolean | undefined;
            interval?: number | undefined;
            silentPolling?: boolean | undefined;
            stopAutoRefreshWhen?: string | undefined;
            initApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
            initFetchOn?: string | undefined;
            redirect?: string | undefined;
            affixFooter?: boolean | undefined;
            debug?: boolean | undefined;
            debugConfig?: {
                levelExpand?: number | undefined;
                enableClipboard?: boolean | undefined;
                iconStyle?: "circle" | "square" | "triangle" | undefined;
                quotesOnKeys?: boolean | undefined;
                sortKeys?: boolean | undefined;
                ellipsisThreshold?: number | false | undefined;
            } | undefined;
            initAsyncApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
            initFinishedField?: string | undefined;
            initCheckInterval?: number | undefined;
            persistData?: string | undefined;
            persistDataKeys?: string[] | undefined;
            clearPersistDataAfterSubmit?: boolean | undefined;
            asyncApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
            checkInterval?: number | undefined;
            finishedField?: string | undefined;
            resetAfterSubmit?: boolean | undefined;
            clearAfterSubmit?: boolean | undefined;
            columnCount?: number | undefined;
            autoFocus: boolean | undefined;
            panelClassName: import("packages/amis-core/lib").ClassName;
            submitOnChange: boolean;
            submitOnInit?: boolean | undefined;
            wrapWithPanel: boolean;
            promptPageLeave?: boolean | undefined;
            promptPageLeaveMessage?: string | undefined;
            rules?: {
                rule: string;
                message: string;
                name?: string | string[] | undefined;
            }[] | undefined;
            preventEnterSubmit: boolean;
            labelWidth?: string | number | undefined;
            type: string;
            actionsClassName: string;
            wrapperComponent: string;
            formLazyChange: boolean;
        };
    };
    renderForm(): {
        name?: string | undefined;
        tabs?: any;
        data: any;
        horizontal: import("packages/amis-core/lib").FormHorizontal;
        labelAlign?: import("packages/amis-core/lib/renderers/Item").LabelAlign | undefined;
        body?: SchemaCollection | undefined;
        title?: string | undefined;
        primaryField?: string | undefined;
        messages?: {
            validateFailed?: string | undefined;
        } | undefined;
        reload?: string | undefined;
        actions?: import("packages/amis/lib/renderers/Action").ActionSchema[] | undefined;
        fieldSet?: any;
        mode: string;
        static?: boolean | undefined;
        staticOn?: string | undefined;
        submitText?: string | undefined;
        api?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
        target?: string | undefined;
        feedback?: any;
        staticClassName?: import("packages/amis-core/lib").SchemaClassName | undefined;
        initFetch?: boolean | undefined;
        interval?: number | undefined;
        silentPolling?: boolean | undefined;
        stopAutoRefreshWhen?: string | undefined;
        initApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
        initFetchOn?: string | undefined;
        redirect?: string | undefined;
        affixFooter?: boolean | undefined;
        debug?: boolean | undefined;
        debugConfig?: {
            levelExpand?: number | undefined;
            enableClipboard?: boolean | undefined;
            iconStyle?: "circle" | "square" | "triangle" | undefined;
            quotesOnKeys?: boolean | undefined;
            sortKeys?: boolean | undefined;
            ellipsisThreshold?: number | false | undefined;
        } | undefined;
        initAsyncApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
        initFinishedField?: string | undefined;
        initCheckInterval?: number | undefined;
        persistData?: string | undefined;
        persistDataKeys?: string[] | undefined;
        clearPersistDataAfterSubmit?: boolean | undefined;
        asyncApi?: string | import("packages/amis-core/lib").BaseApiObject | undefined;
        checkInterval?: number | undefined;
        finishedField?: string | undefined;
        resetAfterSubmit?: boolean | undefined;
        clearAfterSubmit?: boolean | undefined;
        columnCount?: number | undefined;
        autoFocus: boolean | undefined;
        panelClassName: import("packages/amis-core/lib").ClassName;
        submitOnChange: boolean;
        submitOnInit?: boolean | undefined;
        wrapWithPanel: boolean;
        promptPageLeave?: boolean | undefined;
        promptPageLeaveMessage?: string | undefined;
        rules?: {
            rule: string;
            message: string;
            name?: string | string[] | undefined;
        }[] | undefined;
        preventEnterSubmit: boolean;
        labelWidth?: string | number | undefined;
        type: string;
        actionsClassName: string;
        wrapperComponent: string;
        formLazyChange: boolean;
    };
    renderMoreSection(): JSX.Element | null;
    render(): JSX.Element | null;
}
export declare class SwitchMoreRenderer extends SwitchMore {
}
export {};
