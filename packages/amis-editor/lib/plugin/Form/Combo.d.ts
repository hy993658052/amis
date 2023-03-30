import { BasePlugin, RendererPluginEvent, RendererPluginAction, RegionConfig } from 'amis-editor-core';
export declare class ComboControlPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
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
        multiple: boolean;
        addable: boolean;
        removable: boolean;
        removableMode: string;
        addBtn: {
            label: string;
            icon: string;
            level: string;
            size: string;
        };
        items: ({
            type: string;
            name: string;
            placeholder: string;
            options?: undefined;
        } | {
            type: string;
            name: string;
            placeholder: string;
            options: {
                label: string;
                value: string;
            }[];
        })[];
    };
    previewSchema: any;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelTitle: string;
    notRenderFormZone: boolean;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
    filterProps(props: any): any;
    regions: Array<RegionConfig>;
}
