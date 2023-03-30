/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __rest, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { Icon, FormItem } from 'amis';
import { autobind } from 'amis-core';
import CodeMirrorEditor from 'amis-ui/lib/components/CodeMirror';
import { editorFactory, FormulaPlugin } from './plugin.js';
import FormulaPicker from './FormulaPicker.js';
import debounce from 'lodash/debounce';
import { getVariables } from './utils.js';
import { reaction } from 'mobx';
import { i18n } from 'i18n-runtime';

/**
 * @file 长文本公式输入框
 */
var TextareaFormulaControl = /** @class */function (_super) {
  __extends(TextareaFormulaControl, _super);
  function TextareaFormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.handleOnChange = debounce(function (value) {
      var _a, _b;
      (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }, 200);
    _this.state = {
      value: '',
      variables: [],
      formulaPickerOpen: false,
      formulaPickerValue: '',
      isFullscreen: false
    };
    return _this;
  }
  TextareaFormulaControl.prototype.componentDidMount = function () {
    return __awaiter(this, void 0, void 0, function () {
      var editorStore, variablesArr;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            editorStore = window.editorStore;
            this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
            this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
            this.unReaction = reaction(function () {
              return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
            }, function () {
              return __awaiter(_this, void 0, void 0, function () {
                var variablesArr;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                      this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                      return [4 /*yield*/, getVariables(this)];
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

            return [4 /*yield*/, getVariables(this)];
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

  TextareaFormulaControl.prototype.componentDidUpdate = function (prevProps) {
    return __awaiter(this, void 0, void 0, function () {
      var variablesArr;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.props.data !== prevProps.data)) return [3 /*break*/, 2];
            return [4 /*yield*/, getVariables(this)];
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

  TextareaFormulaControl.prototype.componentWillUnmount = function () {
    var _a;
    this.isUnmount = true;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  TextareaFormulaControl.prototype.onExpressionClick = function (expression, brace) {
    this.setState({
      formulaPickerValue: expression,
      formulaPickerOpen: true,
      expressionBrace: brace
    });
  };
  TextareaFormulaControl.prototype.closeFormulaPicker = function () {
    this.setState({
      formulaPickerOpen: false
    });
  };
  TextareaFormulaControl.prototype.handleConfirm = function (value) {
    var _a;
    var expressionBrace = this.state.expressionBrace;
    // 去除可能包裹的最外层的${}
    value = value.replace(/^\$\{(.*)\}$/, function (match, p1) {
      return p1;
    });
    value = value ? "${".concat(value, "}") : value;
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.insertContent(value, 'expression', expressionBrace);
    this.setState({
      formulaPickerOpen: false,
      expressionBrace: undefined
    });
    this.closeFormulaPicker();
  };
  TextareaFormulaControl.prototype.editorFactory = function (dom, cm) {
    var variables = this.props.variables || this.state.variables;
    return editorFactory(dom, cm, __assign(__assign({}, this.props), {
      variables: variables
    }));
  };
  TextareaFormulaControl.prototype.handleEditorMounted = function (cm, editor) {
    var _this = this;
    var variables = this.props.variables || this.state.variables;
    this.editorPlugin = new FormulaPlugin(editor, cm, function () {
      return __assign(__assign({}, _this.props), {
        variables: variables
      });
    }, this.onExpressionClick);
  };
  TextareaFormulaControl.prototype.handleFullscreenModeChange = function () {
    if (this.props.onOverallClick) {
      return;
    }
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };
  TextareaFormulaControl.prototype.handleFormulaClick = function () {
    if (this.props.onOverallClick) {
      return;
    }
    this.setState({
      formulaPickerOpen: true,
      formulaPickerValue: '',
      expressionBrace: undefined
    });
  };
  TextareaFormulaControl.prototype.editorAutoMark = function () {
    var _a;
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.autoMark();
  };
  TextareaFormulaControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className;
      _a.header;
      _a.label;
      _a.placeholder;
      var height = _a.height,
      additionalMenus = _a.additionalMenus,
      onOverallClick = _a.onOverallClick,
      customFormulaPicker = _a.customFormulaPicker,
      rest = __rest(_a, ["className", "header", "label", "placeholder", "height", "additionalMenus", "onOverallClick", "customFormulaPicker"]);
    var _b = this.state,
      value = _b.value,
      formulaPickerOpen = _b.formulaPickerOpen,
      formulaPickerValue = _b.formulaPickerValue,
      isFullscreen = _b.isFullscreen,
      variables = _b.variables;
    var FormulaPickerCmp = customFormulaPicker !== null && customFormulaPicker !== void 0 ? customFormulaPicker : FormulaPicker;
    // 输入框样式
    var resultBoxStyle = {};
    if (height) {
      resultBoxStyle.height = "".concat(height, "px");
    }
    return React__default.createElement("div", {
      className: cx('ae-TextareaFormulaControl', {
        'is-fullscreen': this.state.isFullscreen
      }, className)
    }, React__default.createElement("div", {
      className: cx('ae-TextareaResultBox'),
      style: resultBoxStyle
    }, React__default.createElement(CodeMirrorEditor, {
      className: "ae-TextareaResultBox-editor",
      value: value,
      onChange: this.handleOnChange,
      editorFactory: this.editorFactory,
      editorDidMount: this.handleEditorMounted,
      onBlur: this.editorAutoMark
    }), React__default.createElement("ul", {
      className: "ae-TextareaResultBox-footer"
    }, React__default.createElement("li", {
      className: "ae-TextareaResultBox-footer-fullscreen"
    }, React__default.createElement("a", {
      className: cx('Modal-fullscreen'),
      "data-tooltip": isFullscreen ? i18n("49041f245018a6d799fee3c6f177c782") : i18n("185926bf986c784d03a9a73102da6542"),
      "data-position": "top",
      onClick: this.handleFullscreenModeChange
    }, React__default.createElement(Icon, {
      icon: isFullscreen ? 'compress-alt' : 'expand-alt',
      className: "icon"
    }))), React__default.createElement("li", {
      className: "ae-TextareaResultBox-footer-fxIcon"
    }, React__default.createElement("a", {
      "data-tooltip": "\u8868\u8FBE\u5F0F",
      "data-position": "top",
      onClick: this.handleFormulaClick
    }, React__default.createElement(Icon, {
      icon: "function",
      className: "icon"
    }))), (additionalMenus === null || additionalMenus === void 0 ? void 0 : additionalMenus.length) && (additionalMenus === null || additionalMenus === void 0 ? void 0 : additionalMenus.map(function (item, i) {
      return React__default.createElement("li", {
        key: i,
        className: (item === null || item === void 0 ? void 0 : item.className) || ''
      }, item.icon ? React__default.createElement("a", {
        "data-tooltip": item.label,
        "data-position": "top",
        onClick: function () {
          return item.onClick();
        }
      }, React__default.createElement(Icon, {
        icon: item.icon,
        className: "icon"
      })) : React__default.createElement("a", {
        onClick: function () {
          return item === null || item === void 0 ? void 0 : item.onClick();
        }
      }, item.label));
    })))), !!onOverallClick ? React__default.createElement("div", {
      className: cx('ae-TextareaResultBox-overlay'),
      onClick: onOverallClick
    }) : null, formulaPickerOpen ? React__default.createElement(FormulaPickerCmp, __assign({}, this.props, {
      value: formulaPickerValue,
      initable: true,
      variables: variables,
      variableMode: rest.variableMode,
      evalMode: true,
      onClose: function () {
        return _this.setState({
          formulaPickerOpen: false
        });
      },
      onConfirm: this.handleConfirm
    })) : null);
  };
  TextareaFormulaControl.defaultProps = {
    variableMode: 'tabs',
    requiredDataPropsVariables: false,
    height: 100
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Array]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "onExpressionClick", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "closeFormulaPicker", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleConfirm", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [HTMLElement, Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "editorFactory", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleEditorMounted", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleFullscreenModeChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleFormulaClick", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "editorAutoMark", null);
  return TextareaFormulaControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(TextareaFormulaControlRenderer, _super);
  function TextareaFormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TextareaFormulaControlRenderer = __decorate([FormItem({
    type: 'ae-textareaFormulaControl'
  })], TextareaFormulaControlRenderer);
  return TextareaFormulaControlRenderer;
})(TextareaFormulaControl);

export { TextareaFormulaControl };
