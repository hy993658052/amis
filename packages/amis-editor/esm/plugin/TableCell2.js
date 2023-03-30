/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { Button, Icon } from 'amis';
import React__default from 'react';
import { getVariable } from 'amis-core';
import { tipedLabel, getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { fromPairs } from 'lodash';
import { remarkTpl } from '../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var TableCell2Plugin = /** @class */function (_super) {
  __extends(TableCell2Plugin, _super);
  function TableCell2Plugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.panelTitle = i18n("dc7558211f2990370954c2e7ca498ee9");
    _this.panelIcon = 'fa fa-columns';
    return _this;
  }
  TableCell2Plugin.prototype.afterBuildPanelBody = function (event) {
    var _this = this;
    var _a, _b, _c;
    var _d = event.context,
      context = _d.context,
      data = _d.data;
    if (!((_b = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.type) || context.node.parent.parent.type !== 'table2') {
      return;
    }
    // @ts-ignore
    var base = [context.node.info.plugin.withDataSource === false ? false : {
      sameName: context.info.renderer.isFormItem ? 'name' : undefined,
      name: 'name',
      type: 'ae-DataBindingControl',
      label: i18n("4ca07911d10b74cc7c357b510e7cc948"),
      onBindingChange: function (field, onBulkChange) {
        var _a;
        var schema = ((_a = field === null || field === void 0 ? void 0 : field.resolveColumnSchema) === null || _a === void 0 ? void 0 : _a.call(field, 'List')) || {
          title: field.label
        };
        onBulkChange(schema);
      }
    }, {
      sameName: context.info.renderer.isFormItem ? 'label' : undefined,
      name: 'title',
      label: i18n("eb2719a7e6cebda7ca234560f21fb448"),
      type: 'input-text'
    }, remarkTpl({
      name: 'remark',
      label: i18n("3ba265c6b63bde0319822afd6b9a649d"),
      labelRemark: i18n("7ad83bbe4646a0011ece7fd338d1e189")
    }), {
      name: 'placeholder',
      type: 'input-text',
      label: tipedLabel(i18n("940b12c19fcf7aced0cdd164edc9acbc"), i18n("f35c90b504521a2da346960b9db23828")),
      value: '-'
    }].filter(Boolean);
    var advanced = [getSchemaTpl('switch', {
      name: 'sorter',
      label: tipedLabel(i18n("b4521626a48dcb61001fc563d2433ed3"), i18n("ac83dbca40c9d2151b5f7d81795535cc"))
    }), getSchemaTpl('switch', {
      name: 'searchable',
      label: i18n("af9cbd3988196fc104af4fed9461e152"),
      pipeIn: function (value) {
        return !!value;
      }
    }), {
      visibleOn: 'data.searchable',
      name: 'searchable',
      asFormItem: true,
      label: false,
      children: function (_a) {
        var value = _a.value,
          onChange = _a.onChange,
          data = _a.data;
        if (value === true) {
          value = {};
        } else if (typeof value === 'undefined') {
          value = getVariable(data, 'searchable');
        }
        var originMode = value.mode;
        value = __assign(__assign({}, value), {
          type: 'form',
          mode: 'normal',
          wrapWithPanel: false,
          body: [{
            type: 'input-text',
            name: data.key
          }]
        });
        delete value.mode;
        // todo 多个快速编辑表单模式看来只能代码模式编辑了。
        return React__default.createElement(Button, {
          className: "w-full flex flex-col items-center",
          onClick: function () {
            _this.manager.openSubEditor({
              title: i18n("34dceb7c51000849ea3596fbaab6f67c"),
              value: value,
              onChange: function (value) {
                return onChange(__assign(__assign({}, value), {
                  mode: originMode
                }), 'searchable');
              }
            });
          }
        }, React__default.createElement("span", {
          className: "inline-flex items-center"
        }, React__default.createElement(Icon, {
          icon: "edit",
          className: "mr-1 w-3"
        }), "\u914D\u7F6E\u5217\u641C\u7D22\u7C7B\u578B"));
      }
    }, {
      name: 'quickEdit',
      label: tipedLabel(i18n("9a899d9ab83d8ffa6308fb31e93f23a1"), i18n("9306b956ca5950203ee49a2680cac63d")),
      type: 'ae-switch-more',
      mode: 'normal',
      formType: 'extend',
      bulk: true,
      defaultData: {
        mode: 'popOver'
      },
      form: {
        body: [{
          name: 'quickEdit.mode',
          type: 'button-group-select',
          label: i18n("f0789e79d48f135e5d870753f7a85d05"),
          value: 'popOver',
          options: [{
            label: i18n("78f395c15aaf8c92d9223f6ca69b41a4"),
            value: 'popOver'
          }, {
            label: i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
            value: 'inline'
          }]
        }, getSchemaTpl('switch', {
          name: 'quickEdit.saveImmediately',
          label: tipedLabel(i18n("4562be5a3f9823a5f61b25f8d14b2b43"), i18n("c115f372bcdced1e70824bcbf42b5923")),
          pipeIn: function (value) {
            return !!value;
          }
        }), {
          name: 'quickEdit',
          asFormItem: true,
          label: false,
          children: function (_a) {
            var value = _a.value,
              onBulkChange = _a.onBulkChange,
              name = _a.name,
              data = _a.data;
            if (value === true) {
              value = {};
            } else if (typeof value === 'undefined') {
              value = getVariable(data, 'quickEdit');
            }
            var originMode = (value === null || value === void 0 ? void 0 : value.mode) || 'popOver';
            value = __assign(__assign({}, value), {
              type: 'form',
              mode: 'normal',
              wrapWithPanel: false,
              body: [{
                type: 'input-text',
                name: data.key
              }]
            });
            if (value.mode) {
              delete value.mode;
            }
            // todo 多个快速编辑表单模式看来只能代码模式编辑了。
            return React__default.createElement(Button, {
              className: "w-full flex flex-col items-center",
              onClick: function () {
                _this.manager.openSubEditor({
                  title: i18n("c3ed36e4abb96c18a6c83350994cdea7"),
                  value: value,
                  onChange: function (value) {
                    var _a;
                    return onBulkChange((_a = {}, _a[name] = __assign(__assign({}, value), {
                      mode: originMode
                    }), _a));
                  }
                });
              }
            }, React__default.createElement("span", {
              className: "inline-flex items-center"
            }, React__default.createElement(Icon, {
              icon: "edit",
              className: "mr-1 w-3"
            }), "\u914D\u7F6E\u7F16\u8F91\u8868\u5355"));
          }
        }]
      }
    }, {
      name: 'popOver',
      label: i18n("90ef7c485bd31fab681c6e9d9afd5be8"),
      type: 'ae-switch-more',
      mode: 'normal',
      formType: 'extend',
      bulk: true,
      form: {
        body: [{
          name: 'popOver.mode',
          label: i18n("f0789e79d48f135e5d870753f7a85d05"),
          type: 'button-group-select',
          pipeIn: defaultValue('popOver'),
          options: [{
            label: i18n("71c0319fce9f416330b18e554e0acc55"),
            value: 'popOver'
          }, {
            label: i18n("ab3aec075a09d055b2a28c8b61925ee0"),
            value: 'dialog'
          }, {
            label: i18n("2a2924380dfcaea998bd8a49703545a9"),
            value: 'drawer'
          }]
        }, {
          name: 'popOver.position',
          label: i18n("64035b04a21bc337a351b5a2a5d12acb"),
          type: 'select',
          visibleOn: 'data.popOver.mode === "popOver"',
          pipeIn: defaultValue('center'),
          options: [{
            label: i18n("68b54e7b408c4fb83561c931aa668eae"),
            value: 'center'
          }, {
            label: i18n("e18459c93769a5afec01e1ce60f9b9fd"),
            value: 'left-top'
          }, {
            label: i18n("1fc3cdd8437f5057774cde2f2c51f97c"),
            value: 'right-top'
          }, {
            label: i18n("63dd9faca92bccfd436ff21a6b4b3151"),
            value: 'left-bottom'
          }, {
            label: i18n("d01c239688b9c8fc145191ee642dc080"),
            value: 'right-bottom'
          }, {
            label: i18n("8fcf9802436282672a8e28ebd6262390"),
            value: 'fixed-left-top'
          }, {
            label: i18n("aed25160b4e8cfc613a743c4549e9222"),
            value: 'fixed-right-top'
          }, {
            label: i18n("d4a4ab1916187e09b9c037705fd49ffa"),
            value: 'fixed-left-bottom'
          }, {
            label: i18n("921fccbb84c829bf8c6f0b9957029f44"),
            value: 'fixed-right-bottom'
          }]
        }, {
          name: 'popOver',
          asFormItem: true,
          label: false,
          children: function (_a) {
            var value = _a.value,
              onBulkChange = _a.onBulkChange,
              name = _a.name;
            value = __assign({
              type: 'panel',
              title: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
              body: i18n("1d53f83df1d889a70131b7a93c819575")
            }, value);
            return React__default.createElement(Button, {
              className: "w-full flex flex-col items-center",
              onClick: function () {
                _this.manager.openSubEditor({
                  title: i18n("8dda45360dcf9ca501fd7d0eb53045b5"),
                  value: value,
                  onChange: function (value) {
                    var _a;
                    return onBulkChange((_a = {}, _a[name] = value, _a));
                  }
                });
              }
            }, React__default.createElement("span", {
              className: "inline-flex items-center"
            }, React__default.createElement(Icon, {
              icon: "edit",
              className: "mr-1 w-3"
            }), "\u914D\u7F6E\u5185\u5BB9"));
          }
        }]
      }
    }, {
      name: 'copyable',
      label: tipedLabel(i18n("6a086902a84969a835423002718e86b4"), i18n("622e14515c4fd5ca6fe6946e3a1bfb4a")),
      type: 'ae-switch-more',
      mode: 'normal',
      formType: 'extend',
      bulk: true,
      defaultData: {},
      form: {
        body: [{
          name: 'copyable.content',
          type: 'textarea',
          placehoder: i18n("ca60c525372028b9f75ee4c708cccae1"),
          label: i18n("ac04259507be8ba6b891dc9dc208f491")
        }]
      }
    }, {
      name: 'rowSpanExpr',
      type: 'ae-formulaControl',
      label: i18n("c9f7324519225bc72fce24a09518a8a8")
    }, {
      name: 'colSpanExpr',
      type: 'ae-formulaControl',
      label: i18n("9af45e91a08b54764610ada28272d590")
    }];
    var baseStyle = [getSchemaTpl('withUnit', {
      name: 'width',
      label: tipedLabel(i18n("bdd9d38d7e2929024089363dc8f48b7a"), i18n("b198805e7a6b35830ba813f51db2fdc4")),
      control: {
        name: 'width',
        type: 'input-number'
      },
      unit: 'px'
    }), {
      name: 'fixed',
      type: 'button-group-select',
      label: i18n("65f7e01d58cb5065f49e0e8f48cc16be"),
      pipeIn: defaultValue(''),
      pipeOut: function (value) {
        if (!value) {
          return undefined;
        }
        return value;
      },
      options: [{
        value: '',
        label: i18n("9ed8a4c5d1b3726121175dc986268b0c")
      }, {
        value: 'left',
        label: i18n("39a2cb79c6d9762783e20522ea86dcff")
      }, {
        value: 'right',
        label: i18n("de2a774bf98944b8f0ec8755d5f59d64")
      }]
    }, getSchemaTpl('switch', {
      name: 'toggled',
      label: i18n("ad96280bb24a38f9a83051b16ebc9688"),
      pipeIn: defaultValue(true)
    }), getSchemaTpl('switch', {
      name: 'className',
      label: i18n("eb58b078f2f8560160ebf87bc7109de9"),
      pipeIn: function (value) {
        return typeof value === 'string' && /\word\-break\b/.test(value);
      },
      pipeOut: function (value, originValue) {
        return (value ? 'word-break ' : '') + (originValue || '').replace(/\bword\-break\b/g, '').trim();
      }
    })];
    // 之前的面板，不是新的组件面板，需要添加新的tab，不能合并
    if (Array.isArray(data)) {
      if (data[0].type === 'tabs') {
        var body = data[0];
        body.tabs.forEach(function (tab) {
          var _a, _b;
          if (tab.title === i18n("22b777e6fcb613b8ba83ced9594cd07e")) {
            (_a = tab.body).unshift.apply(_a, __spreadArray([], __read(base.concat(advanced)), false));
          }
          if (tab.title === i18n("afcde2611bdd13c1e65b4fb6a2f13425")) {
            (_b = tab.body).unshift.apply(_b, __spreadArray([], __read(baseStyle), false));
          }
        });
      } else {
        console.error(i18n("f1f4c88f30744f2365b65f1790c71da8"));
      }
      return;
    }
    (_c = data.tabs) === null || _c === void 0 ? void 0 : _c.forEach(function (tab) {
      var _a, _b, _c, _d;
      if (tab.title === i18n("24d67862f87f439db7ca957aecb77cce")) {
        tab.body[0].body.forEach(function (collapse) {
          var _a;
          if (collapse.title === i18n("4092ed98e9035652d4c9ca9441701ed7")) {
            var appendItems_1 = fromPairs(base.map(function (item) {
              var _a;
              return [(_a = item.sameName) !== null && _a !== void 0 ? _a : item.name, item];
            }));
            var removeIndex_1 = [];
            collapse.body.forEach(function (item, index) {
              var key = item.name;
              // 重复意义的配置用现在的表达文案替换一下
              if (appendItems_1.hasOwnProperty(key)) {
                removeIndex_1.push(index);
                appendItems_1[key] = __assign(__assign({}, item), appendItems_1[key]);
                return;
              }
              if (item.name === 'labelRemark') {
                removeIndex_1.push(index);
              }
            });
            removeIndex_1.reverse();
            removeIndex_1.forEach(function (index) {
              collapse.body.splice(index, 1);
            });
            (_a = collapse.body).unshift.apply(_a, __spreadArray([], __read(Object.values(appendItems_1)), false));
          }
        });
        var moreCollapse = getSchemaTpl('collapseGroup', [{
          title: i18n("cb2f68c9c24e85d21e6b090b6e5657d8"),
          body: advanced
        }]);
        (_a = tab.body[0].body).splice.apply(_a, __spreadArray([1, 0], __read(moreCollapse.body), false));
        // 让折叠器默认都展开
        (_b = tab.body[0].activeKey).push.apply(_b, __spreadArray([], __read(moreCollapse.activeKey), false));
      }
      if (tab.title === i18n("afcde2611bdd13c1e65b4fb6a2f13425")) {
        var moreCollapse = getSchemaTpl('collapseGroup', [{
          title: i18n("cb2f68c9c24e85d21e6b090b6e5657d8"),
          body: baseStyle
        }]);
        (_c = tab.body[0].body).splice.apply(_c, __spreadArray([1, 0], __read(moreCollapse.body), false));
        // 让折叠器默认都展开
        (_d = tab.body[0].activeKey).push.apply(_d, __spreadArray([], __read(moreCollapse.activeKey), false));
      }
    });
  };
  // filterProps(props: any) {
  //   props = JSONPipeOut(props, true);
  //   return props;
  // }
  TableCell2Plugin.prototype.getRendererInfo = function (context) {
    var renderer = context.renderer,
      schema = context.schema;
    if (renderer.name === 'cell-field') {
      return {
        name: schema.title ? "<".concat(schema.title, ">\u5217") : i18n("044892c0c637f2d9e78e78956b1ded01"),
        $schema: '/schemas/TableColumn.json',
        multifactor: true,
        wrapperResolve: function (dom) {
          var _a, _b;
          // 固定这种结构 amis里改了 这里也得改
          var parent = (_a = dom.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
          var groupId = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-group-id');
          var wrapper = (_b = dom.closest('table').parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
          return [].slice.call(wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelectorAll("th[data-group-id=\"".concat(groupId, "\"],\n              td[data-group-id=\"").concat(groupId, "\"]")));
        }
        // filterProps: this.filterProps
      };
    }
  };
  /*exchangeRenderer(id: string) {
    this.manager.showReplacePanel(id, '展示');
  }*/
  TableCell2Plugin.prototype.beforeReplace = function (event) {
    var context = event.context;
    // 替换字段的时候保留 label 和 name 值。
    if (context.info.plugin === this && context.data) {
      context.data.title = context.data.title || context.schema.title;
      context.data.key = context.data.key || context.schema.key;
    }
  };
  return TableCell2Plugin;
}(BasePlugin);
registerEditorPlugin(TableCell2Plugin);

export { TableCell2Plugin };
