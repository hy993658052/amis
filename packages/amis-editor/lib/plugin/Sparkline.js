/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

/**
 * @file 走势图
 */
var SparklinePlugin = /** @class */function (_super) {
  tslib.__extends(SparklinePlugin, _super);
  function SparklinePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'sparkline';
    _this.$schema = '/schemas/SparklineSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("29326bcd28fb39bd41e54242fa532c85");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("270301455c3de762a7e2b145dac7a8b4");
    _this.docLink = '/amis/zh-CN/components/sparkline';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-area-chart';
    _this.pluginIcon = 'sparkline-plugin';
    _this.scaffold = {
      type: 'sparkline',
      height: 30,
      value: [3, 5, 2, 4, 1, 8, 3, 7]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("29326bcd28fb39bd41e54242fa532c85");
    _this.panelBody = [amisEditorCore.getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), {
      name: 'height',
      type: 'input-number',
      label: i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c")
    }];
    return _this;
  }
  return SparklinePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SparklinePlugin);

exports.SparklinePlugin = SparklinePlugin;
