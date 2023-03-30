import { BasePlugin, BasicRendererInfo, RendererInfoResolveEventContext } from 'amis-editor-core';
export declare class ColumnToggler extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    disabledRendererPlugin: boolean;
    description: string;
    tags: string[];
    icon: string;
    panelTitle: string;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
    /**
     * 如果禁用了没办法编辑
     */
    filterProps(props: any): any;
    /**
     * 如果配置里面有 rendererName 自动返回渲染器信息。
     * @param renderer
     */
    getRendererInfo({ renderer, schema }: RendererInfoResolveEventContext): BasicRendererInfo | void;
}
