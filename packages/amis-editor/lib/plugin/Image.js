/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var ImagePlugin = /** @class */function (_super) {
  tslib.__extends(ImagePlugin, _super);
  function ImagePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'image';
    _this.$schema = '/schemas/ImageSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("67997ccf7ea846c3c2d278b01ed9600b");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("6dcf991e992a0b765df0933411fe9bb2");
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-photo';
    _this.pluginIcon = 'image-plugin';
    _this.scaffold = {
      type: 'image'
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      thumbMode: 'cover',
      value: amisEditorCore.mockValue({
        type: 'image'
      })
    });
    _this.panelTitle = i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18nRuntime.i18n("c6c7456d446d62a906c2809b6ba19ce1")
          }, {
            name: 'imageCaption',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18nRuntime.i18n("098c3d959911b48b4d912cb85ccc4942")
          }, {
            name: 'imageMode',
            label: i18nRuntime.i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
            type: 'select',
            pipeIn: amisEditorCore.defaultValue('thumb'),
            options: [{
              label: i18nRuntime.i18n("e18aa5e376437da71083a29c4cddaf46"),
              value: 'thumb'
            }, {
              label: i18nRuntime.i18n("fb43d5ffa21f3c4055c29fad350f27e4"),
              value: 'original'
            }]
          }, {
            name: 'width',
            label: i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7"),
            type: 'input-number'
          }, {
            name: 'height',
            label: i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            type: 'input-number'
          }, isUnderField ? null : amisEditorCore.getSchemaTpl('imageUrl', {
            name: 'src',
            type: 'input-text',
            label: i18nRuntime.i18n("582570bef8c57c5af7658c4a4eea45ff"),
            description: i18nRuntime.i18n("1193e1aab7bea094279ae7b4288ba848")
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            name: 'enlargeAble',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("26122d95c72204c83ebdc37cd16a96f9"), i18nRuntime.i18n("a19769d02b8de60a1e3b46c3ef96f122")),
            value: false,
            hiddenOnDefault: false,
            formType: 'extend',
            pipeIn: function (value) {
              return !!value;
            },
            form: {
              body: [amisEditorCore.getSchemaTpl('imageUrl', {
                name: 'originalSrc',
                label: i18nRuntime.i18n("7ffade593e390a2a2cc43e6663461b71"),
                description: i18nRuntime.i18n("214953c5f7557b1a5f1310c87238ee03")
              })]
            }
          }, {
            type: 'input-text',
            label: i18nRuntime.i18n("a3f38735bf211edb2066ac4e51b55cb2"),
            name: 'href',
            hiddenOn: 'this.enlargeAble',
            clearValueOnHidden: true
          }, amisEditorCore.getSchemaTpl('imageUrl', {
            name: 'defaultImage',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d196eb8f65e84003b7ca64d5dd8fc737"), i18nRuntime.i18n("f5865bf2d791d293374af4aa76d27c4d"))
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [
          // amis 已废弃
          // getSchemaTpl('switch', {
          //   name: 'showDimensions',
          //   label: '显示图片尺寸'
          // }),
          {
            name: 'thumbMode',
            type: 'select',
            label: i18nRuntime.i18n("00cedb73310cc531a43d23cfa5ba0e5f"),
            mode: 'horizontal',
            labelAlign: 'left',
            horizontal: {
              left: 5,
              right: 7
            },
            pipeIn: amisEditorCore.defaultValue('contain'),
            options: [{
              label: i18nRuntime.i18n("b0267f4aa776e75443b7ef6e8dad257e"),
              value: 'w-full'
            }, {
              label: i18nRuntime.i18n("c30b1b6f29debb05449aa3cb40268e7e"),
              value: 'h-full'
            }, {
              label: i18nRuntime.i18n("e13556bb3580ac3746e1f8663eb15896"),
              value: 'contain'
            }, {
              label: i18nRuntime.i18n("47303119ba97a66d168ff042575b9de4"),
              value: 'cover'
            }]
          }, {
            name: 'thumbRatio',
            type: 'button-group-select',
            label: i18nRuntime.i18n("319501b9acacdd6f94a9bdd0637a3cd2"),
            size: 'sm',
            pipeIn: amisEditorCore.defaultValue('1:1'),
            options: [{
              label: '1:1',
              value: '1:1'
            }, {
              label: '4:3',
              value: '4:3'
            }, {
              label: '16:9',
              value: '16:9'
            }]
          }]
        }, {
          title: i18nRuntime.i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5e5d3f13111593b2710673006d4c8297")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'imageClassName',
            label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'thumbClassName',
            label: i18nRuntime.i18n("0f088d8f579c362068d7a3858e207280")
          })]
        }])
      }]);
    };
    return _this;
  }
  ImagePlugin.prototype.onActive = function (event) {
    var _a;
    var context = event.context;
    if (((_a = context.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this || !context.node) {
      return;
    }
    var node = context.node;
    node.setHeightMutable(true);
    node.setWidthMutable(true);
  };
  ImagePlugin.prototype.onWidthChangeStart = function (event) {
    return this.onSizeChangeStart(event, 'horizontal');
  };
  ImagePlugin.prototype.onHeightChangeStart = function (event) {
    return this.onSizeChangeStart(event, 'vertical');
  };
  ImagePlugin.prototype.onSizeChangeStart = function (event, direction) {
    var _a;
    if (direction === void 0) {
      direction = 'both';
    }
    var context = event.context;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var resizer = context.resizer;
    var dom = context.dom;
    var frameRect = dom.parentElement.getBoundingClientRect();
    var rect = dom.getBoundingClientRect();
    var startX = context.nativeEvent.pageX;
    var startY = context.nativeEvent.pageY;
    event.setData({
      onMove: function (e) {
        var dy = e.pageY - startY;
        var dx = e.pageX - startX;
        var height = Math.max(50, rect.height + dy);
        var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        var state = {
          width: width,
          height: height
        };
        if (direction === 'both') {
          resizer.setAttribute('data-value', "".concat(width, "px x ").concat(height, "px"));
        } else if (direction === 'vertical') {
          resizer.setAttribute('data-value', "".concat(height, "px"));
          delete state.width;
        } else {
          resizer.setAttribute('data-value', "".concat(width, "px"));
          delete state.height;
        }
        node.updateState(state);
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      },
      onEnd: function (e) {
        var dy = e.pageY - startY;
        var dx = e.pageX - startX;
        var height = Math.max(50, rect.height + dy);
        var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        var state = {
          width: width,
          height: height
        };
        if (direction === 'vertical') {
          delete state.width;
        } else if (direction === 'horizontal') {
          delete state.height;
        }
        resizer.removeAttribute('data-value');
        node.updateSchema(state);
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      }
    });
  };
  ImagePlugin.scene = ['layout'];
  return ImagePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ImagePlugin);

exports.ImagePlugin = ImagePlugin;
