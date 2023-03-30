import { BasePlugin } from 'amis-editor-core';
import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class DateControlPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    order: number;
    icon: string;
    pluginIcon: string;
    name: string;
    isBaseComponent: boolean;
    searchKeywords: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
