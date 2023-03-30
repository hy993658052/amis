import { BasePlugin } from 'amis-editor-core';
import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class TagControlPlugin extends BasePlugin {
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
        name: string;
        options: string[];
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any[];
}
