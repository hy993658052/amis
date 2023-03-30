import { BasePlugin, PluginEvent, RegionConfig, RendererInfoResolveEventContext, BasicRendererInfo, InsertEventContext, ScaffoldForm, EditorNodeType, RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
import { SchemaObject } from 'amis/lib/Schema';
export declare class Table2Plugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    panelJustify: boolean;
    disabledRendererPlugin: boolean;
    description: string;
    docLink: string;
    icon: string;
    scaffold: SchemaObject;
    regions: Array<RegionConfig>;
    previewSchema: any;
    scaffoldForm: ScaffoldForm;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    buildDataSchemas(node: EditorNodeType, region?: EditorNodeType, trigger?: EditorNodeType): Promise<any>;
    getAvailableContextFields(scopeNode: EditorNodeType, node: EditorNodeType, region?: EditorNodeType): Promise<void>;
    panelBodyCreator: (context: BaseEventContext) => any;
    filterProps(props: any): any;
    getRendererInfo(context: RendererInfoResolveEventContext): BasicRendererInfo | void;
    beforeInsert(event: PluginEvent<InsertEventContext>): void;
}
