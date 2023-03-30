/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getI18nEnabled, getSchemaTpl, defaultValue, isObject, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var CollapseGroupPlugin = /** @class */function (_super) {
  __extends(CollapseGroupPlugin, _super);
  function CollapseGroupPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'collapse-group';
    _this.$schema = '/schemas/CollapseGroupSchema.json';
    // 组件名称
    _this.name = i18n("d09980a88568f75e9267ca7b531c74eb");
    _this.isBaseComponent = true;
    _this.description = i18n("0d571a7ab19e098820e8cea4d5a80f7d");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7"), i18n("22c799040acdb2601b437ed5449de076")];
    _this.icon = 'fa fa-align-justify';
    _this.pluginIcon = 'collapse-plugin';
    _this.scaffold = {
      type: 'collapse-group',
      activeKey: ['1'],
      body: [{
        type: 'collapse',
        key: '1',
        active: true,
        header: i18n("17dcbf1f144607d4af0bb718e008682f"),
        body: [{
          type: 'tpl',
          tpl: i18n("f7fb20f6cacd5e40c7f5732cb377d0bf"),
          wrapperComponent: '',
          inline: false
        }]
      }, {
        type: 'collapse',
        key: '2',
        header: i18n("72d41bd9eb3882f7da6f55d0ff0a39f6"),
        body: [{
          type: 'tpl',
          tpl: i18n("f7fb20f6cacd5e40c7f5732cb377d0bf"),
          wrapperComponent: '',
          inline: false
        }]
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.activeKeyData = [];
    _this.panelTitle = i18n("d09980a88568f75e9267ca7b531c74eb");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            name: 'expandIconPosition',
            label: i18n("0431ee7033364800e261d1e560808231"),
            type: 'button-group-select',
            pipeIn: defaultValue('left'),
            options: [{
              label: i18n("a7eaff29603a9c40927f726013d2c016"),
              value: 'left',
              icon: 'fa fa-align-left'
            }, {
              label: i18n("128d58f066a18ddb2ddb701921d5c77c"),
              value: 'right',
              icon: 'fa fa-align-right'
            }]
          }, {
            type: 'ae-switch-more',
            label: i18n("7372dc9f39a173dd0c75a185373245b1"),
            bulk: true,
            mode: 'normal',
            value: false,
            formType: 'extend',
            autoFocus: false,
            form: {
              body: [getSchemaTpl('icon', {
                name: 'expandIcon',
                label: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
                pipeIn: function (value) {
                  return value === null || value === void 0 ? void 0 : value.icon;
                },
                pipeOut: function (value) {
                  return {
                    type: 'icon',
                    vendor: '',
                    icon: value
                  };
                }
              })]
            },
            pipeIn: function (value) {
              if (typeof value === 'string' && value.length) {
                return {
                  character: value
                };
              }
              return undefined;
            },
            pipeOut: function (value) {
              if (!isObject(value)) {
                return undefined;
              }
              return typeof value.character === 'string' ? value.character : undefined;
            }
          }, {
            name: 'accordion',
            label: tipedLabel(i18n("47b4e22880eb59ce9989b8419222e88a"), i18n("bb3548f0bb97ab11ee92284ecf37ec16")),
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse',
            type: 'switch',
            pipeIn: defaultValue(false)
          }, getSchemaTpl('combo-container', {
            name: 'body',
            type: 'combo',
            label: i18n("f24544b06700857ec11b434cb2916692"),
            mode: 'normal',
            multiple: true,
            addable: true,
            columnClassName: 'w-20',
            addButtonText: i18n("c5ceab33d3e275262b4992a8cb43317f"),
            minLength: 1,
            draggable: true,
            draggableTip: '',
            placeholder: i18n("b839e579e920068bd817d34cd7927069"),
            items: [{
              type: 'container',
              columnClassName: 'flex-none',
              body: tipedLabel([{
                name: 'active',
                type: 'checkbox'
              }], i18n("030a54b0afb54fc7f90e1a0f64eb8205"))
            }, {
              name: 'header',
              placeholder: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              type: i18nEnabled ? 'input-text-i18n' : 'input-text'
            }],
            onChange: function (value, oldValue, model, form) {
              var activeKey = value.reduce(function (arr, item) {
                item.active === true && arr.push(item.key);
                return arr;
              }, []);
              form.setValues({
                activeKey: activeKey
              });
            },
            pipeOut: function (value, oldValue, data) {
              var keys = value.map(function (item) {
                return item.key;
              });
              var findMinCanUsedKey = function (keys, max) {
                for (var i = 1; i <= max; i++) {
                  if (!keys.includes(String(i))) {
                    return String(i);
                  }
                }
              };
              value.forEach(function (item) {
                if (!item.key) {
                  var key = findMinCanUsedKey(keys, value.length);
                  item.key = key;
                  item.header = "\u6807\u9898".concat(key);
                }
              });
              return value;
            },
            scaffold: {
              type: 'collapse',
              header: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              body: [{
                type: 'tpl',
                tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
                wrapperComponent: '',
                inline: false
              }],
              key: ''
            }
          })]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }])];
    };
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'render',
      insertPosition: 'inner'
    }];
    return _this;
  }
  return CollapseGroupPlugin;
}(BasePlugin);
registerEditorPlugin(CollapseGroupPlugin);

export { CollapseGroupPlugin };
