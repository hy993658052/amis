/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getSchemaTpl, defaultValue, diff, BasePlugin, registerEditorPlugin, CodeEditor } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var ChartConfigEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  return React__default.createElement("div", {
    className: "ae-JsonEditor"
  }, React__default.createElement(CodeEditor, {
    value: value,
    onChange: onChange
  }));
};
var DEFAULT_EVENT_PARAMS = [{
  type: 'object',
  properties: {
    'event.data.componentType': {
      type: 'string',
      title: 'componentType'
    },
    'event.data.seriesType': {
      type: 'string',
      title: 'seriesType'
    },
    'event.data.seriesIndex': {
      type: 'number',
      title: 'seriesIndex'
    },
    'event.data.seriesName': {
      type: 'string',
      title: 'seriesName'
    },
    'event.data.name': {
      type: 'string',
      title: 'name'
    },
    'event.data.dataIndex': {
      type: 'number',
      title: 'dataIndex'
    },
    'event.data.data': {
      type: 'object',
      title: 'data'
    },
    'event.data.dataType': {
      type: 'string',
      title: 'dataType'
    },
    'event.data.value': {
      type: 'number',
      title: 'value'
    },
    'event.data.color': {
      type: 'string',
      title: 'color'
    }
  }
}];
var ChartPlugin = /** @class */function (_super) {
  __extends(ChartPlugin, _super);
  function ChartPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'chart';
    _this.$schema = '/schemas/ChartSchema.json';
    // 组件名称
    _this.name = i18n("d09504750ebc1d75c38d86e16060f83d");
    _this.isBaseComponent = true;
    _this.description = i18n("10e14f791d73c7c0f4113787f36f1626");
    _this.docLink = '/amis/zh-CN/components/chart';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-pie-chart';
    _this.pluginIcon = 'chart-plugin';
    _this.scaffold = {
      type: 'chart',
      config: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      replaceChartOption: true
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    // 事件定义
    _this.events = [{
      eventName: 'init',
      eventLabel: i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("584e4b6108e132be92c9de09d7bbed72")
          }
        }
      }]
    }, {
      eventName: 'click',
      eventLabel: i18n("2ea6f1f33dec7cb3c23a1bf1f9eab11a"),
      description: i18n("fe9228649853d08eebee72ad5521a3dd"),
      dataSchema: DEFAULT_EVENT_PARAMS
    }, {
      eventName: 'mouseover',
      eventLabel: i18n("728c7cdfa431821d291b5108394ec65a"),
      description: i18n("a643d2fe12d205eb8fb5cffe92f62c35"),
      dataSchema: DEFAULT_EVENT_PARAMS
    }, {
      eventName: 'legendselectchanged',
      eventLabel: i18n("764c134791952dd1acb0f23587e75421"),
      description: i18n("262cd2f688751332c1907a659e686210"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.name': {
            type: 'string',
            title: 'name'
          },
          'event.data.selected': {
            type: 'object',
            title: 'selected'
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }
    // 特性动作太多了，这里先不加了，可以通过写代码配置
    ];

    _this.panelTitle = i18n("d09504750ebc1d75c38d86e16060f83d");
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('api', {
          label: i18n("3d6abfdea70af544603da70f93ed3d24"),
          description: i18n("03677b68a73eb59e5faf281f49f3c130")
        }), getSchemaTpl('switch', {
          label: i18n("1396ebc166bd49c1e3b67549a1b4caa0"),
          name: 'initFetch',
          visibleOn: 'data.api',
          pipeIn: defaultValue(true)
        }), {
          name: 'interval',
          label: i18n("2af32ab13a9dece315cec2764d6aa7d4"),
          type: 'input-number',
          step: 500,
          visibleOn: 'data.api',
          description: i18n("bc827aaffaa35a95607346cc104c0785")
        }, {
          name: 'config',
          asFormItem: true,
          component: ChartConfigEditor,
          // type: 'json-editor',
          label: i18n("57c7d1125d2803b946a5b25c3f80f249"),
          description: i18n("3d3fa75d8b345b22a5fbd14a65a0af71")
          // size: 'lg'
          // pipeOut: (value: any) => {
          //   try {
          //     return value ? JSON.parse(value) : null;
          //   } catch (e) {}
          //   return null;
          // }
        }, {
          name: 'clickAction',
          asFormItem: true,
          children: function (_a) {
            var onChange = _a.onChange,
              value = _a.value;
            return React__default.createElement("div", {
              className: "m-b"
            }, React__default.createElement(Button, {
              size: "sm",
              level: value ? 'danger' : 'info',
              onClick: _this.editDrillDown.bind(_this, context.id)
            }, "\u914D\u7F6E DrillDown"), value ? React__default.createElement(Button, {
              size: "sm",
              level: "link",
              className: "m-l",
              onClick: function () {
                return onChange('');
              }
            }, "\u5220\u9664 DrillDown") : null);
          }
        }, {
          name: 'dataFilter',
          type: 'js-editor',
          allowFullscreen: true,
          label: i18n("4fd9621d4facc101aba3afec055e14d1"),
          size: 'lg',
          description: "\n              \u5982\u679C\u540E\u7AEF\u6CA1\u6709\u76F4\u63A5\u8FD4\u56DE Echart \u914D\u7F6E\uFF0C\u53EF\u4EE5\u81EA\u5DF1\u5199\u4E00\u6BB5\u51FD\u6570\u6765\u5305\u88C5\u3002\n              <p>\u7B7E\u540D\uFF1A(config, echarts, data) => config</p>\n              <p>\u53C2\u6570\u8BF4\u660E</p>\n              <ul>\n              <li><code>config</code> \u539F\u59CB\u6570\u636E</li>\n              <li><code>echarts</code> echarts \u5BF9\u8C61</li>\n              <li><code>data</code> \u5982\u679C\u914D\u7F6E\u4E86\u6570\u636E\u63A5\u53E3\uFF0C\u63A5\u53E3\u8FD4\u56DE\u7684\u6570\u636E\u901A\u8FC7\u6B64\u53D8\u91CF\u4F20\u5165</li>\n              </ul>\n              <p>\u793A\u4F8B</p>\n              <pre>debugger; // \u53EF\u4EE5\u6D4F\u89C8\u5668\u4E2D\u65AD\u70B9\u8C03\u8BD5\n\n// \u67E5\u770B\u539F\u59CB\u6570\u636E\nconsole.log(config)\n\n// \u8FD4\u56DE\u65B0\u7684\u7ED3\u679C \nreturn {}</pre>\n              "
        }, getSchemaTpl('switch', {
          label: i18n("d98ef182637b4d10e16e8073c1101e51"),
          name: 'replaceChartOption',
          labelRemark: {
            trigger: 'click',
            className: 'm-l-xs',
            rootClose: true,
            content: i18n("f1f13cb0ca4720a727cbfba4c82e5890"),
            placement: 'left'
          }
        })]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('className')]
      }, {
        title: i18n("33bf801796fd255b5f6147e33146669b"),
        body: [getSchemaTpl('visible')]
      }, {
        title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
        body: [getSchemaTpl('name')]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }])];
    };
    return _this;
  }
  ChartPlugin.prototype.editDrillDown = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var dialog = value.clickAction && value.clickAction.dialog || {
      title: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      body: [i18n("40128a51e9667fe6a20a0454069368ba")]
    };
    node && value && this.manager.openSubEditor({
      title: i18n("7e3f6245e2a6adb903cf85c77cb1bbd7"),
      value: __assign({
        type: 'container'
      }, dialog),
      slot: {
        type: 'container',
        body: '$$'
      },
      typeMutable: false,
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          clickAction: {
            actionType: 'dialog',
            dialog: newValue
          }
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      }
    });
  };
  return ChartPlugin;
}(BasePlugin);
registerEditorPlugin(ChartPlugin);

export { ChartPlugin };
