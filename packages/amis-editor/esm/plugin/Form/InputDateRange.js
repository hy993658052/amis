/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __assign, __extends } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { FormulaDateType } from '../../renderer/FormulaControl.js';
import { getRendererByName } from 'amis-core';
import { i18n } from 'i18n-runtime';

var DateType = {
  date: __assign(__assign({}, getRendererByName('input-date-range')), {
    format: 'YYYY-MM-DD',
    placeholder: i18n("a2847d82fc998cbe25447b14d113234b"),
    ranges: ['yesterday', '7daysago', 'prevweek', 'thismonth', 'prevmonth', 'prevquarter']
  }),
  datetime: __assign(__assign({}, getRendererByName('input-datetime-range')), {
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: i18n("3f9c3a9eb55b7116bcaa6b614ecb38be"),
    ranges: ['yesterday', '7daysago', 'prevweek', 'thismonth', 'prevmonth', 'prevquarter']
  }),
  time: __assign(__assign({}, getRendererByName('input-time-range')), {
    format: 'HH:mm',
    placeholder: i18n("ddc4a982defd88cd164c61da914819e1"),
    ranges: []
  }),
  month: __assign(__assign({}, getRendererByName('input-month-range')), {
    format: 'YYYY-MM',
    placeholder: i18n("c899221db27c8b3606ce7c807f0765f2"),
    ranges: []
  }),
  quarter: __assign(__assign({}, getRendererByName('input-quarter-range')), {
    format: 'YYYY [Q]Q',
    placeholder: i18n("c09ddfc72d3c34ae6aa76d5a457cb403"),
    ranges: ['thisquarter', 'prevquarter']
  }),
  year: __assign(__assign({}, getRendererByName('input-year-range')), {
    format: 'YYYY',
    placeholder: i18n("cb6deedf9cd4a0b65abd70798cfed85e"),
    ranges: ['thisyear', 'lastYear']
  })
};
var dateTooltip = i18n("6b3c2a07db1bb3c229bbc5df48068792");
var rangTooltip = i18n("dcc94ea1715bd502c709c5d5092e9c82");
var sizeImmutableComponents = Object.values(DateType).map(function (item) {
  return (item === null || item === void 0 ? void 0 : item.sizeMutable) === false ? item.type : null;
}).filter(function (a) {
  return a;
});
var DateRangeControlPlugin = /** @class */function (_super) {
  __extends(DateRangeControlPlugin, _super);
  function DateRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-date-range';
    _this.$schema = '/schemas/DateRangeControlSchema.json';
    _this.order = -440;
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-date-range-plugin';
    _this.name = i18n("7866226eb814f681dcc4037e7489aab8");
    _this.isBaseComponent = true;
    // 添加源对应组件中文名称 & type字段
    _this.searchKeywords = i18n("28de3d73d839b616bd617b3636669780");
    _this.description = i18n("9024ff398faf8340b92bf0208431973b");
    _this.docLink = '/amis/zh-CN/components/form/input-date-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-date-range',
      label: i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'date-range'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("7866226eb814f681dcc4037e7489aab8");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("96f9d9fc9cef8b18e3cd1cf9077147d1"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18n("0a72b3858efffaa1bab685fa840b701b")
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("f6db3514c72bdc34922f137a8a92b997"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18n("0a72b3858efffaa1bab685fa840b701b")
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("0f5fc3b84cf9c24ff3acae45ae22fb57"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18n("0a72b3858efffaa1bab685fa840b701b")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("3086da6514671fb8950171bf3af4ab2d")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('selectDateRangeType', {
            value: _this.scaffold.type,
            onChange: function (value, oldValue, model, form) {
              var _a, _b, _c, _d;
              var type = value.split('-')[1];
              form.setValues({
                inputFormat: (_a = DateType[type]) === null || _a === void 0 ? void 0 : _a.format,
                placeholder: (_b = DateType[type]) === null || _b === void 0 ? void 0 : _b.placeholder,
                format: type === 'time' ? 'HH:mm' : 'X',
                minDate: '',
                maxDate: '',
                value: '',
                ranges: (_c = DateType[type]) === null || _c === void 0 ? void 0 : _c.ranges,
                // size immutable 组件去除 size 字段
                size: sizeImmutableComponents.includes(value) ? undefined : (_d = form.data) === null || _d === void 0 ? void 0 : _d.size
              });
            }
          }), {
            type: 'input-text',
            name: 'format',
            label: tipedLabel(i18n("db0258df1ddbd88749b335aecdc8425e"), i18n("e02d111d524de97e8622121f7ce845cf")),
            pipeIn: defaultValue('X')
          }, {
            type: 'input-text',
            name: 'inputFormat',
            label: tipedLabel(i18n("ecd1a3cadcf1d55250afafbbde767250"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            pipeIn: defaultValue('YYYY-MM-DD'),
            clearable: true
            // onChange: (
            //   value: string,
            //   oldValue: any,
            //   model: any,
            //   form: any
            // ) => {
            //   model.setOptions(
            //     DateType[form.data.type.split('-')[1]].formatOptions
            //   );
            // },
            // options:
            //   DateType[this.scaffold.type.split('-')[1]].formatOptions
          }, getSchemaTpl('utc'), getSchemaTpl('clearable', {
            pipeIn: defaultValue(true)
          }), getSchemaTpl('valueFormula', {
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              size: 'full',
              mode: 'inline'
            }),
            mode: 'vertical',
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsRange,
            label: tipedLabel(i18n("225f3ed00750ae78ad1e6ea42c8f5087"), dateTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'minDate',
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsDate,
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.minDate,
              type: 'input-date'
            }),
            placeholder: i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            needDeleteProps: ['minDate'],
            label: tipedLabel(i18n("c322edb884724d04842fc35f4d29a24e"), dateTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'maxDate',
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsDate,
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.maxDate,
              type: 'input-date'
            }),
            placeholder: i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            needDeleteProps: ['maxDate'],
            label: tipedLabel(i18n("5da893141114a59da868052b3a17a79a"), dateTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'minDuration',
            header: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            DateTimeType: FormulaDateType.NotDate,
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.minDuration,
              type: 'input-text'
            }),
            placeholder: i18n("13ce82d026daa5a30e50105bd2a204a6"),
            needDeleteProps: ['minDuration'],
            label: tipedLabel(i18n("e7271563debf3c7bcb85e23816c35acb"), rangTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'maxDuration',
            header: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            DateTimeType: FormulaDateType.NotDate,
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.maxDuration,
              type: 'input-text'
            }),
            placeholder: i18n("13ce82d026daa5a30e50105bd2a204a6"),
            needDeleteProps: ['maxDuration'],
            label: tipedLabel(i18n("6da95498bea887b2ea7c6c2bb4b2fdc3"), rangTooltip)
          }), getSchemaTpl('dateShortCutControl', {
            mode: 'normal',
            normalDropDownOption: {
              yesterday: i18n("2f8d6f1584b73bfc6dada44526abb502"),
              thisweek: i18n("0dc86a275145ad5a7774e594f0d94a06"),
              prevweek: i18n("79abd4ee3661ff70c7d79716c8aaed83"),
              thismonth: i18n("8f2a5a5f6e3777c7a0e1ce9484a2f7d7"),
              prevmonth: i18n("d5578d93388a5b2552316418cd1124da"),
              thisquarter: i18n("ffb2b7fbf227d9d21e03d0f160fb2a34"),
              prevquarter: i18n("dd657784cc0d5511d2f25459e49ead1a"),
              thisyear: i18n("d3dbc7a7fd9fc5ccd168084c8579c1ec")
            },
            customDropDownOption: {
              daysago: i18n("fd312ae2f1c24b8a14d9412bb3c6bb76"),
              dayslater: i18n("68cba5f27ab003cfada5eb4c1f29eb21"),
              weeksago: i18n("34b06708894a178c440e6f6539e95e9e"),
              weekslater: i18n("f0e1b8d8a6e731360d7348bc8301d44a"),
              monthsago: i18n("5cad2778bb8f01d1a1b1226082eb2117"),
              monthslater: i18n("ff76f60b3da86a0d2c6663b170a7955a"),
              quartersago: i18n("9ff9b56c9ed633ee09396830e93113ad"),
              quarterslater: i18n("2b80b20008b3ae81136217ae10a1fbaf"),
              yearsago: i18n("84752114d27119dc50d8a7b9ac0b788b"),
              yearslater: i18n("5df2352afebd73d1f568ebaa81e2db28")
            }
          }), getSchemaTpl('remark'), getSchemaTpl('labelRemark'), getSchemaTpl('startPlaceholder'), getSchemaTpl('endPlaceholder'), getSchemaTpl('autoFillApi')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Date
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: __assign(__assign({}, renderer), {
            sizeMutable: false
          }),
          schema: [
          // 需要作为一个字符串表达式传入，因为切换 type 后 panelBodyCreator 不会重新执行
          getSchemaTpl('formItemSize', {
            hiddenOn: "[\"".concat(sizeImmutableComponents.join('","'), "\"].includes(this.type)")
          })]
        }), getSchemaTpl('style:classNames', [getSchemaTpl('className', {
          label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          name: 'descriptionClassName',
          visibleOn: 'this.description'
        }), getSchemaTpl('className', {
          name: 'addOn.className',
          label: 'AddOn',
          visibleOn: 'this.addOn && this.addOn.type === "text"'
        })]), getSchemaTpl('style:others', [{
          name: 'embed',
          type: 'button-group-select',
          size: 'md',
          label: i18n("f0789e79d48f135e5d870753f7a85d05"),
          mode: 'row',
          pipeIn: defaultValue(false),
          options: [{
            label: i18n("a553741d5ebb9c80d7d2a63b202cf4b8"),
            value: false
          }, {
            label: i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
            value: true
          }]
        }])], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'style'
        }))
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  return DateRangeControlPlugin;
}(BasePlugin);
registerEditorPlugin(DateRangeControlPlugin);

export { DateRangeControlPlugin };
