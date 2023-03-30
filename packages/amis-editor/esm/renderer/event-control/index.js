/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __awaiter, __generator, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import Sortable from 'sortablejs';
import { DataSchema, TooltipWrapper, Icon, render, FormItem } from 'amis';
import cloneDeep from 'lodash/cloneDeep';
import { findTree, autobind } from 'amis-core';
import ActionDialog from './action-config-dialog.js';
import { getPropOfAcion, findActionNode, findSubActionNode, SELECT_PROPS_CONTAINER, getActionType, getEventStrongDesc, getEventDesc, getEventLabel } from './helper.js';
export { ACTION_TYPE_TREE, COMMON_ACTION_SCHEMA_MAP, DATA_CONTAINER, FORMITEM_CMPTS, IS_DATA_CONTAINER, SELECT_PROPS_CONTAINER, SHOW_SELECT_PROP, SUPPORT_DISABLED_CMPTS, SUPPORT_STATIC_FORMITEM_CMPTS, findActionNode, findSubActionNode, getActionType, getArgsWrapper, getEventControlConfig, getEventDesc, getEventLabel, getEventStrongDesc, getOldActionSchema, getPropOfAcion, hasActionType, renderCmptActionSelect, renderCmptSelect } from './helper.js';
import { i18n } from 'i18n-runtime';
import { reaction } from 'mobx';

var EventControl = /** @class */function (_super) {
  __extends(EventControl, _super);
  function EventControl(props) {
    var _this = _super.call(this, props) || this;
    _this.eventPanelSortMap = {};
    var events = props.events,
      value = props.value,
      data = props.data;
    var eventPanelActive = {};
    var pluginEvents = events[!data.type || data.type === 'text' ? 'plain' : data.type] || [];
    pluginEvents.forEach(function (event) {
      eventPanelActive[event.eventName] = true;
    });
    _this.state = {
      onEvent: value !== null && value !== void 0 ? value : _this.generateEmptyDefault(pluginEvents),
      events: pluginEvents,
      eventPanelActive: eventPanelActive,
      showAcionDialog: false,
      showEventDialog: false,
      actionData: undefined,
      type: 'add',
      appLocaleState: 0
    };
    return _this;
  }
  EventControl.prototype.componentDidMount = function () {
    var _this = this;
    var editorStore = window.editorStore;
    this.unReaction = reaction(function () {
      return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
    }, function () {
      _this.setState({
        appLocaleState: editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState
      });
    });
  };
  EventControl.prototype.componentWillUnmount = function () {
    var _a;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  EventControl.prototype.componentDidUpdate = function (prevProps, prevState) {
    var _a = this.props,
      value = _a.value,
      onChange = _a.onChange;
    if (value !== prevProps.value) {
      this.setState({
        onEvent: value
      });
    }
    if (prevState.onEvent !== this.state.onEvent) {
      onChange && onChange(this.state.onEvent);
    }
  };
  EventControl.prototype.generateEmptyDefault = function (events) {
    var onEvent = {};
    events.forEach(function (event) {
      if (event.defaultShow) {
        onEvent["".concat(event.eventName)] = {
          __isBroadcast: !!event.isBroadcast,
          weight: 0,
          actions: []
        };
      }
    });
    // Object.keys(onEvent).length && props.onChange && props.onChange(onEvent);
    return Object.keys(onEvent).length ? onEvent : {};
  };
  EventControl.prototype.addEvent = function (event, disabled) {
    var onChange = this.props.onChange;
    var onEvent = __assign({}, this.state.onEvent);
    if (disabled) {
      return;
    }
    onEvent["".concat(event.eventName)] = {
      __isBroadcast: !!event.isBroadcast,
      weight: 0,
      actions: []
    };
    this.setState({
      onEvent: onEvent
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.activeEventDialog = function (eventInfo) {
    if (!eventInfo.debounce) {
      // 防抖配置的默认值
      eventInfo.debounce = {
        open: false,
        wait: 100
      };
    } else {
      eventInfo.debounce = __assign({
        open: true
      }, eventInfo.debounce);
    }
    this.setState({
      eventDialogData: eventInfo,
      showEventDialog: true
    });
  };
  EventControl.prototype.eventDialogSubmit = function (formData) {
    var onChange = this.props.onChange;
    var eventName = formData.eventName,
      _a = formData.debounce,
      debounce = _a === void 0 ? {} : _a;
    var onEvent = __assign({}, this.state.onEvent);
    var eventConfig = onEvent["".concat(eventName)];
    if (!debounce.open) {
      delete eventConfig.debounce;
    } else {
      eventConfig = __assign(__assign({}, eventConfig), {
        debounce: {
          wait: debounce.wait
        }
      });
    }
    onEvent["".concat(eventName)] = __assign({}, eventConfig);
    this.setState({
      onEvent: onEvent,
      showEventDialog: false
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.delEvent = function (event) {
    var onChange = this.props.onChange;
    var onEvent = __assign({}, this.state.onEvent);
    delete onEvent[event];
    this.setState({
      onEvent: onEvent
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.addAction = function (event, config) {
    var _a = this.props,
      addBroadcast = _a.addBroadcast,
      owner = _a.owner;
    var _b = this.state,
      onEvent = _b.onEvent,
      eventPanelActive = _b.eventPanelActive;
    var onEventConfig = __assign({}, onEvent);
    var activeConfig = __assign({}, eventPanelActive);
    if (config.actionType === 'broadcast') {
      typeof addBroadcast === 'function' && addBroadcast({
        owner: owner,
        isBroadcast: true,
        eventName: config.eventName,
        eventLabel: config.eventLabel,
        description: config.description
      });
    }
    activeConfig[event] = true;
    if (config.actionType) {
      onEventConfig[event] = __assign(__assign({}, onEventConfig[event]), {
        actions: onEventConfig[event].actions.concat(config)
      });
    }
    this.setState({
      onEvent: onEventConfig,
      eventPanelActive: activeConfig
    });
    this.initDragging();
    this.props.onChange && this.props.onChange(onEventConfig);
  };
  EventControl.prototype.updateAction = function (event, index, config) {
    this.updateValue(event, index, config);
  };
  EventControl.prototype.delAction = function (event, action, index) {
    var _a;
    var _b = this.state,
      onEvent = _b.onEvent,
      eventPanelActive = _b.eventPanelActive;
    var removeBroadcast = this.props.removeBroadcast;
    var onEventConfig = __assign({}, onEvent);
    var activeConfig = __assign({}, eventPanelActive);
    // 删掉对应广播
    if (action.actionType === 'broadcast') {
      typeof removeBroadcast === 'function' && removeBroadcast(action.eventName);
    }
    onEventConfig[event] = {
      actions: onEventConfig[event].actions.filter(function (item, actionIndex) {
        return index !== actionIndex;
      }),
      weight: onEvent[event].weight
    };
    if (onEventConfig[event].actions.length < 1) {
      activeConfig[event] = false;
      this.setState({
        eventPanelActive: activeConfig
      });
      (_a = this.eventPanelSortMap[event]) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    this.setState({
      onEvent: onEventConfig
    });
    this.props.onChange && this.props.onChange(onEventConfig);
  };
  EventControl.prototype.toggleActivePanel = function (eventKey) {
    var _this = this;
    var _a;
    var eventPanelActive = this.state.eventPanelActive;
    eventPanelActive[eventKey] = !eventPanelActive[eventKey];
    if (!eventPanelActive[eventKey]) {
      (_a = this.eventPanelSortMap[eventKey]) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    this.setState({
      eventPanelActive: eventPanelActive
    }, function () {
      _this.initDragging();
    });
  };
  EventControl.prototype.updateWeight = function (event, data) {
    var onEvent = this.state.onEvent;
    var onEventConfig = __assign({}, onEvent);
    onEventConfig[event] = __assign(__assign({}, onEventConfig[event]), {
      weight: data.weight || 0
    });
    this.setState({
      onEvent: onEventConfig
    });
  };
  /**
   * 更新事件配置
   *
   * @param {string} event
   * @param {number} actionIndex
   * @param {*} config
   * @memberof EventControl
   */
  EventControl.prototype.updateValue = function (event, index, config) {
    return __awaiter(this, void 0, void 0, function () {
      var onEvent, emptyEventAcion, onEventConfig;
      return __generator(this, function (_a) {
        onEvent = this.state.onEvent;
        emptyEventAcion = __assign({}, onEvent);
        onEventConfig = __assign({}, onEvent);
        emptyEventAcion[event] = {
          actions: onEvent[event].actions.map(function (item, actionIndex) {
            return actionIndex === index ? {
              actionType: ''
            } : item;
          }),
          weight: onEvent[event].weight
        };
        onEventConfig[event] = __assign(__assign({}, onEvent[event]), {
          actions: onEvent[event].actions.map(function (item, actionIndex) {
            return actionIndex === index ? typeof config === 'string' ? __assign(__assign({}, item), {
              actionType: config
            }) : config : item;
          })
        });
        this.setState({
          onEvent: onEventConfig
        });
        this.props.onChange && this.props.onChange(onEventConfig);
        return [2 /*return*/];
      });
    });
  };

  EventControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  EventControl.prototype.initDragging = function () {
    var _this = this;
    this.eventPanelSortMap = {};
    var dom = findDOMNode(this);
    var _a = this.state,
      onEvent = _a.onEvent,
      eventPanelActive = _a.eventPanelActive;
    var eventPanel = Array.prototype.slice.call(dom.getElementsByClassName('item-content'));
    // 找到激活的事件面板
    Object.keys(onEvent).filter(function (key) {
      return onEvent[key].actions.length && eventPanelActive[key];
    }).forEach(function (key, index) {
      if (!_this.eventPanelSortMap[key]) {
        _this.eventPanelSortMap[key] = _this.genSortPanel(key, eventPanel[index]);
      }
    });
  };
  EventControl.prototype.genSortPanel = function (eventKey, ele) {
    var _this = this;
    return new Sortable(ele, {
      group: 'eventControlGroup',
      animation: 150,
      handle: '.ae-option-control-item-dragBar',
      ghostClass: 'ae-option-control-item--dragging',
      onEnd: function (e) {
        // 没有移动
        if (e.newIndex === e.oldIndex) {
          return;
        }
        // 换回来
        var parent = e.to;
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var onEventConfig = cloneDeep(_this.state.onEvent);
        var newEvent = onEventConfig[eventKey];
        var options = newEvent === null || newEvent === void 0 ? void 0 : newEvent.actions.concat();
        // 从后往前移
        if (e.oldIndex > e.newIndex) {
          options = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(options.slice(0, e.newIndex)), false), [options[e.oldIndex]], false), __read(options.slice(e.newIndex, e.oldIndex)), false), __read(options.slice(e.oldIndex + 1, options.length)), false);
        } else if (e.oldIndex < e.newIndex) {
          // 从前往后
          options = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(e.oldIndex === 0 ? [] : options.slice(0, e.oldIndex)), false), __read(options.slice(e.oldIndex + 1, e.newIndex)), false), [options[e.oldIndex]], false), __read(options.slice(e.newIndex, options.length)), false);
        }
        onEventConfig[eventKey] = __assign(__assign({}, onEventConfig[eventKey]), {
          actions: options
        });
        _this.setState({
          onEvent: onEventConfig
        });
      }
    });
  };
  EventControl.prototype.destroyDragging = function () {
    var _this = this;
    Object.keys(this.eventPanelSortMap).forEach(function (key) {
      var _a;
      (_a = _this.eventPanelSortMap[key]) === null || _a === void 0 ? void 0 : _a.destroy();
    });
  };
  EventControl.prototype.getEventVariables = function (activeData) {
    var _a;
    var _b = this.state,
      events = _b.events,
      onEvent = _b.onEvent;
    var _c = this.props,
      actionTree = _c.actionTree,
      pluginActions = _c.pluginActions,
      commonActions = _c.commonActions,
      allComponents = _c.allComponents;
    // 收集当前事件已有ajax动作的请求返回结果作为事件变量
    var oldActions = onEvent[activeData.actionData.eventKey].actions;
    if (activeData.type === 'update') {
      // 编辑的时候只能拿到当前动作前面动作的事件变量
      oldActions = oldActions.slice(0, activeData.actionData.actionIndex);
    }
    var withOutputVarActions = oldActions === null || oldActions === void 0 ? void 0 : oldActions.filter(function (item) {
      return item.outputVar;
    });
    var withOutputVarVariables = withOutputVarActions === null || withOutputVarActions === void 0 ? void 0 : withOutputVarActions.map(function (item, index) {
      var _a;
      var actionLabel = getPropOfAcion(item, 'actionLabel', actionTree, pluginActions, commonActions, allComponents);
      var dataSchemaJson = getPropOfAcion(item, 'outputVarDataSchema', actionTree, pluginActions, commonActions, allComponents);
      var dataSchema = new DataSchema(dataSchemaJson || []);
      return {
        label: "".concat(item.outputVar ? item.outputVar + "\uFF08".concat(actionLabel, "\u7ED3\u679C\uFF09") : "".concat(actionLabel, "\u7ED3\u679C")),
        tag: 'object',
        children: (_a = dataSchema.getDataPropsAsOptions()) === null || _a === void 0 ? void 0 : _a.map(function (variable) {
          return __assign(__assign({}, variable), {
            value: variable.value.replace('${outputVar}', item.outputVar)
          });
        })
      };
    });
    var eventVariables = [{
      label: i18n("0b446df580ad309e7c26e5242eddafac"),
      children: withOutputVarVariables || []
    }];
    var eventConfig = events.find(function (item) {
      return item.eventName === activeData.actionData.eventKey;
    });
    (_a = eventConfig === null || eventConfig === void 0 ? void 0 : eventConfig.dataSchema) === null || _a === void 0 ? void 0 : _a.forEach(function (ds) {
      var dataSchema = new DataSchema(ds || []);
      eventVariables[0].children = __spreadArray(__spreadArray([], __read(eventVariables[0].children), false), __read(dataSchema.getDataPropsAsOptions()), false);
    });
    return eventVariables;
  };
  // 唤起动作配置弹窗
  EventControl.prototype.activeActionDialog = function (data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, pluginActions, getContextSchemas, actionConfigInitFormatter, getComponents, actionTree, allComponents, manager, rawVariables, dataSchemaIns, eventVariables, appVariables, variables, systemVarIndex, action_1, actionConfig, actionNode, hasSubActionNode, supportComponents, node, setValueDs, targetDataSchema, targetDataSchemaIns, targetVariables;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = this.props, pluginActions = _b.actions, getContextSchemas = _b.getContextSchemas, actionConfigInitFormatter = _b.actionConfigInitFormatter, getComponents = _b.getComponents, actionTree = _b.actionTree, allComponents = _b.allComponents, manager = _b.manager;
            rawVariables = [];
            if (!getContextSchemas) return [3 /*break*/, 2];
            return [4 /*yield*/, getContextSchemas()];
          case 1:
            dataSchemaIns = _c.sent();
            rawVariables = dataSchemaIns === null || dataSchemaIns === void 0 ? void 0 : dataSchemaIns.getDataPropsAsOptions();
            _c.label = 2;
          case 2:
            eventVariables = this.getEventVariables(data);
            appVariables = ((_a = manager === null || manager === void 0 ? void 0 : manager.variableManager) === null || _a === void 0 ? void 0 : _a.getVariableFormulaOptions()) || [];
            variables = __spreadArray(__spreadArray([], __read(eventVariables), false), __read(rawVariables), false);
            systemVarIndex = variables.findIndex(function (item) {
              return item.label === i18n("979a50681e278dcc0be18f68459e8217");
            });
            // 插入应用变量
            if (!!~systemVarIndex) {
              appVariables.forEach(function (item) {
                if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                  variables.splice(systemVarIndex, 0, item);
                }
              });
            } else {
              appVariables.forEach(function (item) {
                if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                  variables.push(item);
                }
              });
            }
            variables.forEach(function (item) {
              return item.selectMode = 'tree';
            });
            if (!(data.type === 'update')) return [3 /*break*/, 6];
            action_1 = data.actionData.action;
            return [4 /*yield*/, actionConfigInitFormatter === null || actionConfigInitFormatter === void 0 ? void 0 : actionConfigInitFormatter(action_1, {
              eventVariables: eventVariables,
              rawVariables: rawVariables
            })];
          case 3:
            actionConfig = _c.sent();
            actionNode = findActionNode(actionTree, actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType);
            hasSubActionNode = findSubActionNode(actionTree, action_1.actionType);
            supportComponents = getComponents(actionNode);
            node = findTree(supportComponents, function (item) {
              return item.value === action_1.componentId;
            });
            setValueDs = null;
            if (!((actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType) === 'setValue' && (node === null || node === void 0 ? void 0 : node.id) && SELECT_PROPS_CONTAINER.includes((node === null || node === void 0 ? void 0 : node.type) || ''))) return [3 /*break*/, 5];
            return [4 /*yield*/, getContextSchemas === null || getContextSchemas === void 0 ? void 0 : getContextSchemas(node.id, true)];
          case 4:
            targetDataSchema = _c.sent();
            targetDataSchemaIns = new DataSchema(targetDataSchema || []);
            targetVariables = (targetDataSchemaIns === null || targetDataSchemaIns === void 0 ? void 0 : targetDataSchemaIns.getDataPropsAsOptions()) || [];
            setValueDs = targetVariables === null || targetVariables === void 0 ? void 0 : targetVariables.filter(function (item) {
              return item.value !== '$$id';
            });
            _c.label = 5;
          case 5:
            data.actionData = __assign(__assign({
              eventKey: data.actionData.eventKey,
              actionIndex: data.actionData.actionIndex,
              variables: variables,
              pluginActions: pluginActions,
              getContextSchemas: getContextSchemas,
              rawVariables: rawVariables
            }, actionConfig), {
              groupType: (actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.__actionType) || action_1.actionType,
              __actionDesc: actionNode.description,
              __actionSchema: actionNode.schema,
              __subActions: hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions,
              __cmptTreeSource: supportComponents !== null && supportComponents !== void 0 ? supportComponents : [],
              __superCmptTreeSource: allComponents,
              // __supersCmptTreeSource: '',
              __setValueDs: setValueDs
            });
            // 选中项自动滚动至可见位置
            setTimeout(function () {
              var _a;
              return (_a = document.querySelector('.action-tree li .is-checked')) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
            }, 0);
            return [3 /*break*/, 7];
          case 6:
            data.actionData = {
              eventKey: data.actionData.eventKey,
              variables: variables,
              pluginActions: pluginActions,
              getContextSchemas: getContextSchemas,
              rawVariables: rawVariables,
              __superCmptTreeSource: allComponents
            };
            _c.label = 7;
          case 7:
            this.setState(data);
            return [2 /*return*/];
        }
      });
    });
  };
  // 渲染描述信息
  EventControl.prototype.renderDesc = function (action) {
    var _a = this.props,
      pluginActions = _a.actions,
      actionTree = _a.actionTree,
      commonActions = _a.commonActions,
      getComponents = _a.getComponents,
      allComponents = _a.allComponents;
    var desc = getPropOfAcion(action, 'descDetail', actionTree, pluginActions, commonActions, allComponents);
    var info = __assign({}, action);
    // 根据子动作类型获取动作树节点的配置
    var hasSubActionNode = findSubActionNode(actionTree, action.actionType);
    var actionType = getActionType(action, hasSubActionNode);
    var actionNode = actionType && findActionNode(actionTree, actionType);
    if (action.componentId && actionNode) {
      var supportComponents = getComponents(actionNode);
      var node = findTree(supportComponents, function (item) {
        return item.value === action.componentId;
      });
      if (node) {
        info = __assign(__assign({}, info), {
          rendererLabel: node.label
        });
      }
    }
    return typeof desc === 'function' ? React__default.createElement("div", {
      className: "action-control-content"
    }, (desc === null || desc === void 0 ? void 0 : desc(info)) || '-') : null;
  };
  EventControl.prototype.onSubmit = function (type, config) {
    var _a, _b, _c;
    var actionConfigSubmitFormatter = this.props.actionConfigSubmitFormatter;
    var action = (_a = actionConfigSubmitFormatter === null || actionConfigSubmitFormatter === void 0 ? void 0 : actionConfigSubmitFormatter(config)) !== null && _a !== void 0 ? _a : config;
    if (type === 'add') {
      (_b = this.addAction) === null || _b === void 0 ? void 0 : _b.call(this, config.eventKey, action);
    } else if (type === 'update') {
      (_c = this.updateAction) === null || _c === void 0 ? void 0 : _c.call(this, config.eventKey, config.actionIndex, action);
    }
    this.setState({
      showAcionDialog: false
    });
    this.setState({
      actionData: undefined
    });
  };
  EventControl.prototype.onClose = function () {
    this.setState({
      showAcionDialog: false
    });
  };
  EventControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      actionTree = _a.actionTree,
      pluginActions = _a.actions,
      commonActions = _a.commonActions,
      getComponents = _a.getComponents,
      allComponents = _a.allComponents,
      render$1 = _a.render;
    var _b = this.state,
      onEvent = _b.onEvent,
      events = _b.events,
      eventPanelActive = _b.eventPanelActive,
      showAcionDialog = _b.showAcionDialog,
      showEventDialog = _b.showEventDialog,
      type = _b.type,
      actionData = _b.actionData,
      eventDialogData = _b.eventDialogData;
    var eventSnapshot = cloneDeep(onEvent);
    var showOldEntry = this.props.showOldEntry;
    var eventKeys = Object.keys(eventSnapshot);
    return React__default.createElement("div", {
      className: "ae-event-control"
    }, React__default.createElement("header", {
      className: cx({
        'ae-event-control-header': true,
        'ae-event-control-header-oldentry': showOldEntry,
        'no-bd-btm': !eventKeys.length
      })
    }, render$1('dropdown', {
      type: 'dropdown-button',
      level: 'enhance',
      label: i18n("1fab2b4934161e87a1f0133b9d5bc1b5"),
      disabled: false,
      className: 'block w-full add-event-dropdown',
      closeOnClick: true,
      buttons: events.map(function (item) {
        return {
          type: 'button',
          disabledTip: i18n("3371427f1b82095309092ef82418ec1a"),
          tooltipPlacement: 'left',
          disabled: Object.keys(onEvent).includes(item.eventName),
          actionType: '',
          label: item.eventLabel,
          onClick: _this.addEvent.bind(_this, item, Object.keys(onEvent).includes(item.eventName))
        };
      })
    }, {
      popOverContainer: null // amis 渲染挂载节点会使用 this.target
    })), React__default.createElement("ul", {
      className: cx({
        'ae-event-control-content': true,
        'ae-event-control-content-oldentry': showOldEntry
      }),
      ref: this.dragRef
    }, eventKeys.length ? eventKeys.map(function (eventKey, eventIndex) {
      var _a;
      return React__default.createElement("li", {
        className: "event-item",
        key: "content_".concat(eventIndex)
      }, React__default.createElement("div", {
        className: cx({
          'event-item-header': true,
          'no-bd-btm': !(((_a = eventSnapshot[eventKey].actions) === null || _a === void 0 ? void 0 : _a.length) && eventPanelActive[eventKey]) && !getEventStrongDesc(events, eventKey)
        })
      }, React__default.createElement(TooltipWrapper, {
        tooltipClassName: "event-item-header-tip",
        trigger: "hover",
        placement: "top",
        tooltip: {
          children: function () {
            return React__default.createElement("div", null, getEventDesc(events, eventKey) || getEventStrongDesc(events, eventKey) || eventKey);
          }
        }
      }, React__default.createElement("div", null, getEventLabel(events, eventKey) || eventKey)), React__default.createElement("div", {
        className: "event-item-header-toolbar"
      }, React__default.createElement("div", {
        onClick: _this.activeActionDialog.bind(_this, {
          showAcionDialog: true,
          type: 'add',
          actionData: {
            eventKey: eventKey
          }
        })
      }, React__default.createElement(Icon, {
        className: "icon",
        icon: "add-btn"
      })), React__default.createElement("div", {
        onClick: _this.delEvent.bind(_this, eventKey)
      }, React__default.createElement(Icon, {
        className: "icon",
        icon: "delete-bold-btn"
      })), React__default.createElement("div", {
        onClick: _this.activeEventDialog.bind(_this, __assign({
          eventName: eventKey,
          eventLabel: getEventLabel(events, eventKey) || eventKey
        }, eventSnapshot[eventKey]))
      }, React__default.createElement(Icon, {
        className: "icon",
        icon: "event-setting"
      })), React__default.createElement("div", {
        onClick: _this.toggleActivePanel.bind(_this, eventKey)
      }, eventPanelActive[eventKey] ? React__default.createElement(Icon, {
        className: "icon",
        icon: "open-btn-r"
      }) : React__default.createElement(Icon, {
        className: "icon",
        icon: "close-btn"
      })))), getEventStrongDesc(events, eventKey) ? render$1('alert', {
        type: 'alert',
        body: i18n("0e9525b2bb1493c567c114dd61b69095") + getEventStrongDesc(events, eventKey),
        level: 'info',
        showCloseButton: true,
        showIcon: true,
        className: 'event-item-desc'
      }) : null, eventSnapshot[eventKey].actions.length && eventPanelActive[eventKey] ? React__default.createElement("ul", {
        className: "item-content"
      }, eventSnapshot[eventKey].actions.map(function (action, actionIndex) {
        return React__default.createElement("li", {
          className: "ae-option-control-item",
          key: "item-content_".concat(actionIndex)
        }, React__default.createElement("div", {
          className: "action-control-header"
        }, React__default.createElement("div", {
          className: "action-control-header-left"
        }, React__default.createElement("div", {
          className: "ae-option-control-item-dragBar"
        }, React__default.createElement(Icon, {
          icon: "drag-six-circle-btn",
          className: "icon"
        })), React__default.createElement("div", {
          className: "action-item-actiontype"
        }, getPropOfAcion(action, 'actionLabel', actionTree, pluginActions, commonActions, allComponents) || action.actionType)), React__default.createElement("div", {
          className: "action-control-header-right"
        }, React__default.createElement("div", {
          onClick: _this.activeActionDialog.bind(_this, {
            showAcionDialog: true,
            type: 'update',
            actionData: {
              action: action,
              eventKey: eventKey,
              actionIndex: actionIndex
            }
          })
        }, React__default.createElement(Icon, {
          className: "icon",
          icon: "edit-full-btn"
        })), React__default.createElement("div", {
          onClick: _this.delAction.bind(_this, eventKey, action, actionIndex)
        }, React__default.createElement(Icon, {
          className: "icon",
          icon: "delete-easy-btn"
        })))), _this.renderDesc(action));
      })) : null);
    }) : React__default.createElement("div", {
      className: "ae-event-control-placeholder"
    }, i18n('4db5110d41293fef57f5a1f364187896'))), showEventDialog ? render({
      type: 'dialog',
      title: "".concat(eventDialogData === null || eventDialogData === void 0 ? void 0 : eventDialogData.eventLabel, "-\u4E8B\u4EF6\u914D\u7F6E"),
      showCloseButton: false,
      body: [{
        type: 'form',
        title: i18n("eee1e2258d7ea163fec625ee44be9637"),
        data: {
          '&': '$$'
        },
        mode: 'horizontal',
        horizontal: {
          left: 3,
          right: 9
        },
        body: [{
          label: i18n("5ba999eb762f60324033b735e55d989c"),
          type: 'switch',
          name: 'debounce.open',
          description: i18n("7fe94616be0e8fb5ef5ab40a7397f0aa")
        }, {
          label: i18n("91b72e901f1663637157cda638ac4dcc"),
          required: true,
          hiddenOn: '!debounce.open',
          name: 'debounce.wait',
          suffix: 'ms',
          max: 10000,
          min: 0,
          type: 'input-number'
        }],
        onSubmit: this.eventDialogSubmit.bind(this)
      }],
      actions: [{
        type: 'button',
        label: i18n("625fb26b4b3340f7872b411f401e754c"),
        onEvent: {
          click: {
            actions: [{
              actionType: 'custom',
              script: function () {
                _this.setState({
                  showEventDialog: false
                });
              }
            }]
          }
        }
      }, {
        type: 'button',
        actionType: 'confirm',
        label: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
        primary: true
      }]
    }, {
      data: eventDialogData
    }) : null, React__default.createElement(ActionDialog, {
      show: showAcionDialog,
      type: type,
      actionTree: actionTree,
      pluginActions: pluginActions,
      commonActions: commonActions,
      getComponents: getComponents,
      data: actionData,
      onSubmit: this.onSubmit,
      onClose: this.onClose,
      render: this.props.render
    }));
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], EventControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Object]), __metadata("design:returntype", void 0)], EventControl.prototype, "onSubmit", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], EventControl.prototype, "onClose", null);
  return EventControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(EventControlRenderer, _super);
  function EventControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  EventControlRenderer = __decorate([FormItem({
    type: 'ae-eventControl'
  })], EventControlRenderer);
  return EventControlRenderer;
})(EventControl);

export { EventControl };
