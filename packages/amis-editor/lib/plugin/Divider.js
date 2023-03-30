/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var DividerPlugin = /** @class */function (_super) {
  tslib.__extends(DividerPlugin, _super);
  function DividerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'divider';
    _this.$schema = '/schemas/DividerSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-minus';
    _this.pluginIcon = 'divider-plugin';
    _this.description = i18nRuntime.i18n("bc43ae8e61f1ad4be2b0a9e70501e490");
    _this.scaffold = {
      type: 'divider'
    };
    _this.previewSchema = {
      type: 'divider',
      className: 'm-t-none m-b-none'
    };
    _this.panelTitle = i18nRuntime.i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.panelJustify = true;
    _this.panelBody = amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), amisEditorCore.getSchemaTpl('layout:width:v2', {
        visibleOn: 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")'
      }), amisEditorCore.getSchemaTpl('className')]
    }, {
      title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
      body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
    }]);
    return _this;
  }
  DividerPlugin.scene = ['layout'];
  return DividerPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(DividerPlugin);

exports.DividerPlugin = DividerPlugin;
