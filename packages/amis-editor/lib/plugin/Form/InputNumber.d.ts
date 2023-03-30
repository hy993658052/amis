import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
export declare class NumberControlPlugin extends BasePlugin {
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
        name: string;
        keyboard: boolean;
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    panelJustify: boolean;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any;
}
