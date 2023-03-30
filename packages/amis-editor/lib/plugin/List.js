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

var ListPlugin = /** @class */function (_super) {
  tslib.__extends(ListPlugin, _super);
  function ListPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'list';
    _this.$schema = '/schemas/ListSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("9f556fb46ecef854282d17e631578b1c");
    _this.docLink = '/amis/zh-CN/components/list';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-list';
    _this.pluginIcon = 'list-plugin';
    _this.scaffold = {
      type: 'list',
      listItem: {
        body: [{
          type: 'tpl',
          tpl: i18nRuntime.i18n("3bb4d608c6bee2b7b6d788417cde04e3"),
          wrapperComponent: ''
        }],
        actions: [{
          icon: 'fa fa-eye',
          type: 'button'
        }]
      }
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      items: [{
        a: 1,
        b: 2
      }, {
        a: 3,
        b: 4
      }, {
        a: 5,
        b: 6
      }]
    });
    _this.panelTitle = i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isCRUDBody = context.schema.type === 'crud';
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            children: React__default["default"].createElement(amis.Button, {
              level: "primary",
              size: "sm",
              block: true,
              onClick: _this.editDetail.bind(_this, context.id)
            }, "\u914D\u7F6E\u6210\u5458\u8BE6\u60C5")
          }, {
            type: 'divider'
          }, {
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, isCRUDBody ? null : {
            name: 'source',
            type: 'input-text',
            label: i18nRuntime.i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
            pipeIn: amisEditorCore.defaultValue('${items}'),
            description: i18nRuntime.i18n("7ea26d0cb93e59339daf6a1ac68624f3")
          }, {
            name: 'placeholder',
            pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("1ac0e1626be43287983fe3e5559320eb")),
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18nRuntime.i18n("35ba83e053cef95e55dfffde279822b5")
          }, {
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            label: i18nRuntime.i18n("86aafaa75b388deb4a4cbdab2293c099"),
            name: 'showHeader',
            form: {
              body: [{
                children: React__default["default"].createElement(amis.Button, {
                  level: "primary",
                  size: "sm",
                  block: true,
                  onClick: _this.editHeaderDetail.bind(_this, context.id)
                }, "\u914D\u7F6E\u5934\u90E8")
              }]
            }
          }, {
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            label: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187"),
            name: 'showFooter',
            form: {
              body: [{
                children: React__default["default"].createElement(amis.Button, {
                  level: "primary",
                  size: "sm",
                  block: true,
                  onClick: _this.editFooterDetail.bind(_this, context.id)
                }, "\u914D\u7F6E\u5E95\u90E8")
              }]
            }
          }]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5e5d3f13111593b2710673006d4c8297")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'itemClassName',
            label: 'ListItem'
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18nRuntime.i18n("86aafaa75b388deb4a4cbdab2293c099")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'footerClassName',
            label: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187")
          })]
        }])
      }]);
    };
    return _this;
  }
  ListPlugin.prototype.filterProps = function (props) {
    if (props.isSlot) {
      props.value = [props.data];
      return props;
    }
    var data = tslib.__assign(tslib.__assign({}, props.defaultData), props.data);
    var arr = Array.isArray(props.value) ? props.value : typeof props.source === 'string' ? amis.resolveVariable(props.source, data) : amis.resolveVariable('items', data);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData = this.buildMockData();
      props.value = amisEditorCore.repeatArray(mockedData, 1).map(function (item, index) {
        return tslib.__assign(tslib.__assign({}, item), {
          id: index + 1
        });
      });
    }
    var $schema = props.$schema,
      rest = tslib.__rest(props, ["$schema"]);
    return tslib.__assign(tslib.__assign({}, amisEditorCore.JSONPipeOut(rest)), {
      $schema: $schema
    });
  };
  ListPlugin.prototype.buildMockData = function () {
    return {
      id: 666,
      title: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      description: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      a: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      b: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3")
    };
  };
  ListPlugin.prototype.editHeaderDetail = function (id) {
    var _a;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultHeader = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("86aafaa75b388deb4a4cbdab2293c099"),
      wrapperComponent: ''
    };
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("e6aa1b827415217c524ae9d9b665cca5"),
      value: (_a = value.header) !== null && _a !== void 0 ? _a : defaultHeader,
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          header: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  ListPlugin.prototype.editFooterDetail = function (id) {
    var _a;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultFooter = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187"),
      wrapperComponent: ''
    };
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("a2ecfd5a0db9c855f59eea75083678e6"),
      value: (_a = value.footer) !== null && _a !== void 0 ? _a : defaultFooter,
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          footer: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  ListPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("84c04f1e9ce6a6a228228dd3fb96b99e"),
      value: tslib.__assign({}, value.listItem),
      slot: {
        type: 'list',
        listItem: '$$'
      },
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          listItem: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      },
      data: {
        // TODO  默认数据不对
        items: [this.buildMockData()]
      }
    });
  };
  ListPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info,
      schema = _a.schema;
    if (info.renderer.name === 'list' || info.renderer.name === 'crud' && schema.mode === 'list') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  ListPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id,
      schema = _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'list' || info.renderer.name === 'crud' && schema.mode === 'list') {
      menus.push('|', {
        label: i18nRuntime.i18n("84c04f1e9ce6a6a228228dd3fb96b99e"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  // 为了能够自动注入数据。
  ListPlugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (!schema.$$id && ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' && renderer.name === 'list') {
      return tslib.__assign(tslib.__assign({}, {
        id: schema.$$editor.id
      }), {
        name: plugin.name,
        regions: plugin.regions,
        patchContainers: plugin.patchContainers,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer
      });
    }
    return _super.prototype.getRendererInfo.call(this, context);
  };
  ListPlugin.scene = ['layout'];
  return ListPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ListPlugin);

exports.ListPlugin = ListPlugin;
