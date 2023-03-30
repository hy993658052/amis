/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var OperationPlugin = /** @class */function (_super) {
  tslib.__extends(OperationPlugin, _super);
  function OperationPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'operation';
    _this.$schema = '/schemas/OperationSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("8abc564260a1564521e0c3a1d5419b4a");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("8d79a8cbe0ed37accbe0739024d5d896");
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = '';
    _this.scaffold = {
      type: 'operation',
      label: i18nRuntime.i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
      buttons: [{
        label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
        type: 'button'
      }]
    };
    _this.previewSchema = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("8abc564260a1564521e0c3a1d5419b4a")
    };
    _this.regions = [{
      key: 'buttons',
      label: i18nRuntime.i18n("6c0fe599b36c2a55efd8705681783ee5"),
      renderMethod: 'render',
      insertPosition: 'inner',
      preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
    }];
    _this.panelTitle = i18nRuntime.i18n("8abc564260a1564521e0c3a1d5419b4a");
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('className', {
        name: 'innerClassName'
      }), {
        children: React__default["default"].createElement(amis.Button, {
          level: "info",
          size: "sm",
          className: "m-b-sm",
          block: true,
          onClick: function () {
            // this.manager.showInsertPanel('buttons', context.id, '按钮');
            _this.manager.showRendererPanel(i18nRuntime.i18n("fa966345577ba81af19408f203db968f"), i18nRuntime.i18n("975903dc39691813530e108986e49ac1"));
          }
        }, "\u6DFB\u52A0\u6309\u94AE")
      }];
    };
    return _this;
  }
  OperationPlugin.prototype.buildSubRenderers = function (context, renderers) {
    if (context && context.info && context.info.renderer && (context.info.renderer.name === 'table' || context.info.renderer.name === 'crud')) {
      return _super.prototype.buildSubRenderers.apply(this, arguments);
    }
  };
  return OperationPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(OperationPlugin);

exports.OperationPlugin = OperationPlugin;
