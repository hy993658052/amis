/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var DividerPlugin = /** @class */function (_super) {
  __extends(DividerPlugin, _super);
  function DividerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'divider';
    _this.$schema = '/schemas/DividerSchema.json';
    // 组件名称
    _this.name = i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-minus';
    _this.pluginIcon = 'divider-plugin';
    _this.description = i18n("bc43ae8e61f1ad4be2b0a9e70501e490");
    _this.scaffold = {
      type: 'divider'
    };
    _this.previewSchema = {
      type: 'divider',
      className: 'm-t-none m-b-none'
    };
    _this.panelTitle = i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.panelJustify = true;
    _this.panelBody = getSchemaTpl('tabs', [{
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), getSchemaTpl('layout:width:v2', {
        visibleOn: 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")'
      }), getSchemaTpl('className')]
    }, {
      title: i18n("33bf801796fd255b5f6147e33146669b"),
      body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
    }]);
    return _this;
  }
  DividerPlugin.scene = ['layout'];
  return DividerPlugin;
}(BasePlugin);
registerEditorPlugin(DividerPlugin);

export { DividerPlugin };
