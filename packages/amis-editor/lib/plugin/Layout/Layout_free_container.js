/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var Container = require('../Container.js');
var i18nRuntime = require('i18n-runtime');

var Layout_free_container = /** @class */function (_super) {
  tslib.__extends(Layout_free_container, _super);
  function Layout_free_container() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'layout-free-container';
    _this.description = i18nRuntime.i18n("9ccbfde404798593fa6fdeac9dbef200");
    _this.order = -1;
    _this.tags = [i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825")];
    _this.scaffold = {
      type: 'container',
      isFreeContainer: true,
      size: 'xs',
      body: [],
      wrapperBody: false,
      style: {
        position: 'relative',
        minHeight: '200px'
      }
    };
    _this.panelTitle = i18nRuntime.i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    return _this;
  }
  return Layout_free_container;
}(Container.ContainerPlugin);
amisEditorCore.registerEditorPlugin(Layout_free_container);

exports["default"] = Layout_free_container;
