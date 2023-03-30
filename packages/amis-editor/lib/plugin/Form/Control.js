/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../../component/BaseControl.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ControlPlugin = /** @class */function (_super) {
  tslib.__extends(ControlPlugin, _super);
  function ControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'control';
    _this.$schema = '/schemas/FormControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("61260d9386fd95a268dfc93d977c2706");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-object-group';
    _this.pluginIcon = 'form-group-plugin';
    _this.description = i18nRuntime.i18n("61260d9386fd95a268dfc93d977c2706");
    _this.docLink = '/amis/zh-CN/components/form/group';
    _this.tags = [i18nRuntime.i18n("22c799040acdb2601b437ed5449de076")];
    /**
     * 组件选择面板中隐藏，和Container合并
     */
    _this.disabledRendererPlugin = true;
    _this.scaffold = {
      type: 'control',
      label: i18nRuntime.i18n("61260d9386fd95a268dfc93d977c2706"),
      body: [{
        type: 'tpl',
        wrapperComponent: '',
        tpl: 'a'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    // 容器配置
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("c5739a29e7c403fc212608cefe70cf29"),
      preferTag: i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")
    }];
    _this.panelTitle = i18nRuntime.i18n("61260d9386fd95a268dfc93d977c2706");
    _this.panelBodyCreator = function (context) {
      return BaseControl.formItemControl({
        common: {
          replace: true,
          body: [{
            children: React__default["default"].createElement(amis.Button, {
              className: "m-b",
              onClick: function () {
                return _this.manager.showRendererPanel(i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85"));
              },
              level: "danger",
              tooltip: "\u63D2\u5165\u4E00\u4E2A\u65B0\u7684\u5143\u7D20",
              size: "sm",
              block: true
            }, "\u65B0\u589E\u5143\u7D20")
          }, amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description')]
        }
      });
    };
    return _this;
  }
  return ControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ControlPlugin);

exports.ControlPlugin = ControlPlugin;
