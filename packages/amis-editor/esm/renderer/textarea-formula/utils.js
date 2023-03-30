/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __awaiter, __generator, __assign, __spreadArray, __read } from 'tslib';
import { isExpression, resolveVariableAndFilter } from 'amis-core';
import { translateSchema } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

function resolveVariablesFromScope(node, manager) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function () {
    var dataPropsAsOptions, variables, systemVarIndex_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, manager === null || manager === void 0 ? void 0 : manager.getContextSchemas(node)];
        case 1:
          _c.sent();
          dataPropsAsOptions = (_a = manager === null || manager === void 0 ? void 0 : manager.dataSchema) === null || _a === void 0 ? void 0 : _a.getDataPropsAsOptions();
          variables = ((_b = manager === null || manager === void 0 ? void 0 : manager.variableManager) === null || _b === void 0 ? void 0 : _b.getVariableFormulaOptions()) || [];
          if (dataPropsAsOptions) {
            systemVarIndex_1 = dataPropsAsOptions.findIndex(function (item) {
              return item.label === i18n("979a50681e278dcc0be18f68459e8217");
            });
            if (!!~systemVarIndex_1) {
              variables.forEach(function (item) {
                if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                  dataPropsAsOptions.splice(systemVarIndex_1, 0, item);
                }
              });
            } else {
              variables.forEach(function (item) {
                if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                  dataPropsAsOptions.push(item);
                }
              });
            }
            return [2 /*return*/, dataPropsAsOptions.map(function (item) {
              return __assign({
                selectMode: 'tree'
              }, item);
            }).filter(function (item) {
              var _a;
              return (_a = item.children) === null || _a === void 0 ? void 0 : _a.length;
            })];
          }
          return [2 /*return*/, []];
      }
    });
  });
}
/**
 * 整合 props & amis数据域 中的 variables
 * @param that  为组件的实例 this
 **/
function getVariables(that) {
  return __awaiter(this, void 0, void 0, function () {
    var variablesArr, _a, variables, requiredDataPropsVariables, _b, node, manager, vars;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          variablesArr = [];
          _a = that.props, variables = _a.variables, requiredDataPropsVariables = _a.requiredDataPropsVariables;
          if (!(!variables || requiredDataPropsVariables)) return [3 /*break*/, 2];
          _b = that.props.formProps || that.props, node = _b.node, manager = _b.manager;
          return [4 /*yield*/, resolveVariablesFromScope(node, manager)];
        case 1:
          vars = _c.sent();
          if (Array.isArray(vars)) {
            if (!that.isUnmount) {
              variablesArr = vars;
            }
          }
          _c.label = 2;
        case 2:
          if (variables) {
            if (Array.isArray(variables)) {
              variablesArr = __spreadArray(__spreadArray([], __read(variables), false), __read(variablesArr), false);
            } else if (typeof variables === 'function') {
              variablesArr = __spreadArray(__spreadArray([], __read(variables(that)), false), __read(variablesArr), false);
            } else if (isExpression(variables)) {
              variablesArr = __spreadArray(__spreadArray([], __read(resolveVariableAndFilter(that.props.variables, that.props.data, '| raw')), false), __read(variablesArr), false);
            }
          }
          // 如果存在应用语言类型，则进行翻译
          if (that.appLocale && that.appCorpusData) {
            return [2 /*return*/, translateSchema(variablesArr, that.appCorpusData)];
          }
          return [2 /*return*/, variablesArr];
      }
    });
  });
}

export { getVariables, resolveVariablesFromScope };
