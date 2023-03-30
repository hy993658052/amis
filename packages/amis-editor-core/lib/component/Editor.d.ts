import React, { Component } from 'react';
import { EditorStoreType } from '../store/editor';
import { SchemaObject } from 'amis/lib/Schema';
import { EditorManager, PluginClass } from '../manager';
import { RenderOptions } from 'amis';
import { PluginEventListener, RendererPluginAction } from '../plugin';
import type { VariableGroup, VariableOptions } from '../variable';
export interface EditorProps extends PluginEventListener {
    value: SchemaObject;
    onChange: (value: SchemaObject) => void;
    preview?: boolean;
    isMobile?: boolean;
    isSubEditor?: boolean;
    autoFocus?: boolean;
    className?: string;
    $schemaUrl?: string;
    schemas?: Array<any>;
    theme?: string;
    /** 应用语言类型 */
    appLocale?: string;
    /** 是否开启多语言 */
    i18nEnabled?: boolean;
    showCustomRenderersPanel?: boolean;
    amisDocHost?: string;
    superEditorData?: any;
    withSuperDataSchema?: boolean;
    dataBindingChange?: (value: string, data: any, manager?: EditorManager) => void;
    /**
     * Preview 预览前可以修改配置。
     * 比如把api地址替换成 proxy 地址。
     */
    schemaFilter?: (schema: any) => any;
    amisEnv?: RenderOptions;
    /**
     * 上下文数据，设置后，面板和脚手架表单里面可以取到这些值。
     */
    ctx?: any;
    data?: any;
    /**
     * 是否禁用内置插件
     */
    disableBultinPlugin?: boolean;
    /**
     * 插件场景
     */
    scene?: string;
    disablePluginList?: Array<string> | ((id: string, plugin: PluginClass) => boolean);
    plugins?: Array<PluginClass | [PluginClass, Record<string, any> | (() => Record<string, any>)]>;
    /**
     * 传给预览器的其他属性
     */
    previewProps?: any;
    iframeUrl?: string;
    isHiddenProps?: (key: string) => boolean;
    /**
     * 事件动作面板相关配置
     */
    actionOptions?: {
        showOldEntry?: boolean;
        /**
         * 通用动作集（事件动作面板左侧动作树）
         */
        actionTreeGetter?: (actionTree: RendererPluginAction[]) => RendererPluginAction[];
        /**
         * 自定义动作配置
         */
        customActionGetter?: (manager: EditorManager) => {
            [propName: string]: RendererPluginAction;
        };
    };
    /** 上下文变量 */
    variables?: VariableGroup[];
    /** 变量配置 */
    variableOptions?: VariableOptions;
    onUndo?: () => void;
    onRedo?: () => void;
    onSave?: () => void;
    onPreview?: (preview: boolean) => void;
}
export default class Editor extends Component<EditorProps> {
    readonly store: EditorStoreType;
    readonly manager: EditorManager;
    readonly mainRef: React.RefObject<HTMLDivElement>;
    unReaction: () => void;
    lastResult: any;
    curCopySchemaData: any;
    static defaultProps: {
        autoFocus: boolean;
    };
    isInternalChange: boolean;
    constructor(props: EditorProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: EditorProps): void;
    componentWillUnmount(): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleMessage(event: any): void;
    handleContextMenu(e: React.MouseEvent<HTMLElement>): void;
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    redo(): void;
    save(): void;
    preview(): void;
    /**
     * 复制的内容以变量的形式存放
     * 备注1: 系统的复制&粘贴需要开启https服务才有效，所有这里改用内存形式实现
     * 备注2: 此方法不鞥实现跨页面复制&粘贴能力
     * 备注3: 后续需要支持下跨页面跨浏览器复制&粘贴能力
     */
    copy(): void;
    /**
     * 粘贴上一次复制的内容
     */
    paste(): void;
    getToolbarContainer(): HTMLDivElement | null;
    render(): JSX.Element;
}
