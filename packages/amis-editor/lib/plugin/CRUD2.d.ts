import { AfterBuildPanelBody, BaseEventContext, BasePlugin, BasicRendererInfo, PluginEvent, RendererInfoResolveEventContext, ScaffoldForm, EditorManager, EditorNodeType, DSBuilder, DSBuilderManager, DSFeatureType, RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
import { CRUD2Schema } from 'amis/lib/renderers/CRUD2';
import { FeatureOption } from '../renderer/FeatureControl';
type FeatOption = {
    label: string;
    value: DSFeatureType;
    makeSetting?: (builder: DSBuilder) => any;
    resolveSchema: (setting: any, builder: DSBuilder) => any;
    align?: 'left' | 'right';
};
export declare class CRUDPlugin extends BasePlugin {
    constructor(manager: EditorManager);
    afterBuildPanelBody(event: PluginEvent<AfterBuildPanelBody>): Promise<void>;
    addFilterPanelSetting(context: AfterBuildPanelBody): Promise<void>;
    addDataOperatorSchema(schema: any, content: any): void;
    addFeatToToolbar(schema: any, content: any, position: 'header' | 'footer', align: 'left' | 'right'): void;
    filterOperators(builder: DSBuilder, context: BaseEventContext): FeatureOption[];
    makeFeatSetting(feat: FeatOption, builder: DSBuilder, inScaffold: boolean): any;
    isFeatActive(schema: any, feat: DSFeatureType, ...scope: string[]): any;
    removeFeatSchema(schema: any, feat: DSFeatureType, ...scope: string[]): any;
    filterColumns(builder: DSBuilder, context: BaseEventContext): FeatureOption[];
    addListPanelSetting(context: AfterBuildPanelBody): void;
    disabledRendererPlugin: boolean;
    dsBuilderMgr: DSBuilderManager;
    rendererName: string;
    multifactor: boolean;
    $schema: string;
    order: number;
    docLink: string;
    tags: string[];
    scaffold: CRUD2Schema;
    getScaffoldFeatureTab(): any[];
    name: string;
    /** 将数据资源和数据操作进行填充 */
    resolveListField(setting: any, schema: any, builder: DSBuilder): void;
    get scaffoldForm(): ScaffoldForm;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    previewSchema: any;
    getRendererInfo(context: RendererInfoResolveEventContext): BasicRendererInfo | void;
    buildDataSchemas(node: EditorNodeType, region?: EditorNodeType): Promise<any>;
    getAvailableContextFields(scopeNode: EditorNodeType, node: EditorNodeType, region?: EditorNodeType): Promise<any>;
}
export declare class TableCRUDPlugin extends CRUDPlugin {
    name: string;
    isBaseComponent: boolean;
    description: string;
    order: number;
    icon: string;
    scaffold: any;
    resolveListField(setting: any, schema: any, builder: DSBuilder): void;
    panelTitle: '表格';
}
export declare class CardsCRUDPlugin extends CRUDPlugin {
    name: string;
    isBaseComponent: boolean;
    description: string;
    order: number;
    icon: string;
    scaffold: any;
    resolveListField(setting: any, schema: any, builder: DSBuilder): void;
    /**填充一个数据操作 */
    fillOperatorSchema(schema: any, content: any): void;
    /** 判断内容区是否有填充数据操作 */
    existOperator(feat: DSFeatureType, schema: any): any;
}
export declare class ListCRUDPlugin extends CRUDPlugin {
    name: string;
    isBaseComponent: boolean;
    description: string;
    order: number;
    icon: string;
    scaffold: any;
    resolveListField(setting: any, schema: any, builder: DSBuilder): void;
    /** 判断内容区是否有填充数据操作 */
    existOperator(feat: DSFeatureType, schema: any): any;
}
export {};
