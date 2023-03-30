/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 状态配置组件
 */
var StatusControl = /** @class */function (_super) {
  tslib.__extends(StatusControl, _super);
  function StatusControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = _this.initState();
    return _this;
  }
  StatusControl.prototype.initState = function () {
    var _a = this.props,
      _b = _a.data,
      ctx = _b === void 0 ? {} : _b,
      expressionName = _a.expressionName,
      name = _a.name,
      trueValue = _a.trueValue;
    var formData = {
      statusType: 1,
      expression: ''
    };
    if (ctx[expressionName] || ctx[expressionName] === '') {
      formData.statusType = 2;
      formData.expression = ctx[expressionName];
    }
    return {
      checked: ctx[name] == trueValue || typeof ctx[expressionName] === 'string',
      formData: formData
    };
  };
  StatusControl.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    return nextState.checked !== this.state.checked;
  };
  StatusControl.prototype.handleSwitch = function (value) {
    var _this = this;
    var _a = this.props,
      trueValue = _a.trueValue,
      falseValue = _a.falseValue;
    this.setState({
      checked: value == trueValue ? true : false
    }, function () {
      var _a;
      var _b = _this.props,
        onBulkChange = _b.onBulkChange,
        expressionName = _b.expressionName,
        name = _b.name;
      onBulkChange && onBulkChange((_a = {}, _a[name] = value == trueValue ? trueValue : falseValue, _a[expressionName] = undefined, _a));
    });
  };
  StatusControl.prototype.handleFormSubmit = function (values) {
    var _a;
    var _b = this.props,
      onBulkChange = _b.onBulkChange,
      name = _b.name,
      expressionName = _b.expressionName;
    var data = (_a = {}, _a[name] = undefined, _a[expressionName] = undefined, _a);
    this.setState({
      formData: values
    });
    switch (values.statusType) {
      case 1:
        data[name] = true;
        break;
      case 2:
        data[expressionName] = values.expression;
        break;
    }
    onBulkChange && onBulkChange(data);
  };
  StatusControl.prototype.render = function () {
    var _a = this.props,
      className = _a.className;
      _a.data;
      var trueValue = _a.trueValue,
      falseValue = _a.falseValue;
      _a.env;
    var checked = this.state.checked;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-StatusControl', className)
    }, React__default["default"].createElement("header", {
      className: cx__default["default"]('ae-StatusControl-switch')
    }, React__default["default"].createElement("div", null, React__default["default"].createElement(amis.Switch, {
      className: "ae-BaseSwitch",
      size: "md",
      trueValue: trueValue,
      falseValue: falseValue,
      checked: checked,
      onChange: this.handleSwitch
    }))), checked ? this.renderContent() : null);
  };
  StatusControl.prototype.renderContent = function () {
    var _a = this.props,
      render = _a.render,
      label = _a.label;
      _a.data;
      _a.name;
      _a.expressionName;
      var options = _a.options;
      _a.children;
      var messages = _a.messages;
    var formData = this.state.formData;
    return React__default["default"].createElement("div", {
      className: "ae-StatusControl-content"
    }, render('status-control-form', {
      type: 'form',
      title: '',
      panelClassName: 'border-none shadow-none mb-0',
      bodyClassName: 'p-none',
      actionsClassName: 'border-none mt-2.5',
      wrapperComponent: 'div',
      submitOnChange: true,
      autoFocus: true,
      formLazyChange: true,
      footerWrapClassName: 'hidden',
      preventEnterSubmit: true,
      messages: messages,
      mode: 'horizontal',
      horizontal: {
        justify: true,
        left: 3
      },
      body: [{
        type: 'select',
        label: i18nRuntime.i18n("69fbb2e5fc9eb3ba06096cbedbf5a622"),
        name: 'statusType',
        options: options || [{
          label: i18nRuntime.i18n("8baf21fa26d6d24b4faa872953275d8d"),
          value: 1
        }, {
          label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: 2
        }]
      }, {
        type: 'ae-expressionFormulaControl',
        evalMode: false,
        label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        name: 'expression',
        placeholder: "\u8BF7\u8F93\u5165".concat(label, "\u6761\u4EF6"),
        visibleOn: 'this.statusType === 2',
        onChange: function (value) {}
      }]
    }, {
      data: formData,
      onSubmit: this.handleFormSubmit
    }));
  };
  StatusControl.defaultProps = {
    trueValue: true,
    falseValue: false
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Boolean]), tslib.__metadata("design:returntype", void 0)], StatusControl.prototype, "handleSwitch", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], StatusControl.prototype, "handleFormSubmit", null);
  return StatusControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(StatusControlRenderer, _super);
  function StatusControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  StatusControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-statusControl'
  })], StatusControlRenderer);
  return StatusControlRenderer;
})(StatusControl);

exports.StatusControl = StatusControl;
