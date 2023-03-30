/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __awaiter, __generator, __values } from 'tslib';
import { resolveVariable } from 'amis';
import { someTree, setVariable } from 'amis-core';
import { getSchemaTpl, tipedLabel, defaultValue, mockValue, repeatArray, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getArgsWrapper, getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var Table2Plugin = /** @class */function (_super) {
  __extends(Table2Plugin, _super);
  function Table2Plugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'table2';
    _this.$schema = '/schemas/TableSchema.json';
    // 组件名称
    _this.name = i18n("0d1f68afa19f3f3dd88e28d17c98ddf9");
    _this.isBaseComponent = true;
    _this.panelJustify = true;
    _this.disabledRendererPlugin = true;
    _this.description = i18n("ea2b32f5d78d2305b9b7bc21e056a009");
    _this.docLink = '/amis/zh-CN/components/table2';
    _this.icon = 'fa fa-table';
    _this.scaffold = {
      type: 'table2',
      columns: [{
        title: i18n("20aadc3f9b7edb564dc58898898e0dc8"),
        name: 'a'
      }],
      source: '$item'
    };
    _this.regions = [{
      key: 'columns',
      label: i18n("1f9794dd5634220ed0a498c666cf46fe"),
      renderMethod: 'renderTable',
      preferTag: i18n("027446c2f9070b0f5b16a18208bf5fc7"),
      dndMode: 'position-h'
    }];
    _this.previewSchema = {
      type: 'table2',
      className: 'text-left m-b-none',
      items: [{
        a: 1,
        b: 2,
        c: 9
      }, {
        a: 3,
        b: 4,
        c: 8
      }, {
        a: 5,
        b: 6,
        c: 7
      }],
      columns: [{
        title: 'A',
        name: 'a'
      }, {
        title: 'B',
        name: 'b'
      }]
    };
    _this.scaffoldForm = {
      title: i18n("6b93fcfc1a5795189c6072fa6e86d4f6"),
      body: [{
        name: 'columns',
        type: 'combo',
        multiple: true,
        label: false,
        addButtonText: i18n("0c14e431f1b5ecd163f8fa010a0654c7"),
        draggable: true,
        items: [{
          type: 'input-text',
          name: 'title',
          placeholder: i18n("32c65d8d7431e76029678ec7bb73a5ab")
        }, {
          type: 'input-text',
          name: 'name',
          placeholder: i18n("41a344642681efaaa418c228ba7fb45c")
        }, {
          type: 'select',
          name: 'type',
          placeholder: i18n("226b0912184333c81babf2f1894ec0c1"),
          value: 'text',
          options: [{
            value: 'text',
            label: i18n("ffb01e5bcf4c00447f5150d3cba81371")
          }, {
            value: 'tpl',
            label: i18n("59cf15fe6b8d659c9bd2f86143534a06")
          }, {
            value: 'image',
            label: i18n("20def7942674282277c3714ed7ea6ce0")
          }, {
            value: 'date',
            label: i18n("4ff1e74e43a3586339251494117185ad")
          }, {
            value: 'progress',
            label: i18n("c7bff79d059a0b7ff9b02441959d8be2")
          }, {
            value: 'status',
            label: i18n("3fea7ca76cdece641436d7ab0d02ab1b")
          }, {
            value: 'mapping',
            label: i18n("9da188491dd34c4382a5b9f006194e41")
          }, {
            value: 'container',
            label: i18n("22c799040acdb2601b437ed5449de076")
          }, {
            value: 'operation',
            label: i18n("8abc564260a1564521e0c3a1d5419b4a")
          }]
        }]
      }],
      canRebuild: true
    };
    _this.panelTitle = i18n("b339aa87104709397ba68e7ebbc6e5ba");
    _this.events = [{
      eventName: 'selectedChange',
      eventLabel: i18n("257f5a3886d87d2255206f86b880d07e"),
      description: i18n("6130b1f75d624b2f73f5d923492e92f7"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.selectedItems': {
            type: 'array',
            title: i18n("aeddca0456d8fe520dc95545a83458e9")
          },
          'event.data.unSelectedItems': {
            type: 'array',
            title: i18n("4f907cb94921bb62a8399adec922bb60")
          }
        }
      }]
    }, {
      eventName: 'columnSort',
      eventLabel: i18n("f3d21138c8ecf5683503c4f814cc7199"),
      description: i18n("d84464cfb2a5828a200fe9c28a323122"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.orderBy': {
            type: 'string',
            title: i18n("652f155e644e82ebb0a1aed97ab6ab23")
          },
          'event.data.orderDir': {
            type: 'string',
            title: i18n("460e3a697d1680445a47139c0816fbe6")
          }
        }
      }]
    }, {
      eventName: 'columnFilter',
      eventLabel: i18n("3d0b957a99d0c366612c01913e17a0c7"),
      description: i18n("b35963687361af98e6acdc004e87fc3c"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.filterName': {
            type: 'string',
            title: i18n("ad11fba3ac676233f3105e76e7de0501")
          },
          'event.data.filterValue': {
            type: 'string',
            title: i18n("8e4b9c88c51aaad1a28a28e8b536697f")
          }
        }
      }]
    }, {
      eventName: 'columnSearch',
      eventLabel: i18n("93a5a0253f11e3a2e58f4e87a52fb094"),
      description: i18n("6d4c4990ab2c32efe8a17c5f22e10cb5"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.searchName': {
            type: 'string',
            title: i18n("a80a4486100baf3f45fab3a59e4a816d")
          },
          'event.data.searchValue': {
            type: 'object',
            title: i18n("b9a565fe1dc488efae1d63464f277f09")
          }
        }
      }]
    }, {
      eventName: 'orderChange',
      eventLabel: i18n("85ddd38957256b6e9026f42ed570bc35"),
      description: i18n("d7a66def82af88cd5d408e38feb8a65a"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.movedItems': {
            type: 'array',
            title: i18n("1987561c006c7192ab619f81103d2a2f")
          }
        }
      }]
    }, {
      eventName: 'columnToggled',
      eventLabel: i18n("ecfebbc91e2c18a512aeb11b7da15193"),
      description: i18n("c94f45773a42dc386b9c9dcdc6fa542b"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.columns': {
            type: 'array',
            title: i18n("70567329ee851a5ba7e7301bd8e9d9a1")
          }
        }
      }]
    }, {
      eventName: 'rowClick',
      eventLabel: i18n("76e47871d654c3b0b0e301c0a076e55a"),
      description: i18n("cc13521eab2c7423b3fb857772405cc3"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.rowItem': {
            type: 'object',
            title: i18n("2fbbf5c38b66ac5496ac42246bbe9e0b")
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'select',
      actionLabel: i18n("8eb3c8b16106e5487cd1fa3b8a1342ce"),
      description: i18n("908cc16fe4f7972450167e26276ac726"),
      schema: getArgsWrapper([
      /*
      {
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        variableMode: 'tabs',
        label: '选中项',
        size: 'lg',
        name: 'selected',
        mode: 'horizontal'
      }
      */
      {
        name: 'selected',
        label: i18n("a2b39e5a8b5015234dcd8e07a2e00e3d"),
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal'
      }])
    }, {
      actionType: 'selectAll',
      actionLabel: i18n("366a3c07289bd6efb7c2a182f7a12772"),
      description: i18n("e97c09cd119b64ae0a8dfd42a1d449cb")
    }, {
      actionType: 'clearAll',
      actionLabel: i18n("c3e8652924c258e121eed16414d3a9e5"),
      description: i18n("7619ec29c0a854dd49e0a7a47bf1a127")
    }];
    _this.panelBodyCreator = function (context) {
      var isCRUDBody = ['crud', 'crud2'].includes(context.schema.type);
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            name: 'source',
            type: 'input-text',
            label: tipedLabel(i18n("c11322c9cc43ce3c004cf03f5ac0acd0"), i18n("8369004103635f8e75026217ebf237da")),
            hidden: isCRUDBody,
            pipeIn: defaultValue('${items}')
          }, getSchemaTpl('switch', {
            name: 'title',
            label: i18n("bd3e7a1b636e4477a4ea59922ed2cc1e"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              if (value) {
                return {
                  type: 'container',
                  body: [{
                    type: 'tpl',
                    wrapperComponent: '',
                    tpl: i18n("11d00f37d934b2464f3258952a398626"),
                    inline: false,
                    style: {
                      fontSize: 14
                    }
                  }]
                };
              }
              return null;
            }
          }), getSchemaTpl('switch', {
            name: 'showHeader',
            label: i18n("4e3cd1a7b193e2fd3458278d10c530e2"),
            value: true,
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return !!value;
            }
          }), getSchemaTpl('switch', {
            visibleOn: 'this.showHeader !== false',
            name: 'sticky',
            label: i18n("023ff3530e48493e653eb48e958a4eb8"),
            pipeIn: defaultValue(false)
          }), getSchemaTpl('switch', {
            name: 'footer',
            label: i18n("dd9b85b2cd13ca724afd1f43567abdbf"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              if (value) {
                return {
                  type: 'container',
                  body: [{
                    type: 'tpl',
                    tpl: i18n("c89b5fd3b706a17feb016d93c80e34b1"),
                    wrapperComponent: '',
                    inline: false,
                    style: {
                      fontSize: 14
                    }
                  }]
                };
              }
              return null;
            }
          }), {
            name: 'scroll.y',
            label: i18n("a5baa4818b14f4680955aa34dd559d02"),
            type: 'button-group-select',
            pipeIn: function (v) {
              return v != null;
            },
            pipeOut: function (v) {
              return v ? '' : null;
            },
            options: [{
              label: i18n("4db804afe5c99f7ca4fe988ada35c77f"),
              value: false
            }, {
              label: i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
              value: true
            }]
          }, {
            type: 'input-group',
            visibleOn: 'data.scroll && data.scroll.y !== null',
            label: i18n("ee18dc475df8654cb13ad67dd84eec28"),
            body: [{
              type: 'input-number',
              name: 'scroll.y'
            }, {
              type: 'tpl',
              addOnclassName: 'border-0 bg-none',
              tpl: 'px'
            }]
          }, {
            name: 'scroll.x',
            label: tipedLabel(i18n("8bb5781dc5f2745e6356cdc5e6d76b16"), i18n("88a364068f684dc77aca5b6c006ef576")),
            type: 'button-group-select',
            pipeIn: function (v) {
              return v != null;
            },
            pipeOut: function (v) {
              return v ? '' : null;
            },
            options: [{
              label: i18n("4db804afe5c99f7ca4fe988ada35c77f"),
              value: false
            }, {
              label: i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
              value: true
            }]
          }, {
            type: 'input-group',
            visibleOn: 'data.scroll && data.scroll.x !== null',
            name: 'scroll.x',
            label: i18n("6e3d35b57c29b1b419569cc55b3a5d33"),
            body: [{
              type: 'input-number',
              name: 'scroll.x'
            }, {
              type: 'tpl',
              addOnclassName: 'border-0 bg-none',
              tpl: 'px'
            }]
          }, getSchemaTpl('tablePlaceholder')]
        }, {
          title: i18n("949a8b7bd2c10070a2fae16f9c66afbb"),
          body: [getSchemaTpl('switch', {
            name: 'resizable',
            label: tipedLabel(i18n("ba4f461832cbdb7fbdb170fc9c1db647"), i18n("aa2bd9f54608c0c85d3ceecb707938c9")),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value;
            }
          }), isCRUDBody ? null : {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'columnsTogglable',
            hiddenOnDefault: true,
            formType: 'extend',
            label: tipedLabel(i18n("2816cea6c4887a53c417831deb5fbe00"), i18n("d3c5079f7e26b1a7374ff76341376de4")),
            pipeOut: function (value) {
              if (value && value.columnsTogglable) {
                return {
                  columnsTogglable: {
                    type: 'column-toggler'
                  }
                };
              }
              return value;
            },
            form: {
              body: [{
                mode: 'normal',
                type: 'ae-columnControl'
              }]
            }
          }]
        }, {
          title: i18n("ed85be57262e5a0c3116293e88278fef"),
          body: [{
            name: 'lineHeight',
            label: i18n("5a431ad16d8f7f23fac3be5650e51caa"),
            type: 'select',
            placeholder: i18n("3d2ac2fd2c60931fff1db814662334c3"),
            options: [{
              label: i18n("85a49c5ed4628647f2ead9206224dba3"),
              value: ''
            }, {
              label: i18n("4296d7d293c9ea4a0e52c6415f0b5c96"),
              value: 'large'
            }, {
              label: i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'middle'
            }],
            clearable: false,
            value: ''
          }, isCRUDBody ? {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'rowSelection',
            label: i18n("e3be7b8a459a08fec8f378a0660b642b"),
            visibleOn: 'data.selectable',
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                label: i18n("1f1ca9df5fa3648c718ad04649888943"),
                name: 'rowSelection.rowClick',
                type: 'button-group-select',
                value: false,
                options: [{
                  label: 'CheckBox',
                  value: false
                }, {
                  label: i18n("596171970b639a35dadde2aa930d666a"),
                  value: true
                }]
              }, {
                name: 'rowSelection.disableOn',
                type: 'ae-formulaControl',
                label: i18n("388855093d17f3df43ff80242d7a1bed")
              }, {
                name: 'rowSelection.selections',
                label: i18n("46705a530ba9721527a4202bae7091bd"),
                type: 'checkboxes',
                joinValues: false,
                inline: false,
                itemClassName: 'text-sm',
                options: [{
                  label: i18n("66eeacd93a7c1bda93906fe908ad11a0"),
                  value: 'all'
                }, {
                  label: i18n("aab57a3547a451f756bb8231a1eee8d7"),
                  value: 'invert'
                }, {
                  label: i18n("76159d0d1261c0b6c310901244457e36"),
                  value: 'none'
                }, {
                  label: i18n("be4751b0c9adf1d8deee45226c6124ee"),
                  value: 'odd'
                }, {
                  label: i18n("49f4010dade8652e5aff6a2c67aa23a4"),
                  value: 'even'
                }],
                pipeIn: function (v) {
                  if (!v) {
                    return;
                  }
                  return v.map(function (item) {
                    return {
                      label: item.text,
                      value: item.key
                    };
                  });
                },
                pipeOut: function (v) {
                  if (!v) {
                    return;
                  }
                  return v.map(function (item) {
                    return {
                      key: item.value,
                      text: item.label
                    };
                  });
                }
              }]
            }
          } : null, {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'expandable',
            label: i18n("49b4aa407b91ac997e27314e30c03110"),
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                name: 'expandable.expandableOn',
                visibleOn: 'data.expandable',
                type: 'ae-formulaControl',
                label: i18n("8c1f5c49de09adab9a0e0c39e0106f78")
              }]
            }
          }, getSchemaTpl('switch', {
            name: 'childrenColumnName',
            label: i18n("caca6cb58342bb604483d94f49515234"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value ? 'children' : '';
            }
          }), getSchemaTpl('switch', {
            name: 'draggable',
            label: i18n("5bdff9fd07d2a2430ac50e1559dbee27"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value;
            }
          })]
        }, {
          title: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [getSchemaTpl('hidden', {
            label: i18n("dce5379cb978a8259ecfca8f08f00817")
          })]
        }, {
          title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [getSchemaTpl('apiControl', {
            label: i18n("33eaf97ecb3465754855e847f14d129c"),
            name: 'quickSaveApi'
          }), getSchemaTpl('apiControl', {
            label: i18n("ce7d31d64f2315e1d4cede288b9dfc60"),
            name: 'quickSaveItemApi'
          })]
        }]), isCRUDBody ? null : {
          type: 'divider'
        }]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('switch', {
            name: 'bordered',
            label: i18n("961534b4ea37e4e88aada736b299d063"),
            pipeIn: defaultValue(false)
          }), {
            name: 'scroll.x',
            type: 'input-number',
            label: i18n("927b639f244953f237cd12943c8b815c")
          }, {
            name: 'indentSize',
            visibleOn: 'data.childrenColumnName',
            type: 'input-number',
            unitOptions: [{
              label: 'px',
              value: 'px'
            }],
            label: i18n("fdd59ca00eba17d4bfebf744056ce4ab")
          }, {
            name: 'rowSelection.columnWidth',
            visibleOn: 'data.rowSelection',
            type: 'input-number',
            label: i18n("6bfd4423d8aebbf0cac7ba4d74f245bd"),
            description: i18n("21922c6479665dcba83106f8e9ffdf68")
          }, {
            name: 'expandable.columnWidth',
            visibleOn: 'data.expandable',
            type: 'input-number',
            label: i18n("31b7c58c2d9a170829b90314ff98b66a"),
            description: i18n("81ccf26d9622d139a13ba2a61bd9fea4")
          }]
        }, getSchemaTpl('style:classNames', {
          isFormItem: true,
          schema: [{
            name: 'rowClassNameExpr',
            type: 'ae-formulaControl',
            label: i18n("68e9249db7bd12ab17994b1761b049f5")
          }, {
            name: 'expandable.expandedRowClassNameExpr',
            visibleOn: 'data.expandable',
            type: 'ae-formulaControl',
            label: i18n("ef0c5b6fa16497343eedb76171d61d68")
          }]
        })])]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  Table2Plugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
      var itemsSchema, columns, _c, _d, current, schema, _e, _f, _g, e_1_1, cellProperties, isColumnChild, result;
      var e_1, _h;
      return __generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            itemsSchema = {
              $id: 'tableRow',
              type: 'object',
              properties: {}
            };
            columns = node.children.find(function (item) {
              return item.isRegion && item.region === 'columns';
            });
            if (!columns) return [3 /*break*/, 10];
            _j.label = 1;
          case 1:
            _j.trys.push([1, 8, 9, 10]);
            _c = __values(columns.children), _d = _c.next();
            _j.label = 2;
          case 2:
            if (!!_d.done) return [3 /*break*/, 7];
            current = _d.value;
            schema = current.schema;
            if (!(schema === null || schema === void 0 ? void 0 : schema.name)) return [3 /*break*/, 6];
            _e = itemsSchema.properties;
            _f = schema.name;
            if (!((_b = (_a = current.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) return [3 /*break*/, 4];
            return [4 /*yield*/, current.info.plugin.buildDataSchemas(current, region)];
          case 3:
            _g = _j.sent();
            return [3 /*break*/, 5];
          case 4:
            _g = {
              type: 'string',
              title: schema.label || schema.title
            };
            _j.label = 5;
          case 5:
            _e[_f] = _g;
            _j.label = 6;
          case 6:
            _d = _c.next();
            return [3 /*break*/, 2];
          case 7:
            return [3 /*break*/, 10];
          case 8:
            e_1_1 = _j.sent();
            e_1 = {
              error: e_1_1
            };
            return [3 /*break*/, 10];
          case 9:
            try {
              if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
            } finally {
              if (e_1) throw e_1.error;
            }
            return [7 /*endfinally*/];
          case 10:
            cellProperties = {};
            if (trigger) {
              isColumnChild = someTree(columns === null || columns === void 0 ? void 0 : columns.children, function (item) {
                return item.id === trigger.id;
              });
              isColumnChild && (cellProperties = itemsSchema.properties);
            }
            result = {
              $id: 'table2',
              type: 'object',
              properties: __assign(__assign({}, cellProperties), {
                rows: {
                  type: 'array',
                  title: i18n("77fdd35933c099cdcb64b71f3fbe7a6c"),
                  items: itemsSchema
                }
              })
            };
            if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
              result.properties = __assign(__assign({}, itemsSchema.properties), result.properties);
            }
            return [2 /*return*/, result];
        }
      });
    });
  };
  Table2Plugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  };

  Table2Plugin.prototype.filterProps = function (props) {
    var arr = Array.isArray(props.value) ? props.value : typeof props.source === 'string' ? resolveVariable(props.source, props.data) : resolveVariable('items', props.data);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData_1 = {};
      if (Array.isArray(props.columns)) {
        props.columns.forEach(function (column) {
          if (column.name) {
            setVariable(mockedData_1, column.name, mockValue(column));
          }
        });
      }
      props.value = repeatArray(mockedData_1, 10).map(function (item, index) {
        return __assign(__assign({}, item), {
          id: index + 1
        });
      });
    } else {
      // 只取10条预览，否则太多卡顿
      props.value = arr.slice(0, 10);
    }
    // 如果设置了可展开 默认把第一行展开
    if (props.expandable) {
      if (typeof props.expandable === 'boolean') {
        props.expandable = {};
      }
      if (!props.expandable.type) {
        props.expandable.type = 'container';
        props.expandable.body = [{
          type: 'tpl',
          tpl: i18n("1a7bd457c08093cf2cf887403dc249d8"),
          wrapperComponent: '',
          inline: false
        }];
      }
      props.expandable.keyField = 'id';
      props.expandable.expandedRowKeys = [1];
    }
    return props;
  };
  // 为了能够自动注入数据。
  Table2Plugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var schema = context.schema,
      renderer = context.renderer;
    if (!schema.$$id && ['crud', 'crud2'].includes((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) && renderer.name === 'table2') {
      return __assign(__assign({}, {
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
  // 自动插入 label
  Table2Plugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'columns') {
      context.data = __assign(__assign({}, context.data), {
        title: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  return Table2Plugin;
}(BasePlugin);
registerEditorPlugin(Table2Plugin);

export { Table2Plugin };
