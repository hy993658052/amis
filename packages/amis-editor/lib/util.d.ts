import { ActionConfig } from './renderer/event-control/types';
/**
 * 获取事件动作面板所需属性配置
 */
export declare const getEventControlConfig: (manager: EditorManager, context: BaseEventContext) => {
    showOldEntry: boolean;
    actions: any;
    events: any;
    actionTree: any;
    commonActions: any;
    owner: string;
    addBroadcast: any;
    removeBroadcast: any;
    getContextSchemas: (id?: string, withoutSuper?: boolean) => Promise<any>;
    getComponents: (action: RendererPluginAction) => any;
    actionConfigInitFormatter: (action: ActionConfig) => {
        actionType: any;
    };
    actionConfigSubmitFormatter: (config: ActionConfig) => {
        [x: string]: any;
    };
};
/**
 * 布局配置项，数值设置时需要
 */
export declare const isAuto: (value: any) => boolean;
