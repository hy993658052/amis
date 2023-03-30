/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read, __awaiter, __generator } from 'tslib';
import { getI18nEnabled, getSchemaTpl, defaultValue, jsonToJsonSchema, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { setVariable } from 'amis-core';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var getFormItemOptions = function (_a) {
  var i18nEnabled = _a.i18nEnabled;
  return [{
    name: 'type',
    label: i18n("cd948961f71f87ecc72b251147d96144"),
    type: 'select',
    required: true,
    options: [{
      label: i18n("0766a6467bed7f2840871a5f0638669d"),
      value: 'input-text'
    }, {
      label: i18n("15d169d28cd48c97fe751e4cc92ca926"),
      value: 'textarea'
    }, {
      label: i18n("829abe5a8dcd0579a340d20636b59276"),
      value: 'group'
    }, {
      label: i18n("9597dcaf432ceba92a160d61cb1ef65f"),
      value: 'input-number'
    }, {
      label: i18n("9913107b19cb6012250134ff91377430"),
      value: 'radios'
    }, {
      label: i18n("454e60f5759903d7d3dba58e3f9bd590"),
      value: 'checkbox'
    }, {
      label: i18n("db98f889ce6bc235e66bd4b2a788d137"),
      value: 'checkboxes'
    }, {
      label: i18n("006ded9fa277cf030592021f595a07d5"),
      value: 'select'
    }, {
      label: i18n("a6beb974cc0b50eebd18120b8110a88b"),
      value: 'switch'
    }, {
      label: i18n("4ff1e74e43a3586339251494117185ad"),
      value: 'input-date'
    }, {
      label: i18n("b339aa87104709397ba68e7ebbc6e5ba"),
      value: 'input-table'
    }, {
      label: i18n("481e034e6026969aae4ce7ce7c8a7b6f"),
      value: 'input-file'
    }, {
      label: i18n("6bfb9bb2218ff32b6139e98bc93707c0"),
      value: 'input-image'
    }, {
      label: i18n("24b6d4c0892a8f3ee2a982e3ab0afe38"),
      value: 'input-rich-text'
    }]
  }, {
    name: 'label',
    label: i18n("fdf6f7f6497556de440fe434b721ee99"),
    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
    hiddenOn: 'data.type === "group"'
  }, {
    name: 'name',
    label: i18n("712538d3e674792ec94feb9a5eb2cc0a"),
    required: true,
    type: 'input-text',
    hiddenOn: 'data.type === "group"'
  }];
};
// 自动为form中子元素（单选框、复选框）补上默认options
var autoAddOptions = function (values) {
  var _a;
  if (values && (values.type === 'form' || values.type === 'group') && ((_a = values.body) === null || _a === void 0 ? void 0 : _a.length) > 0) {
    values.body.forEach(function (formItem) {
      if (formItem.type === 'radios' || formItem.type === 'checkboxes') {
        formItem.options = [{
          label: i18n("05f87b331e1c97691776d93a6598373f"),
          value: 'A'
        }, {
          label: i18n("f38c0a46797523b11051e35ec0f82a42"),
          value: 'B'
        }];
      } else if (formItem.type === 'form' || formItem.type === 'group') {
        autoAddOptions(formItem);
      }
    });
  }
};
var FormPlugin = /** @class */function (_super) {
  __extends(FormPlugin, _super);
  function FormPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'form';
    _this.$schema = '/schemas/FormSchema.json';
    _this.order = -999;
    // 组件名称
    _this.name = i18n("eee1e2258d7ea163fec625ee44be9637");
    _this.isBaseComponent = true;
    _this.description = i18n("10b3d542748da2043f79395bfa2ab35f");
    _this.docLink = '/amis/zh-CN/components/form/index';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-list-alt';
    _this.pluginIcon = 'form-plugin';
    _this.scaffold = {
      type: 'form',
      title: i18n("eee1e2258d7ea163fec625ee44be9637"),
      body: [{
        label: i18n("5ac57ce6df8c2a19668b7429aebd9f33"),
        type: 'input-text',
        name: 'text'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      panelClassName: 'Panel--default text-left m-b-none',
      mode: 'horizontal',
      body: [{
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        name: 'a',
        type: 'input-text'
      }]
    };
    // scaffoldForm: ScaffoldForm = {
    //   title: '配置表单信息',
    //   body: [getSchemaTpl('api')],
    //   canRebuild: true
    // };
    // 容器配置
    _this.regions = [{
      key: 'body',
      label: i18n("3673ed1983c1be059126e3715fc34922"),
      matchRegion: function (elem) {
        return !!(elem === null || elem === void 0 ? void 0 : elem.props.noValidate);
      },
      renderMethod: 'renderBody',
      preferTag: i18n("55b45c73ae417c4dead67905b1550e85")
    }, {
      label: i18n("c8caf94205105bac5833ab31cc2129d7"),
      key: 'actions',
      preferTag: i18n("fa966345577ba81af19408f203db968f")
    }];
    _this.panelTitle = i18n("eee1e2258d7ea163fec625ee44be9637");
    // 事件定义
    _this.events = [{
      eventName: 'inited',
      eventLabel: i18n("9328b90ded33d16a873db5c0dbd815b8"),
      description: i18n("f3b97bd71a77cca1e9288089a537cf3b"),
      // 表单数据为表单变量
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("9787088794f42c7e476cf7580f81447e")
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18n("b2a5322c8dbc0d8343315cafbd39b7ce"),
      description: i18n("d6fc04abf4889a864bea240d6b67963a"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'formItemValidateSucc',
      eventLabel: i18n("7233c9cadee5096097673c9590eae9b8"),
      description: i18n("6611594c527756e23d4044f908fedfa9"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'formItemValidateError',
      eventLabel: i18n("e00a32d415785d5a5d43a593d26cbaa0"),
      description: i18n("d4c12cea41e1595329358edb365c5f5b"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'validateSucc',
      eventLabel: i18n("368f9bab722b255f1fdb669a89f0c594"),
      description: i18n("35e69ab84129d721229bc5b48afdedd2"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'validateError',
      eventLabel: i18n("641fc404690a43cb13e4666ce272974f"),
      description: i18n("5d7dfa5bf9bcd278f06fa37e482a2c35"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'submit',
      eventLabel: i18n("b1119174b1beedd2218e0b359ef14aec"),
      strongDesc: i18n("c6a65a86cd2bd74a6f72df0a7b81d3cb"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("66f1115691b0a3e434dd3e8a6e733730")
          }
        }
      }]
    }, {
      eventName: 'submitSucc',
      eventLabel: i18n("23b62e9cbc868e024b80d2e3fad80ac7"),
      description: i18n("850c62f7b1ebfb4b89182ecd51202a7d"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.result': {
            type: 'object',
            title: i18n("88b2930823f9fd6706473805e9b11797")
          }
        }
      }]
    }, {
      eventName: 'submitFail',
      eventLabel: i18n("f5d008dea7d2e953195a5588dea3c8e4"),
      description: i18n("86555672b37841b639311e7d49f0f593"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.error': {
            type: 'object',
            title: i18n("3e07258baf3c4389c1ffd4a98c20b8fe")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionLabel: i18n("4e34003861eee3de1e0c9c1222249bbb"),
      actionType: 'submit',
      description: i18n("a360c5d4e723ad78a5e52eb1f5f3f2a2")
    }, {
      actionLabel: i18n("1b6f5cc49e71c90a5b85a796285e3135"),
      actionType: 'reset',
      description: i18n("35de8c264c2a87836ccbf302b4ee673f")
    }, {
      actionLabel: i18n("4a3deab45c0a7218b8ae58a33fd24c28"),
      actionType: 'clear',
      description: i18n("c18255cd6a048da86045c59a65fdc92d")
    }, {
      actionLabel: i18n("17f2bf425eeb7d20d79c595344e9dc94"),
      actionType: 'validate',
      description: i18n("27f35bc7086bf54e27e254f5d77c3168")
    }, {
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      actionType: 'reload',
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      actionType: 'setValue',
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      var isCRUDFilter = /\/crud\/filter\/form$/.test(context.path);
      var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
      var i18nEnabled = getI18nEnabled();
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('title', {
          visibleOn: "this.wrapWithPanel !== false"
        }), getSchemaTpl('submitText', {
          pipeIn: defaultValue(i18n("939d5345ad4345dbaabe14798f6ac0f1")),
          visibleOn: "this.wrapWithPanel !== false && !this.actions && (!Array.isArray(this.body) || !this.body.some(function(item) {return !!~['submit','button','reset','button-group'].indexOf(item.type);}))",
          description: i18n("a834505b13627a2e9eb4e0a0c2746e5c")
        }), getSchemaTpl('switch', {
          name: 'autoFocus',
          label: i18n("cbef9ad64297efd7657d5b67b2112751"),
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("ded8caee55c05aa0f1a4e6a197c480bd"),
            placement: 'left'
          }
        }), getSchemaTpl('submitOnChange'), getSchemaTpl('switch', {
          label: i18n("c8801f299681b3080968effcb13a57fe"),
          name: 'preventEnterSubmit',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("4fe8162504ae5fb955c30863d88834fa"),
            placement: 'left'
          }
        }), getSchemaTpl('switch', {
          label: i18n("6232c762a93aeb3c89cc759c06802610"),
          name: 'resetAfterSubmit',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("7d61784cd115d333f01a3c0c46408a1c"),
            placement: 'left'
          }
        }), isCRUDFilter ? null : getSchemaTpl('switch', {
          label: i18n("49086a13c74f262de398e60f448ab056"),
          name: 'submitOnInit',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("1babd035cabfeb997ac3eee3f938d794"),
            placement: 'left'
          }
        }), isInDialog ? getSchemaTpl('switch', {
          label: i18n("0d1fb15904862f5fd2d81d2fc8f371d6"),
          name: 'closeDialogOnSubmit',
          pipeIn: function (value) {
            return value !== false;
          }
        }) : null, isCRUDFilter ? null : {
          label: i18n("e91209a4a78c0b34c26b681b49e0681a"),
          name: 'target',
          type: 'input-text',
          description: i18n("4133d2c3613ece9792c90d185ec32306")
        }, getSchemaTpl('reload', {
          test: !isCRUDFilter
        }), isCRUDFilter ? null : {
          label: i18n("7653297de32f34fdec0dd0653aebf358"),
          name: 'redirect',
          type: 'input-text',
          description: i18n("6d00e21637c382cbd4d949b7735a2e41")
        }, getSchemaTpl('switch', {
          name: 'canAccessSuperData',
          label: i18n("1c5b9cb245f04413a2d888bd59442097"),
          pipeIn: defaultValue(true)
        }), getSchemaTpl('switch', {
          name: 'persistData',
          label: i18n("672b63d7523095b949f5fad233fa0cde"),
          pipeIn: defaultValue(false),
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("8a0544ca2f7ddaf8768ab599858315a6"),
            placement: 'left'
          }
        }), getSchemaTpl('switch', {
          name: 'clearPersistDataAfterSubmit',
          label: i18n("ce2457fe99197e0fe81b6fb08e3eaf0e"),
          pipeIn: defaultValue(false),
          visibleOn: 'data.persistData',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("bc01ee1a28f980c298679610fe4d2d66"),
            placement: 'left'
          }
        }), {
          name: 'rules',
          label: i18n("f5e55fb88f5adc71beb0b1fff60face6"),
          type: 'combo',
          multiple: true,
          multiLine: true,
          items: [{
            name: 'rule',
            label: i18n("8101a0aec7eba32e633e3cc29f4b7ede"),
            type: 'input-text'
          }, {
            name: 'message',
            label: i18n("80ce5ea9ac2c3001e6e8ea3175ecc12d"),
            type: i18nEnabled ? 'input-text-i18n' : 'input-text'
          }]
        }]
      }, isCRUDFilter ? null : {
        title: i18n("54ea89b497ec3bb319c68844dfa3687f"),
        body: [getSchemaTpl('apiControl', {
          label: i18n("ff7cc75cc43c25c823d05d87cb8190b0"),
          description: i18n("d325cfafec323a62463af3d3da9b6ede"),
          sampleBuilder: function () {
            return "{\n    \"status\": 0,\n    \"msg\": \"\",\n\n    // \u53EF\u4EE5\u4E0D\u8FD4\u56DE\uFF0C\u5982\u679C\u8FD4\u56DE\u4E86\u6570\u636E\u5C06\u88AB merge \u8FDB\u6765\u3002\n    data: {}\n  }";
          }
          // test: !this.isCRUDFilter
        }), getSchemaTpl('switch', {
          name: 'asyncApi',
          label: i18n("dd1b9892e274b16540aeda961437870d"),
          visibleOn: 'data.api',
          labelRemark: {
            trigger: 'click',
            rootClose: true,
            title: i18n("e638bd32b4342dfc7a15990a79f588ae"),
            content: i18n("6df230c8f18709575777172f0a9a588c"),
            placement: 'left'
          },
          pipeIn: function (value) {
            return value != null;
          },
          pipeOut: function (value) {
            return value ? '' : undefined;
          }
        }), getSchemaTpl('apiControl', {
          name: 'asyncApi',
          label: i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
          visibleOn: 'data.asyncApi != null',
          description: i18n("0705e4aba9f22ae70d906e2201a4a68d")
        }), {
          type: 'divider'
        }, getSchemaTpl('apiControl', {
          name: 'initApi',
          label: i18n("b4bc91701b86fe8543d649e97daea602"),
          description: i18n("258c437ef67e5ef12f3a766ff1802f85"),
          sampleBuilder: function () {
            var data = {};
            var schema = context === null || context === void 0 ? void 0 : context.schema;
            if (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.body)) {
              schema.body.forEach(function (control) {
                if (control.name && !~['combo', 'input-array', 'form'].indexOf(control.type)) {
                  setVariable(data, control.name, 'sample');
                }
              });
            }
            return JSON.stringify({
              status: 0,
              msg: '',
              data: data
            }, null, 2);
          }
        }), getSchemaTpl('switch', {
          label: i18n("1af68c43e1780249f11b9de1eeaeb281"),
          name: 'interval',
          visibleOn: 'data.initApi',
          pipeIn: function (value) {
            return !!value;
          },
          pipeOut: function (value) {
            return value ? 3000 : undefined;
          }
        }), {
          name: 'interval',
          type: 'input-number',
          visibleOn: 'data.interval',
          step: 500,
          className: 'm-t-n-sm',
          description: i18n("9800f1ce2f78a23b81c8d944ebf9cce9")
        }, getSchemaTpl('switch', {
          name: 'silentPolling',
          label: i18n("19c5410b23fba4bbfd1a58bbd5268c9b"),
          visibleOn: '!!data.interval',
          description: i18n("04f840b0772f4b5d59954a29a76f4e7b")
        }), {
          name: 'stopAutoRefreshWhen',
          label: i18n("6037dae99e9446deaed45f7e408f47ab"),
          type: 'input-text',
          visibleOn: '!!data.interval',
          description: i18n("32e3a79e80dcf7f7304e8092dd7acc6f")
        }, getSchemaTpl('switch', {
          label: i18n("e8c46074d8432532cac25eba56bca354"),
          name: 'initAsyncApi',
          visibleOn: 'data.initApi',
          remark: {
            trigger: 'click',
            rootClose: true,
            title: i18n("e638bd32b4342dfc7a15990a79f588ae"),
            content: i18n("6df230c8f18709575777172f0a9a588c"),
            placement: 'left'
          },
          pipeIn: function (value) {
            return value != null;
          },
          pipeOut: function (value) {
            return value ? '' : undefined;
          }
        }), getSchemaTpl('apiControl', {
          name: 'initAsyncApi',
          label: i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
          visibleOn: 'data.initAsyncApi != null',
          description: i18n("d2af24c0f76cf325f1c8fa939576c379")
        }), {
          type: 'divider'
        }, getSchemaTpl('loadingConfig', {
          label: i18n("5a4e41af91746f8a3905aa9f66048955")
        }, {
          context: context
        }), {
          type: 'divider'
        }, isCRUDFilter ? {
          name: 'messages',
          pipeIn: defaultValue({
            fetchFailed: i18n("ab94e2c30b3cf0fd11eea477f70dcbaf")
          }),
          label: i18n("b64292a1903bd969d0e3a558c334f5bf"),
          type: 'combo',
          multiLine: true,
          description: i18n("8a5e590f69e1ae52d86396410ceeee5a"),
          items: [getSchemaTpl('fetchSuccess'), getSchemaTpl('fetchFailed')]
        } : {
          name: 'messages',
          pipeIn: defaultValue({
            fetchFailed: i18n("ab94e2c30b3cf0fd11eea477f70dcbaf"),
            saveSuccess: i18n("3b108349b93f7c8c4e2346f8d48c092a"),
            saveFailed: i18n("6de920b4e4e08b261cda928d9beefab4")
          }),
          label: i18n("522110866c19dace2ce38336617405c2"),
          type: 'combo',
          multiLine: true,
          description: i18n("8a5e590f69e1ae52d86396410ceeee5a"),
          items: [getSchemaTpl('fetchSuccess'), getSchemaTpl('fetchFailed'), getSchemaTpl('saveSuccess'), getSchemaTpl('saveFailed'), getSchemaTpl('validateFailed')]
        }]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('switch', {
          name: 'wrapWithPanel',
          label: i18n("02e977ba56a7ccc59c277d2d5be43ba0"),
          pipeIn: defaultValue(true),
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("1cb01363e2463443bc8105f544ce2736"),
            placement: 'left'
          }
        }), {
          name: 'mode',
          label: i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
          type: 'button-group-select',
          size: 'sm',
          // mode: 'inline',
          // className: 'block',
          pipeIn: defaultValue('normal', false),
          options: [{
            label: i18n("18c63459a2c069022c7790430f761214"),
            value: 'normal'
          }, {
            label: i18n("3720b9ef8053b7b8a54c7d8ace051912"),
            value: 'horizontal'
          }, {
            label: i18n("2dd25b8c21efbfee4a198787810d65d8"),
            value: 'inline'
          }]
        }, getSchemaTpl('horizontal', {
          visibleOn: 'this.mode == "horizontal"'
        }), getSchemaTpl('className'), getSchemaTpl('className', {
          name: 'staticClassName',
          label: i18n("905407c57ccd033cb6bd64bfad20a8c7")
        }), getSchemaTpl('className', {
          name: 'panelClassName',
          visibleOn: 'this.wrapWithPanel !== false',
          label: i18n("57d348e83d929dd4cb3bab04debc93a5"),
          description: i18n("9b26fa2b5943c827eea294e79b1427fa")
        })]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }, {
        title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
        body: [getSchemaTpl('ref'), getSchemaTpl('name', {
          test: !isCRUDFilter
        }), getSchemaTpl('switch', {
          name: 'debug',
          label: i18n("85ca671c1bb6de5a15456a9692d2edf4"),
          labelRemark: i18n("f24b7483069b44490a6379be5b90f4e3")
        }), getSchemaTpl('disabled'), getSchemaTpl('visible'), getSchemaTpl('static')]
      }])];
    };
    return _this;
  }
  Object.defineProperty(FormPlugin.prototype, "scaffoldForm", {
    get: function () {
      var i18nEnabled = getI18nEnabled();
      return {
        title: i18n("1b6f9adf1e6a41a18b9a76407d945618"),
        body: [getSchemaTpl('apiControl', {
          label: i18n("380c80efc8d38510d31f50578690b781")
        }), {
          name: 'mode',
          label: i18n("ffc2c1671eb7e3f6751006cd7a9961f4"),
          type: 'button-group-select',
          pipeIn: defaultValue('normal', false),
          options: [{
            label: i18n("81f8a50d084992815ab844109b3ea27f"),
            value: 'normal'
          }, {
            label: i18n("3720b9ef8053b7b8a54c7d8ace051912"),
            value: 'horizontal'
          }, {
            label: i18n("2dd25b8c21efbfee4a198787810d65d8"),
            value: 'inline'
          }]
        }, {
          label: i18n("9d68944682609cb230534195ca7c62ae"),
          type: 'combo',
          name: 'body',
          multiple: true,
          draggable: true,
          multiLine: false,
          items: __spreadArray(__spreadArray([], __read(getFormItemOptions({
            i18nEnabled: i18nEnabled
          })), false), [{
            visibleOn: 'data.type === "group"',
            type: 'combo',
            name: 'body',
            label: i18n("cf993a1d9c0352215055d180aca60b97"),
            multiple: true,
            draggable: true,
            multiLine: true,
            items: __spreadArray([], __read(getFormItemOptions({
              i18nEnabled: i18nEnabled
            })), false)
          }], false)
        }],
        pipeOut: function (values) {
          autoAddOptions(values);
          return values;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  FormPlugin.prototype.afterUpdate = function (event) {
    var _a;
    var context = event.context;
    if (context.info.renderer.name === 'form' && ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) {
      var _a;
      return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'wrapWithPanel';
    }))) {
      this.manager.buildPanels();
    }
  };
  FormPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
      var jsonschema, pool, current, schema, _g, _h, _j, schema, _k, _l, _m;
      var _o;
      return __generator(this, function (_p) {
        switch (_p.label) {
          case 0:
            jsonschema = {
              $id: 'formItems',
              type: 'object',
              properties: {}
            };
            pool = node.children.concat();
            _p.label = 1;
          case 1:
            if (!pool.length) return [3 /*break*/, 13];
            current = pool.shift();
            if (!(((_a = current.rendererConfig) === null || _a === void 0 ? void 0 : _a.type) === 'combo')) return [3 /*break*/, 6];
            schema = current.schema;
            if (!schema.name) return [3 /*break*/, 5];
            _g = jsonschema.properties;
            _h = schema.name;
            _o = {
              type: 'array',
              title: schema.label || schema.name
            };
            if (!((_c = (_b = current.info) === null || _b === void 0 ? void 0 : _b.plugin) === null || _c === void 0 ? void 0 : _c.buildDataSchemas)) return [3 /*break*/, 3];
            return [4 /*yield*/, current.info.plugin.buildDataSchemas(current, region)];
          case 2:
            _j = _p.sent();
            return [3 /*break*/, 4];
          case 3:
            _j = {
              type: 'object',
              properties: {}
            };
            _p.label = 4;
          case 4:
            _g[_h] = (_o.items = _j, _o);
            _p.label = 5;
          case 5:
            return [3 /*break*/, 12];
          case 6:
            if (!((_d = current.rendererConfig) === null || _d === void 0 ? void 0 : _d.isFormItem)) return [3 /*break*/, 11];
            schema = current.schema;
            if (!schema.name) return [3 /*break*/, 10];
            _k = jsonschema.properties;
            _l = schema.name;
            if (!((_f = (_e = current.info) === null || _e === void 0 ? void 0 : _e.plugin) === null || _f === void 0 ? void 0 : _f.buildDataSchemas)) return [3 /*break*/, 8];
            return [4 /*yield*/, current.info.plugin.buildDataSchemas(current, region)];
          case 7:
            _m = _p.sent();
            return [3 /*break*/, 9];
          case 8:
            _m = {
              type: 'string',
              title: schema.label || schema.name,
              originalValue: schema.value // 记录原始值，循环引用检测需要
            };

            _p.label = 9;
          case 9:
            _k[_l] = _m;
            _p.label = 10;
          case 10:
            return [3 /*break*/, 12];
          case 11:
            pool.push.apply(pool, __spreadArray([], __read(current.children), false));
            _p.label = 12;
          case 12:
            return [3 /*break*/, 1];
          case 13:
            return [2 /*return*/, jsonschema];
        }
      });
    });
  };
  FormPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'inited') {
      // 监听 form 的 inited 事件，把数据加入到上下文中
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = __assign({
        $id: 'formInitedData'
      }, jsonToJsonSchema(data));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  return FormPlugin;
}(BasePlugin);
registerEditorPlugin(FormPlugin);

export { FormPlugin };
