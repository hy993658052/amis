/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, registerEditorPlugin } from 'amis-editor-core';
import { DatePlugin } from './Date.js';
import { i18n } from 'i18n-runtime';

var TimePlugin = /** @class */function (_super) {
  __extends(TimePlugin, _super);
  function TimePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'time';
    _this.name = i18n("7ac24322bc8eeac88db6823942423ac3");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'time-plugin';
    _this.scaffold = {
      type: 'time',
      value: Math.round(Date.now() / 1000),
      format: 'HH:mm:ss'
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      format: 'HH:mm:ss',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-time',
            name: 'value',
            inputFormat: 'HH:mm:ss',
            timeFormat: 'HH:mm:ss',
            label: i18n("82315a0cd63e7f81233ad804e0d02deb")
          }, {
            type: 'input-text',
            name: 'format',
            label: i18n("a389ce9c52a94bbdd5c7fa84af85348c"),
            description: i18n("6eea1b15be458a6999c9259aa2280a70"),
            pipeIn: defaultValue('HH:mm:ss')
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
  return TimePlugin;
}(DatePlugin);
registerEditorPlugin(TimePlugin);

export { TimePlugin };
