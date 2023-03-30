/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var DatePlugin = /** @class */function (_super) {
  tslib.__extends(DatePlugin, _super);
  function DatePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'date';
    _this.$schema = '/schemas/DateSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("356b1959a9da95997b4de31415d9d74e");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("2bc6d101e5701a70f2fb9e0b67581594");
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'date-plugin';
    _this.scaffold = {
      type: 'date',
      value: Math.round(Date.now() / 1000)
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      format: 'YYYY-MM-DD',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelTitle = i18nRuntime.i18n("356b1959a9da95997b4de31415d9d74e");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-date',
            name: 'value',
            label: i18nRuntime.i18n("a2344febfc246ddc7281f62217ba42c0")
          }, {
            type: 'input-text',
            name: 'format',
            label: i18nRuntime.i18n("84ff80a2dc4717cc01acd486040a6763"),
            description: i18nRuntime.i18n("6eea1b15be458a6999c9259aa2280a70"),
            pipeIn: amisEditorCore.defaultValue('YYYY-MM-DD')
          }, {
            type: 'input-text',
            name: 'valueFormat',
            label: i18nRuntime.i18n("a7032449ae8761aea61cc30e32d3be10"),
            description: i18nRuntime.i18n("6eea1b15be458a6999c9259aa2280a70"),
            pipeIn: amisEditorCore.defaultValue('X')
          }, amisEditorCore.getSchemaTpl('placeholder', {
            pipeIn: amisEditorCore.defaultValue('-'),
            label: i18nRuntime.i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, amisEditorCore.getSchemaTpl('onlyClassNameTab')])];
    };
    return _this;
  }
  DatePlugin.scene = ['layout'];
  return DatePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(DatePlugin);

exports.DatePlugin = DatePlugin;
