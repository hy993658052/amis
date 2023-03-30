/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, registerEditorPlugin } from 'amis-editor-core';
import { DatePlugin } from './Date.js';
import { i18n } from 'i18n-runtime';

var DatetimePlugin = /** @class */function (_super) {
  __extends(DatetimePlugin, _super);
  function DatetimePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'datetime';
    _this.scaffold = {
      type: 'datetime',
      value: Math.round(Date.now() / 1000)
    };
    _this.name = i18n("b54e0f0a60f8e2c4c31f3b1ad7d5a613");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'datetime-plugin';
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      format: 'YYYY-MM-DD HH:mm:ss',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-datetime',
            name: 'value',
            label: i18n("2a898869829eae8adcfca290fd34a67d")
          }, {
            type: 'input-text',
            name: 'format',
            label: i18n("b0d6f2d882adc2163e6a08a121d18677"),
            description: i18n("6eea1b15be458a6999c9259aa2280a70"),
            pipeIn: defaultValue('YYYY-MM-DD HH:mm:ss')
          }, {
            type: 'input-text',
            name: 'valueFormat',
            label: i18n("a7032449ae8761aea61cc30e32d3be10"),
            description: i18n("6eea1b15be458a6999c9259aa2280a70"),
            pipeIn: defaultValue('X')
          }, getSchemaTpl('placeholder', {
            pipeIn: defaultValue('-'),
            label: i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, getSchemaTpl('status')])
      }, getSchemaTpl('onlyClassNameTab')])];
    };
    return _this;
  }
  DatetimePlugin.scene = ['layout'];
  return DatetimePlugin;
}(DatePlugin);
registerEditorPlugin(DatetimePlugin);

export { DatetimePlugin };
