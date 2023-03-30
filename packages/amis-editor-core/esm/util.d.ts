import { Diff } from 'deep-diff';
import type { Schema } from 'amis';
declare const guid: any, omitControls: any, isObjectShallowModified: any, cloneObject: any, anyChanged: any, noop: any, makeHorizontalDeeper: any, isEmpty: any, eachTree: any, createObject: any;
export { guid, isObjectShallowModified, anyChanged, noop, makeHorizontalDeeper, omitControls, isEmpty, cloneObject, eachTree, createObject };
export declare function __uri(id: string): string;
export declare function cleanUndefined(obj: any): any;
/**
 * 把 schema 处理一下传给 Preview 去渲染
 * 给每个节点加个 $$id 这样方便编辑
 * @param obj
 */
export declare function JSONPipeIn(obj: any): any;
export declare function JSONPipeOut(obj: any, filterHiddenProps?: boolean | ((key: string, prop: any) => boolean)): any;
/**
 * 如果存在css属性，则给对应的className加上name
 */
export declare function addStyleClassName(obj: Schema): Schema;
export declare function JSONGetByPath(json: any, paths: Array<string>, stacks?: Array<any>): any;
export declare function JSONGetPathById(json: any, id: string, idKey?: string): Array<string> | null;
export declare function JSONGetById(json: any, id: string, idKey?: string): any;
export declare function JSONGetParentById(json: any, id: string, skipArray?: boolean): any;
export declare function JSONUpdate(json: any, id: string, value: any, replace?: boolean): any;
export declare function JSONDelete(json: any, id: string, pathsRef?: Array<string>, deleteIfEmpty?: boolean): any;
export declare function JSONMerge(json: any, target: any): any;
export declare function JSONChangeInArray(json: any, id: string, operation: (arr: Array<any>, node: any, index: number) => void): any;
export declare function JSONCanMoveUp(json: any, id: string): boolean;
export declare function JSONMoveUpById(json: any, id: string): any;
export declare function JSONCanMoveDown(json: any, id: string): boolean | 0;
export declare function JSONMoveDownById(json: any, id: string): any;
export declare function JSONDuplicate(json: any, id: string, reIds?: {
    [propKey: string]: string;
}): any;
/**
 * 用于复制或粘贴的时候重新生成
 * @param json
 */
export declare function reGenerateID(json: any, reIds?: {
    [propKey: string]: string;
}): any;
export declare function JsonGenerateID(json: any): void;
export declare function createElementFromHTML(htmlString: string): HTMLElement;
export declare function deepFind(schema: any, keyValue: any, result?: any): any;
/**
 * 处理一下schema的$$commonSchema
 * @param schema
 * @valueWithConfig 带commonConfig 配置项的schema
 */
export declare function filterSchemaForConfig(schema: any, valueWithConfig?: any): any;
/**
 * 给编辑器前处理一下，把 visibleOn, hiddenOn 什么的处理掉，要不没办法编辑。
 * @param schema
 */
export declare function filterSchemaForEditor(schema: any): any;
export declare function blackList(list: Array<string>): (str: string) => boolean;
export declare function sortByList(list: Array<string>, attr: string | Function): (a: any, b: any) => 0 | 1 | -1;
export declare function persistGet(key: string, defaultValue?: any): any;
export declare function persistSet(key: string, value: any): void;
export declare function normalizeId(id: string): string;
export declare const autobind: any;
export declare function addDragingClass(el: HTMLElement): void;
export declare function removeDragingClass(el: HTMLElement): void;
export declare function camelize(str: string): string;
export declare const reactionWithOldValue: <T>(expression: () => T, effect: (newValue: T, oldValue?: T | undefined) => void) => import("mobx").IReactionDisposer;
export declare function repeatArray<T>(child: T, count?: number): Array<T>;
export type DiffChange = Diff<any, any>;
export declare function diff(left: any, right: any, prefilter?: (currentPath: Array<string>, key: string) => boolean): Array<DiffChange> | undefined;
export declare function patchDiff(left: any, changes: Array<DiffChange> | undefined): any;
/**
 * 遍历 schema
 * @param json
 * @param mapper
 */
export declare function JSONTraverse(json: any, mapper: (value: any, key: string | number, host: Object) => any): void;
export type PanelSchemaObject = Schema;
/**
 * 判断输入内容是否为数字格式
 */
export declare const isNumeric: (value: any) => boolean;
export declare const string2CSSUnit: (value: any, unit?: string) => any;
export declare function isString(obj: any): boolean;
/**
 *  判断是否是对象类型
 * */
export declare function isObject(curObj: any): boolean;
export declare function jsonToJsonSchema(json?: any): any;
/**
 * 生成节点id
 */
export declare function generateNodeId(): string;
export declare function isHasPluginIcon(plugin: any): any;
/**
 * 判断是否是布局容器类组件
 * 备注：当前只有一个flex布局容器
 */
export declare function isLayoutPlugin(plugin: any): boolean;
/**
 * 单位数值运算
 * 备注：支持带单位的数值进行运算
 */
export declare function unitFormula(insetStr: string, offsetVal: number): string;
/**
 * 过滤搜索字段中的特殊字符
 */
export declare function stringRegExp(keyword: string): string;
/**
 * 过滤搜索字段中的特殊字符
 */
export declare function needDefaultWidth(elemType: string): boolean;
/** 是否开启应用国际化 */
export declare function getI18nEnabled(): any;
/** schema 翻译方法 */
export declare function translateSchema(schema: any, replaceData?: any): any;
/** 应用级别的翻译方法 */
export declare function appTranslate(value?: string): any;
/**
 * 判断是否需要给组件增加填充占位样式
 */
export declare function needFillPlaceholder(curProps: any): boolean;
