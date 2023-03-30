import { BaseEventContext, BasePlugin, BasicPanelItem, BasicToolbarItem, BuildPanelEventContext } from 'amis-editor-core';
import { SchemaCollection } from 'amis/lib/Schema';
export declare class ActionPlugin extends BasePlugin {
    panelTitle: string;
    panelBodyCreator: (context: BaseEventContext) => SchemaCollection;
    buildEditorPanel(context: BuildPanelEventContext, panels: Array<BasicPanelItem>): void;
    buildEditorToolbar({ id, schema, info }: BaseEventContext, toolbars: Array<BasicToolbarItem>): void;
    editDetail(id: string): void;
}
