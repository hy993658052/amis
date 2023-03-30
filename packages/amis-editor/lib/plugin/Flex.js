/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var FlexPluginBase = require('./Layout/FlexPluginBase.js');
var i18nRuntime = require('i18n-runtime');

var FlexPlugin = /** @class */function (_super) {
  tslib.__extends(FlexPlugin, _super);
  function FlexPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc");
    _this.pluginIcon = 'flex-container-plugin';
    _this.description = i18nRuntime.i18n("2794fe303cf8ad4395fe93271fae7925");
    return _this;
  }
  FlexPlugin.scene = ['layout'];
  return FlexPlugin;
}(FlexPluginBase.FlexPluginBase);
amisEditorCore.registerEditorPlugin(FlexPlugin);

exports.FlexPlugin = FlexPlugin;
