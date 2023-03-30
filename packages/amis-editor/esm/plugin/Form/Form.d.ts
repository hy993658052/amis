import { BasePlugin, ChangeEventContext, PluginEvent, RegionConfig, ScaffoldForm } from 'amis-editor-core';
import { EditorNodeType } from 'amis-editor-core';
import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class FormPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    order: number;
    name: string;
    isBaseComponent: boolean;
    description: string;
    docLink: string;
    tags: string[];
    icon: string;
    pluginIcon: string;
    scaffold: {
        type: string;
        title: string;
        body: {
            label: string;
            type: string;
            name: string;
        }[];
    };
    previewSchema: {
        type: string;
        panelClassName: string;
        mode: string;
        body: {
            label: string;
            name: string;
            type: string;
        }[];
    };
    get scaffoldForm(): ScaffoldForm;
    regions: Array<RegionConfig>;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any[];
    afterUpdate(event: PluginEvent<ChangeEventContext>): void;
    buildDataSchemas(node: EditorNodeType, region: EditorNodeType): Promise<any>;
    rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
}
