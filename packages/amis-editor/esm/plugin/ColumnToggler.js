/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var ColumnToggler = /** @class */function (_super) {
  __extends(ColumnToggler, _super);
  function ColumnToggler() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'column-toggler';
    _this.$schema = '/schemas/ColumnToggler.json';
    // 组件名称
    _this.name = i18n("2816cea6c4887a53c417831deb5fbe00");
    _this.isBaseComponent = true;
    _this.disabledRendererPlugin = true;
    _this.description = i18n("a955021cdf0249de1f3818f83cf248b7");
    _this.tags = [i18n("2816cea6c4887a53c417831deb5fbe00")];
    _this.icon = 'fa fa-square';
    _this.panelTitle = i18n("2816cea6c4887a53c417831deb5fbe00");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            label: i18n("24bdc7e8957abfc5d82f4206e92bb518"),
            type: 'input-text',
            name: 'label'
          }, {
            label: i18n("787366b0d678071a5ed98e55d31eba84"),
            type: 'input-text',
            name: 'tooltip'
          }, getSchemaTpl('switch', {
            name: 'defaultIsOpened',
            label: i18n("6a0508144ae12bfa79001693d713c0d6")
          }), getSchemaTpl('icon', {
            label: i18n("ae3816c5b00fcff4111842ac19f0a706")
          })]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('size', {
            label: i18n("fe805d91ae93be775670c61214dd2f28")
          })]
        }, {
          title: i18n("4434b33a8731a73613ba5fa1eb984efb"),
          body: [getSchemaTpl('className', {
            name: 'className',
            label: i18n("fbbbe30d78c335bad27f3dfc5efd2a5d")
          }), getSchemaTpl('className', {
            name: 'btnClassName',
            label: i18n("ac3880323853de9adc4f66bc06d438ff")
          })]
        }])
      }]);
    };
    return _this;
  }
  /**
   * 如果禁用了没办法编辑
   */
  ColumnToggler.prototype.filterProps = function (props) {
    props.disabled = false;
    return props;
  };
  /**
   * 如果配置里面有 rendererName 自动返回渲染器信息。
   * @param renderer
   */
  ColumnToggler.prototype.getRendererInfo = function (_a) {
    var renderer = _a.renderer,
      schema = _a.schema;
    var plugin = this;
    if (schema.$$id && plugin.name && plugin.rendererName && plugin.rendererName === renderer.name) {
      // 复制部分信息出去
      return {
        name: schema.label ? schema.label : plugin.name,
        regions: plugin.regions,
        patchContainers: plugin.patchContainers,
        // wrapper: plugin.wrapper,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer
      };
    }
  };
  return ColumnToggler;
}(BasePlugin);
registerEditorPlugin(ColumnToggler);

export { ColumnToggler };
