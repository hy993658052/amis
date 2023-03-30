import { BaseEventContext, BasePlugin, BasicToolbarItem } from '../plugin';
/**
 * 添加调试功能
 */
export declare class DataDebugPlugin extends BasePlugin {
    static scene: string[];
    static id: string;
    buildEditorToolbar({ id, schema, node }: BaseEventContext, toolbars: Array<BasicToolbarItem>): void;
    dataViewer: {
        type: string;
        name: string;
        asFormItem: boolean;
        className: string;
        component: ({ value, onChange, readOnly }: {
            value: any;
            onChange: (value: any) => void;
            readOnly?: boolean | undefined;
        }) => JSX.Element;
    };
    openDebugForm(data: any, callback?: (values: any) => void): Promise<void>;
}
