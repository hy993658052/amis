import { BasePlugin, InsertEventContext, PluginEvent, ScaffoldForm, RegionConfig, RendererPluginEvent, RendererPluginAction } from 'amis-editor-core';
export declare class TableControlPlugin extends BasePlugin {
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
        name: string;
        label: string;
        columns: ({
            label: string;
            name: string;
            quickEdit: {
                type: string;
                name: string;
                mode?: undefined;
                options?: undefined;
            };
        } | {
            label: string;
            name: string;
            quickEdit: {
                type: string;
                mode: string;
                name: string;
                options?: undefined;
            };
        } | {
            label: string;
            name: string;
            quickEdit: {
                type: string;
                name: string;
                options: {
                    label: string;
                    value: string;
                }[];
                mode?: undefined;
            };
        })[];
        addable: boolean;
        footerAddBtn: {
            label: string;
            icon: string;
        };
        strictMode: boolean;
    };
    regions: Array<RegionConfig>;
    previewSchema: any;
    get scaffoldForm(): ScaffoldForm;
    notRenderFormZone: boolean;
    panelJustify: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any;
    filterProps(props: any): any;
    beforeInsert(event: PluginEvent<InsertEventContext>): void;
}
