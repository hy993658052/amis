/**
 * 从amis数据域中取变量数据
 * @param node
 * @param manager
 * @returns
 */
export declare function resolveVariablesFromScope(node: any, manager: any): Promise<any[]>;
/**
 * 整合 props & amis数据域 中的 variables
 * @param that  为组件的实例 this
 **/
export declare function getVariables(that: any): Promise<any>;
