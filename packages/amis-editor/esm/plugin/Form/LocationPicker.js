/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var LocationControlPlugin = /** @class */function (_super) {
  __extends(LocationControlPlugin, _super);
  function LocationControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'location-picker';
    _this.$schema = '/schemas/LocationControlSchema.json';
    // 组件名称
    _this.name = i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-location-arrow';
    _this.pluginIcon = 'location-picker-plugin';
    _this.description = i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.docLink = '/amis/zh-CN/components/form/location-picker';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'location-picker',
      name: 'location',
      label: i18n("989ea9acbab9b17d2c15e2946b5365bb")
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), getSchemaTpl('clearable'), {
        type: 'input-text',
        name: 'ak',
        label: i18n("dffd9d86d2003615897b12ce7597d77b"),
        description: i18n("a269e7de6c7735290733eb3e574c2129")
      }, {
        type: 'select',
        name: 'coordinatesType',
        label: i18n("b472ba224a7d132c487ee6ec4798f835"),
        value: 'bd09',
        options: [{
          label: i18n("36443b53c845b197db8d39eeda433ab9"),
          value: 'bd09'
        }, {
          label: i18n("f58cb611aec0998a44ef104b5c950b40"),
          value: 'gcj02'
        }]
      }
      /* 备注: 暂时不开放
      getSchemaTpl('valueFormula', {
        rendererSchema: context?.schema,
      }),
      */];
    };

    return _this;
  }
  return LocationControlPlugin;
}(BasePlugin);
registerEditorPlugin(LocationControlPlugin);

export { LocationControlPlugin };
