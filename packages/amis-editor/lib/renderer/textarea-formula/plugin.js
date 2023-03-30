/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var FormulaEditor = require('amis-ui/lib/components/formula/Editor');

/**
 * @file 扩展 codemirror
 */
function editorFactory(dom, cm, props) {
    return cm(dom, {
        value: props.value || '',
        autofocus: false,
        lineWrapping: true
    });
}
var FormulaPlugin = /** @class */ (function () {
    function FormulaPlugin(editor, cm, getProps, onExpressionClick) {
        this.editor = editor;
        this.cm = cm;
        this.getProps = getProps;
        this.onExpressionClick = onExpressionClick;
        var value = this.getProps().value;
        if (value) {
            this.autoMark();
            this.focus(value);
        }
    }
    FormulaPlugin.prototype.autoMark = function () {
        var editor = this.editor;
        var lines = editor.lineCount();
        for (var line = 0; line < lines; line++) {
            var content = editor.getLine(line);
            var braces = this.computedBracesPosition(content);
            for (var i = 0; i < braces.length; i++) {
                // 替换每个公式表达式中的内容
                var start = braces[i].begin;
                var end = braces[i].end;
                var expression = content.slice(start, end);
                this.markExpression({
                    line: line,
                    ch: start - 2
                }, {
                    line: line,
                    ch: end + 1
                }, expression);
            }
        }
    };
    // 找到表达式所在的位置
    FormulaPlugin.prototype.getExpressionBrace = function (expression) {
        var editor = this.editor;
        var lines = editor.lineCount();
        for (var line = 0; line < lines; line++) {
            var content = editor.getLine(line);
            var braces = this.computedBracesPosition(content);
            for (var i = 0; i < braces.length; i++) {
                // 替换每个公式表达式中的内容
                var start = braces[i].begin;
                var end = braces[i].end;
                if (expression === content.slice(start, end)) {
                    return [
                        {
                            line: line,
                            ch: start - 2
                        },
                        {
                            line: line,
                            ch: end + 1
                        }
                    ];
                }
            }
        }
        return undefined;
    };
    // 计算 `${`、`}` 括号的位置，如 ${a}+${b}, 结果是 [ { from: 0, to: 3 }, { from: 5, to: 8 } ]
    FormulaPlugin.prototype.computedBracesPosition = function (exp) {
        var braces = [];
        exp === null || exp === void 0 ? void 0 : exp.replace(/\$\{/g, function (val, offset) {
            if (val) {
                var charArr = exp.slice(offset + val.length).split('');
                var cache = ['${'];
                for (var index = 0; index < charArr.length; index++) {
                    var char = charArr[index];
                    if (char === '$' && charArr[index + 1] === '{') {
                        cache.push('${');
                    }
                    else if (char === '}') {
                        cache.pop();
                    }
                    if (cache.length === 0) {
                        braces.push({ begin: offset + 2, end: index + offset + 2 });
                        break;
                    }
                }
            }
            return '';
        });
        return braces;
    };
    // 判断字符串是否在 ${} 中
    FormulaPlugin.prototype.checkStrIsInBraces = function (_a, braces) {
        var _b = tslib.__read(_a, 2), from = _b[0], to = _b[1];
        var isIn = false;
        if (braces.length) {
            for (var index = 0; index < braces.length; index++) {
                var brace = braces[index];
                if (from >= brace.begin && to <= brace.end) {
                    isIn = true;
                    break;
                }
            }
        }
        return isIn;
    };
    FormulaPlugin.prototype.insertBraces = function (originFrom, originTo) {
        var str = this.editor.getValue();
        var braces = this.computedBracesPosition(str);
        if (!this.checkStrIsInBraces([originFrom.ch, originTo.ch], braces)) {
            this.editor.setCursor({
                line: originFrom.line,
                ch: originFrom.ch
            });
            this.editor.replaceSelection('${');
            this.editor.setCursor({
                line: originTo.line,
                ch: originTo.ch + 2
            });
            this.editor.replaceSelection('}');
        }
    };
    FormulaPlugin.prototype.insertContent = function (value, type, brace) {
        if (brace) {
            // 替换
            var _a = tslib.__read(brace, 2), from = _a[0], to = _a[1];
            if (type === 'expression') {
                this.editor.replaceRange(value, from, to);
                this.autoMark();
            }
            else if (typeof value === 'string') {
                this.editor.replaceRange(value, from, to);
            }
        }
        else {
            // 新增
            if (type === 'expression') {
                this.editor.replaceSelection(value);
                this.autoMark();
            }
            else if (typeof value === 'string') {
                this.editor.replaceSelection(value);
            }
            this.editor.focus();
        }
    };
    FormulaPlugin.prototype.markExpression = function (from, to, expression, className) {
        var _this = this;
        if (expression === void 0) { expression = ''; }
        if (className === void 0) { className = 'cm-expression'; }
        var wrap = document.createElement('span');
        wrap.className = className;
        var text = document.createElement('span');
        text.className = "".concat(className, "-text");
        text.innerText = expression;
        text.setAttribute('data-expression', expression);
        text.onclick = function () {
            var brace = _this.getExpressionBrace(expression);
            _this.onExpressionClick(expression, brace);
        };
        var variables = this.getProps().variables;
        var highlightValue = FormulaEditor.FormulaEditor.highlightValue(expression, variables) || {
            html: expression
        };
        // 添加popover
        var popoverEl = document.createElement('div');
        // bca-disable-next-line
        popoverEl.innerHTML = highlightValue.html;
        popoverEl.classList.add('expression-popover');
        var arrow = document.createElement('div');
        arrow.classList.add('expression-popover-arrow');
        popoverEl.appendChild(arrow);
        wrap.appendChild(text);
        wrap.appendChild(popoverEl);
        this.editor.markText(from, to, {
            atomic: true,
            replacedWith: wrap
        });
    };
    // 焦点放在最后
    FormulaPlugin.prototype.focus = function (value) {
        this.editor.setCursor({
            line: 0,
            ch: (value === null || value === void 0 ? void 0 : value.length) || 0
        });
    };
    FormulaPlugin.prototype.dispose = function () { };
    FormulaPlugin.prototype.validate = function () { };
    return FormulaPlugin;
}());

exports.FormulaPlugin = FormulaPlugin;
exports.editorFactory = editorFactory;
