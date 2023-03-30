/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var cx = require('classnames');
var amis = require('amis');
var FormulaEditor = require('amis-ui/lib/components/formula/Editor');
var utils = require('./textarea-formula/utils.js');
var mobx = require('mobx');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 表达式输入框组件
 */
var ExpressionFormulaControl = /** @class */function (_super) {
  tslib.__extends(ExpressionFormulaControl, _super);
  function ExpressionFormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      variables: [],
      formulaPickerValue: ''
    };
    return _this;
  }
  ExpressionFormulaControl.prototype.componentDidMount = function () {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var editorStore, variablesArr;
      var _this = this;
      return tslib.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.initFormulaPickerValue(this.props.value);
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

  ExpressionFormulaControl.prototype.componentDidUpdate = function (prevProps) {
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
            if (prevProps.value !== this.props.value) {
              this.initFormulaPickerValue(this.props.value);
            }
            return [2 /*return*/];
        }
      });
    });
  };

  ExpressionFormulaControl.prototype.componentWillUnmount = function () {
    var _a;
    this.isUnmount = true;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  ExpressionFormulaControl.prototype.initFormulaPickerValue = function (value) {
    var formulaPickerValue = value;
    if (this.props.evalMode) {
      formulaPickerValue = (value === null || value === void 0 ? void 0 : value.replace(/^\$\{(.*)\}$/, function (match, p1) {
        return p1;
      })) || '';
    }
    this.setState({
      formulaPickerValue: formulaPickerValue
    });
  };
  ExpressionFormulaControl.prototype.renderFormulaValue = function (item) {
    var html = {
      __html: item.html
    };
    // bca-disable-next-line
    return React__default["default"].createElement("span", {
      dangerouslySetInnerHTML: html
    });
  };
  ExpressionFormulaControl.prototype.handleConfirm = function (value) {
    var _a, _b;
    if (value === void 0) {
      value = '';
    }
    if (this.props.evalMode) {
      value = value.replace(/^\$\{(.*)\}$/, function (match, p1) {
        return p1;
      });
      value = value ? "${".concat(value, "}") : '';
    }
    (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  ExpressionFormulaControl.prototype.handleClearExpression = function (e) {
    var _a, _b;
    e.stopPropagation();
    e.preventDefault();
    (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, '');
  };
  ExpressionFormulaControl.prototype.render = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      value = _c.value,
      className = _c.className,
      variableMode = _c.variableMode,
      header = _c.header,
      rest = tslib.__rest(_c, ["value", "className", "variableMode", "header"]);
    var _d = this.state,
      formulaPickerValue = _d.formulaPickerValue,
      variables = _d.variables;
    var highlightValue = FormulaEditor.FormulaEditor.highlightValue(formulaPickerValue, variables) || {
      html: formulaPickerValue
    };
    // 自身字段
    var selfName = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ExpressionFormulaControl', className)
    }, React__default["default"].createElement(amis.PickerContainer, {
      showTitle: false,
      bodyRender: function (_a) {
        _a.value;
          var onChange = _a.onChange;
        return React__default["default"].createElement(FormulaEditor.FormulaEditor, tslib.__assign({}, rest, {
          evalMode: true,
          variableMode: variableMode,
          variables: variables,
          header: header || i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: formulaPickerValue,
          onChange: onChange,
          selfVariableName: selfName
        }));
      },
      value: formulaPickerValue,
      onConfirm: this.handleConfirm,
      size: "md"
    }, function (_a) {
      var onClick = _a.onClick;
      return formulaPickerValue ? React__default["default"].createElement(amis.Button, {
        className: "btn-configured",
        tooltip: {
          placement: 'top',
          tooltipTheme: 'dark',
          mouseLeaveDelay: 20,
          content: value,
          tooltipClassName: 'btn-configured-tooltip',
          children: function () {
            return _this.renderFormulaValue(highlightValue);
          }
        },
        onClick: onClick
      }, "\u5DF2\u914D\u7F6E\u8868\u8FBE\u5F0F", React__default["default"].createElement(amis.Icon, {
        icon: "input-clear",
        className: "icon",
        onClick: _this.handleClearExpression
      })) : React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(amis.Button, {
        className: "btn-set-expression",
        onClick: onClick
      }, "\u70B9\u51FB\u7F16\u5199\u8868\u8FBE\u5F0F"));
    }));
  };
  ExpressionFormulaControl.defaultProps = {
    variableMode: 'tabs',
    requiredDataPropsVariables: false,
    evalMode: true
  };
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "initFormulaPickerValue", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "renderFormulaValue", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "handleConfirm", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "handleClearExpression", null);
  return ExpressionFormulaControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(ExpressionFormulaControlRenderer, _super);
  function ExpressionFormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ExpressionFormulaControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-expressionFormulaControl'
  })], ExpressionFormulaControlRenderer);
  return ExpressionFormulaControlRenderer;
})(ExpressionFormulaControl);

exports["default"] = ExpressionFormulaControl;
