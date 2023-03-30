import { BasePlugin } from 'amis-editor-core';
import type { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class SwitchControlPlugin extends BasePlugin {
    static scene: string[];
    rendererName: string;
    $schema: string;
    order: number;
    name: string;
    isBaseComponent: boolean;
    icon: string;
    pluginIcon: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        option: string;
        name: string;
        falseValue: boolean;
        trueValue: boolean;
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
