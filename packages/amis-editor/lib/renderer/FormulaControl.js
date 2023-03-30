/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var isNumber = require('lodash/isNumber');
var isBoolean = require('lodash/isBoolean');
var isPlainObject = require('lodash/isPlainObject');
var isArray = require('lodash/isArray');
var isString = require('lodash/isString');
var omit = require('lodash/omit');
var cx = require('classnames');
var amis = require('amis');
var FormulaEditor = require('amis-ui/lib/components/formula/Editor');
var amisEditorCore = require('amis-editor-core');
var mobx = require('mobx');
var utils = require('./textarea-formula/utils.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isNumber__default = /*#__PURE__*/_interopDefaultLegacy(isNumber);
var isBoolean__default = /*#__PURE__*/_interopDefaultLegacy(isBoolean);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var isArray__default = /*#__PURE__*/_interopDefaultLegacy(isArray);
var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 表达式控件
 */
exports.FormulaDateType = void 0;
(function (FormulaDateType) {
  FormulaDateType[FormulaDateType["NotDate"] = 0] = "NotDate";
  FormulaDateType[FormulaDateType["IsDate"] = 1] = "IsDate";
  FormulaDateType[FormulaDateType["IsRange"] = 2] = "IsRange"; // 日期时间范围类
})(exports.FormulaDateType || (exports.FormulaDateType = {}));
var FormulaControl = /** @class */function (_super) {
  tslib.__extends(FormulaControl, _super);
  function FormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.handleSimpleInputChange = function (value) {
      var _a, _b;
      var curValue = _this.outReplaceExpression(value);
      (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, curValue);
    };
    _this.handleInputChange = function (value) {
      var _a, _b;
      (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    _this.state = {
      variables: [],
      variableMode: 'tabs'
    };
    return _this;
  }
  FormulaControl.prototype.componentDidMount = function () {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var editorStore, variablesArr;
      var _this = this;
      return tslib.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            editorStore = window.editorStore;
            this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
            this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
            this.unReaction = mobx.reaction(function () {
              return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
            }, function () {
              return tslib.__awaiter(_this, void 0, void 0, function () {
                var variablesArr;
                return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                      this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                      return [4 /*yield*/, utils.getVariables(this)];
                    case 1:
                      variablesArr = _a.sent();
                      this.setState({
                        variables: variablesArr
                      });
                      return [2 /*return*/];
                  }
                });
              });
            });

            return [4 /*yield*/, utils.getVariables(this)];
          case 1:
            variablesArr = _a.sent();
            this.setState({
              variables: variablesArr
            });
            return [2 /*return*/];
        }
      });
    });
  };

  FormulaControl.prototype.componentDidUpdate = function (prevProps) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var variablesArr;
      return tslib.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.props.data !== prevProps.data)) return [3 /*break*/, 2];
            return [4 /*yield*/, utils.getVariables(this)];
          case 1:
            variablesArr = _a.sent();
            this.setState({
              variables: variablesArr
            });
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };

  FormulaControl.prototype.componentWillUnmount = function () {
    var _a;
    this.isUnmount = true;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  /**
   * 将 ${xx}（非 \${xx}）替换成 \${xx}
   * 备注: 手动编辑时，自动处理掉 ${xx}，避免识别成 公式表达式
   */
  FormulaControl.prototype.outReplaceExpression = function (expression) {
    if (expression && isString__default["default"](expression) && amis.isExpression(expression)) {
      return expression.replace(/(^|[^\\])\$\{/g, '\\${');
    }
    return expression;
  };
  FormulaControl.prototype.inReplaceExpression = function (expression) {
    if (expression && isString__default["default"](expression)) {
      return expression.replace(/\\\$\{/g, '${');
    }
    return expression;
  };
  // 根据 name 值 判断当前表达式是否 存在循环引用问题
  FormulaControl.prototype.isLoopExpression = function (expression, selfName) {
    if (!expression || !selfName || !isString__default["default"](expression)) {
      return false;
    }
    var variables = [];
    try {
      variables = amis.FormulaExec.collect(expression);
    } catch (e) {}
    return variables.some(function (variable) {
      return variable === selfName;
    });
  };
  // 判断是否是期望类型
  FormulaControl.prototype.isExpectType = function (value) {
    if (value === null || value === undefined) {
      return true; // 数值为空不进行类型识别
    }

    var rendererSchema = this.props.rendererSchema;
    var expectType = this.props.valueType;
    if (expectType === null || expectType === undefined) {
      return true; // expectType为空，则不进行类型识别
    }
    // 当前数据域
    var curData = this.getContextData();
    if (rendererSchema.type === 'switch' && (rendererSchema.trueValue !== undefined || rendererSchema.falseValue !== undefined)) {
      // 开关类型组件单独处理
      return rendererSchema.trueValue === value || rendererSchema.falseValue === value;
    } else if (expectType === 'number' && isNumber__default["default"](value) || expectType === 'boolean' && isBoolean__default["default"](value) || expectType === 'object' && isPlainObject__default["default"](value) || expectType === 'array' && isArray__default["default"](value)) {
      return true;
    } else if (isString__default["default"](value)) {
      if (amis.isExpression(value)) {
        // 根据公式运算结果判断类型
        var formulaValue = amis.FormulaExec.formula(value, curData);
        if (expectType === 'number' && isNumber__default["default"](formulaValue) || expectType === 'boolean' && isBoolean__default["default"](formulaValue) || expectType === 'object' && isPlainObject__default["default"](formulaValue) || expectType === 'array' && isArray__default["default"](formulaValue) || expectType === 'string' && isString__default["default"](formulaValue)) {
          return true;
        }
      } else if (expectType === 'string') {
        // 非公式字符串
        return true;
      }
    }
    return false;
  };
  FormulaControl.prototype.matchDate = function (str) {
    var matchDate = /^(.+)?(\+|-)(\d+)(minute|min|hour|day|week|month|year|weekday|second|millisecond)s?$/i;
    var m = matchDate.exec(str);
    return m ? m[1] ? this.matchDate(m[1]) : true : false;
  };
  FormulaControl.prototype.matchDateRange = function (str) {
    if (/^(now|today)$/.test(str)) {
      return true;
    }
    return this.matchDate(str);
  };
  // 日期类组件 & 是否存在快捷键判断
  FormulaControl.prototype.hasDateShortcutkey = function (str) {
    var _a;
    var DateTimeType = this.props.DateTimeType;
    if (DateTimeType === exports.FormulaDateType.IsDate) {
      if (/^(now|today)$/.test(str)) {
        return true;
      }
      return this.matchDate(str);
    } else if (DateTimeType === exports.FormulaDateType.IsRange) {
      var start_end = (_a = str === null || str === void 0 ? void 0 : str.split) === null || _a === void 0 ? void 0 : _a.call(str, ',');
      if (start_end && start_end.length === 2) {
        return this.matchDateRange(start_end[0].trim()) && this.matchDateRange(start_end[1].trim());
      }
    }
    // 非日期类组件使用，也直接false
    // if (DateTimeType === FormulaDateType.NotDate) {
    //   return false;
    // }
    return false;
  };
  FormulaControl.prototype.transExpr = function (str) {
    if (typeof str === 'string' && (str === null || str === void 0 ? void 0 : str.slice(0, 2)) === '${' && (str === null || str === void 0 ? void 0 : str.slice(-1)) === '}') {
      // 非最外层内容还存在表达式情况
      if (amis.isExpression(str.slice(2, -1))) {
        return str;
      }
      if (str.lastIndexOf('${') > str.indexOf('}') && str.indexOf('}') > -1) {
        return str;
      }
      return str.slice(2, -1);
    }
    return str;
  };
  FormulaControl.prototype.handleConfirm = function (value) {
    var _a, _b;
    var val = !value ? undefined : amis.isExpression(value) || this.hasDateShortcutkey(value) ? value : "${".concat(value, "}");
    (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, val);
  };
  // 剔除掉一些用不上的属性
  FormulaControl.prototype.filterCustomRendererProps = function (rendererSchema) {
    var _a, _b, _c;
    var _d = this.props,
      data = _d.data,
      name = _d.name,
      placeholder = _d.placeholder;
    var curRendererSchema = null;
    if (rendererSchema) {
      curRendererSchema = Object.assign({}, rendererSchema, data, {
        type: (_a = rendererSchema.type) !== null && _a !== void 0 ? _a : data.type,
        name: (_c = (_b = rendererSchema.name) !== null && _b !== void 0 ? _b : data.name) !== null && _c !== void 0 ? _c : 'value'
      });
      // 默认要剔除的字段
      var deleteProps = ['label', 'id', '$$id', 'className', 'style', 'readOnly', 'horizontal', 'size', 'remark', 'labelRemark', 'hidden', 'hiddenOn', 'visible', 'visibleOn', 'disabled', 'disabledOn', 'required', 'requiredOn', 'className', 'labelClassName', 'labelAlign', 'inputClassName', 'description', 'autoUpdate', 'prefix', 'suffix', 'unitOptions', 'keyboard', 'kilobitSeparator', 'value', 'inputControlClassName', 'css'];
      // 当前组件要剔除的字段
      if (this.props.needDeleteProps) {
        deleteProps.push.apply(deleteProps, tslib.__spreadArray([], tslib.__read(this.props.needDeleteProps), false));
      }
      if (name && name === 'min') {
        // 避免min影响自身默认值设置
        deleteProps.push('min');
      }
      if (name && name === 'max') {
        // 避免max影响自身默认值设置
        deleteProps.push('max');
      }
      curRendererSchema = omit__default["default"](curRendererSchema, deleteProps);
      // 设置可清空
      curRendererSchema.clearable = true;
      // 设置统一的占位提示
      if (curRendererSchema.type === 'select') {
        !curRendererSchema.placeholder && (curRendererSchema.placeholder = i18nRuntime.i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"));
        curRendererSchema.inputClassName = 'ae-editor-FormulaControl-select-style';
      } else if (placeholder) {
        curRendererSchema.placeholder = placeholder;
      } else {
        curRendererSchema.placeholder = i18nRuntime.i18n("e0c7ac5eb397512fdbe71600baa09dab");
      }
      // 设置popOverContainer
      curRendererSchema.popOverContainer = window.document.body;
    }
    // 对 schema 进行国际化翻译
    if (this.appLocale && this.appCorpusData) {
      return amisEditorCore.translateSchema(curRendererSchema, this.appCorpusData);
    }
    return curRendererSchema;
  };
  FormulaControl.prototype.renderFormulaValue = function (item) {
    var html = {
      __html: item.html
    };
    // bca-disable-next-line
    return React__default["default"].createElement("span", {
      dangerouslySetInnerHTML: html
    });
  };
  FormulaControl.prototype.getContextData = function () {
    var _a, _b, _c, _d;
    // 当前数据域
    return ((_c = (_b = (_a = this.props.data) === null || _a === void 0 ? void 0 : _a.__super) === null || _b === void 0 ? void 0 : _b.__props__) === null || _c === void 0 ? void 0 : _c.data) || ((_d = this.props.manager) === null || _d === void 0 ? void 0 : _d.amisStore) || {};
  };
  FormulaControl.prototype.render = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      className = _c.className;
      _c.label;
      var value = _c.value,
      header = _c.header;
      _c.variables;
      var placeholder = _c.placeholder,
      simple = _c.simple,
      rendererSchema = _c.rendererSchema,
      rendererWrapper = _c.rendererWrapper,
      manager = _c.manager,
      _d = _c.useExternalFormData,
      useExternalFormData = _d === void 0 ? false : _d,
      render = _c.render,
      rest = tslib.__rest(_c, ["className", "label", "value", "header", "variables", "placeholder", "simple", "rendererSchema", "rendererWrapper", "manager", "useExternalFormData", "render"]);
    // 自身字段
    var selfName = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name;
    // 判断是否含有公式表达式
    var isExpr = amis.isExpression(value);
    // 判断当前是否有循环引用，备注：非精准识别，待优化
    var isLoop = false;
    if (isExpr && (rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name)) {
      isLoop = (rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name) ? this.isLoopExpression(value, rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name) : false;
    }
    // 判断是否含有公式表达式
    var isTypeError = !this.isExpectType(value);
    var exprValue = this.transExpr(value);
    var isError = isLoop || isTypeError;
    var highlightValue = amis.isExpression(value) ? FormulaEditor.FormulaEditor.highlightValue(exprValue, this.state.variables) || {
      html: exprValue
    } : value;
    // 公式表达式弹窗内容过滤
    var filterValue = amis.isExpression(value) ? exprValue : this.hasDateShortcutkey(value) ? value : undefined;
    // 值 是表达式或日期快捷
    var isFx = !simple && (isExpr || this.hasDateShortcutkey(value));
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-editor-FormulaControl', isError ? 'is-has-tooltip' : '', className)
    }, !simple && !isExpr && !this.hasDateShortcutkey(value) && !rendererSchema && React__default["default"].createElement(amis.InputBox, {
      className: "ae-editor-FormulaControl-input",
      value: this.inReplaceExpression(value),
      clearable: true,
      placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : i18nRuntime.i18n("e0c7ac5eb397512fdbe71600baa09dab"),
      onChange: this.handleSimpleInputChange
    }), !simple && !isExpr && !this.hasDateShortcutkey(value) && rendererSchema && React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-editor-FormulaControl-custom-renderer', rendererWrapper ? 'border-wrapper' : '')
    }, render('inner', this.filterCustomRendererProps(rendererSchema), {
      inputOnly: true,
      value: this.inReplaceExpression(value),
      data: useExternalFormData ? tslib.__assign({}, this.props.data) : {},
      onChange: this.handleSimpleInputChange,
      manager: manager
    })), isFx && React__default["default"].createElement(amis.TooltipWrapper, {
      trigger: "hover",
      placement: "top",
      style: {
        fontSize: '12px'
      },
      tooltip: {
        tooltipTheme: 'dark',
        mouseLeaveDelay: 20,
        content: exprValue,
        children: function () {
          return _this.renderFormulaValue(highlightValue);
        }
      }
    }, React__default["default"].createElement("div", {
      className: "ae-editor-FormulaControl-tooltipBox"
    }, React__default["default"].createElement(amis.ResultBox, {
      className: cx__default["default"]('ae-editor-FormulaControl-ResultBox', isError ? 'is-error' : ''),
      allowInput: false,
      clearable: true,
      value: value,
      result: {
        html: this.hasDateShortcutkey(value) ? i18nRuntime.i18n("48942ef507ea38d8ead03f8bfdffae5a") : i18nRuntime.i18n("0d9d899edb456e8806a99850e9c38212")
      },
      itemRender: this.renderFormulaValue,
      onChange: this.handleInputChange,
      onResultChange: function () {
        _this.handleInputChange(undefined);
      }
    }))), React__default["default"].createElement(amis.PickerContainer, {
      showTitle: false,
      bodyRender: function (_a) {
        var _b;
        _a.value;
          var onChange = _a.onChange;
        return React__default["default"].createElement(FormulaEditor.FormulaEditor, tslib.__assign({}, rest, {
          evalMode: true,
          variableMode: (_b = rest.variableMode) !== null && _b !== void 0 ? _b : _this.state.variableMode,
          variables: _this.state.variables,
          header: header || i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: filterValue,
          onChange: onChange,
          selfVariableName: selfName
        }));
      },
      value: value,
      onConfirm: this.handleConfirm,
      size: "md"
    }, function (_a) {
      var _b;
      var onClick = _a.onClick;
      return React__default["default"].createElement(amis.Button, {
        className: "ae-editor-FormulaControl-button",
        size: "sm",
        tooltip: {
          enterable: false,
          content: i18nRuntime.i18n("303efd5ba79e639001b4328cd266dddc"),
          placement: 'left',
          mouseLeaveDelay: 0
        },
        onClick: onClick
      }, React__default["default"].createElement(amis.Icon, {
        icon: "function",
        className: cx__default["default"]('ae-editor-FormulaControl-icon', 'icon', (_b = {}, _b['is-filled'] = !!isFx, _b))
      }));
    }), isError && React__default["default"].createElement("div", {
      className: "desc-msg error-msg"
    }, isLoop ? i18nRuntime.i18n("7d92f998d24da41b58db140b1864f773") : i18nRuntime.i18n("b5cc1cd60cd694f45142dc52a5bf53fc")));
  };
  FormulaControl.defaultProps = {
    simple: false,
    rendererWrapper: false,
    DateTimeType: exports.FormulaDateType.NotDate,
    requiredDataPropsVariables: false
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", Object)], FormulaControl.prototype, "outReplaceExpression", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", Object)], FormulaControl.prototype, "inReplaceExpression", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, String]), tslib.__metadata("design:returntype", Boolean)], FormulaControl.prototype, "isLoopExpression", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", Boolean)], FormulaControl.prototype, "isExpectType", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", Boolean)], FormulaControl.prototype, "hasDateShortcutkey", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], FormulaControl.prototype, "transExpr", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], FormulaControl.prototype, "handleConfirm", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], FormulaControl.prototype, "filterCustomRendererProps", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], FormulaControl.prototype, "renderFormulaValue", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], FormulaControl.prototype, "getContextData", null);
  return FormulaControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(FormulaControlRenderer, _super);
  function FormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FormulaControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-formulaControl'
  })], FormulaControlRenderer);
  return FormulaControlRenderer;
})(FormulaControl);

exports["default"] = FormulaControl;
