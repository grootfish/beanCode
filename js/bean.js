(function(win) {
    var _type = ("Boolean Number String Function Array Date RegExp Object").split(" ");
    var _class2type = (function() {
        var class2type = {};
        for (var i = 0, len = _type.length; i < len; i++) {
            class2type["[object " + _type[i] + "]"] = _type[i].toLowerCase();
        }
        return class2type;
    })();

    var _toString = Object.prototype.toString,
        _hasOwn = Object.prototype.hasOwnProperty,
        _push = Array.prototype.push,
        _slice = Array.prototype.slice,
        _trim = String.prototype.trim,
        _indexOf = Array.prototype.indexOf;

    var Bean = {
        /**
         * 类型判断
         * @param  {Object} obj 任意类型数据
         * @return {String}     数据类型描述
         */
        type: function(obj) {
            return obj == null ?
                String(obj) :
                _class2type[_toString.call(obj)] || "object";
        },
        /**
         * 为dom元素添加类calss
         * @param {DOM}    el        dom元素
         * @param {String} className 类名class
         */
        addClass: function(el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },
        removeClass: function(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        /**
         * 切换class(有就删除，没有就添加)
         * @param  {DOM} el           目标元素
         * @param  {String} className 类名class
         * @return {Void}
         */
        toggleClass: function(el, className) {
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existIndex = -1;

                for (var i = classes.length; i--;) {
                    if (classes[i] === className) {
                        existIndex = i;
                    }
                }

                if (existIndex >= 0) {
                    classes.splice(existIndex, 1);
                } else {
                    classes.push(className);
                }

                el.className = classes.join(' ');
            }
        },
        /**
         * 在dom元素后插入htmlString
         * @param  {DOM} el             在此dom元素后面插入
         * @param  {String} htmlString  插入的字符串模板
         */
        after: function(el, htmlString) {
            el.insertAdjacentHTML('afterend', htmlString);
        },
        /**
         * 在dom元素后插入htmlString
         * @param  {DOM} el             在此dom元素前面插入
         * @param  {String} htmlString  插入的字符串模板
         */
        before: function(el, htmlString) {
            el.insertAdjacentHTML('beforebegin', htmlString);
        },
        /**
         * 把目标元素插入到parent元素的最前面
         * @param  {DOM} el        目标元素
         * @param  {DOM} parent    父元素节点
         * @return {Void}
         */
        prepend: function(el, parent) {
            parent.insertBefore(el, parent.firstChild);
        },
        /**
         * 获取元素的子节点
         * @param  {DOM} el    目标元素
         * @return {Array}     返回子节点数组
         */
        children: function(el) {
            var children = [];
            for (var i = el.children.length; i--;) {
                //过滤注释节点 in IE8
                if (el.children[i].nodeType != 8) {
                    children.unshift(el.children[i]);
                }
            }
            return children;
        },
        /**
         * clone元素节点
         * @param  {DOM} el    被克隆的元素节点
         * @return {DOM}       返回克隆成功的节点
         */
        clone: function(el) {
            return el.cloneNode(true);
        },
        /**
         * 目标元素是否包含某个子元素
         * @param  {DOM} el        目标元素
         * @param  {DOM} child     判断包含的元素
         * @return {Boolean}       返回是否包含
         */
        contains: function(el, child) {
            return el !== child && el.contains(child);
        },
        /**
         * 目标元素是否存在匹配选择器子孙元素
         * @param  {DOM} el           目标元素
         * @param  {String} selector  匹配选择器
         * @return {Boolean}          是否存在
         */
        exist: function(el, selector) {
            return el.querySelector(selector) !== null;
        },
        /**
         * 节点遍历方法
         * @param  {String}   selector 选择器字符串
         * @param  {Function} fn       遍历回调函数，包含两个参数，第一个参数是当前元素节点本身，第二个参数是当前节点的索引
         * @return {Void}
         */
        each: function(selector, fn) {
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                fn(elements[i], i);
            }
        },
        /**
         * 过滤元素节点
         * @param  {String}   selector 选择器字符串
         * @param  {Function} fn       过滤函数
         * @return {Array}             返回过滤后的节点数组
         */
        filter: function(selector, fn) {
            var elements = document.querySelectorAll(selector);
            var ret = [];
            for (var i = elements.length; i--;) {
                if (fn(elements[i])) {
                    ret.unshift(elements[i]);
                }
            }
            return ret;
        },
        /**
         * 删除目标元素子节点
         * @param  {DOM} el  目标节点
         * @return {Void}
         */
        empty: function(el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        },
        /**
         * 获取文本内容
         * @param  {DOM} el         目标元素
         * @param  {String} text    设置文本值
         * @return {String}         文本内容
         */
        text: function(el, text) {
            if (!text) {
                return el.textContent || el.innerText;
            } else {
                if (el.textContent !== undefined) {
                    el.textContent = text;
                } else {
                    el.innerText = text;
                }
            }

        },
        /**
         * 获取html节点
         * @param  {DOM} el            目标元素
         * @param  {String} htmlString html字符串
         * @return {String}            返回目标元素包含的html字符串
         */
        html: function(el, htmlString) {
            if (!htmlString) {
                return el.innerHTML;
            } else {
                el.innerHTML = htmlString;
            }
        },
        /**
         * 是否有某个类class
         * @param  {DOM}  el           目标元素
         * @param  {String}  className 选择器表达式
         * @return {Boolean}           返回是否包含类名class
         */
        hasClass: function(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }
        },
        /**
         * 获取目标元素下一个节点
         * @param  {DOM}   el     目标元素
         * @return {Function}     返回下一个节点
         */
        next: function(el) {
            //如果nextElementSibling原生方法不存在，则自定义
            function nextElementSibling(el) {
                // nextSibling 可能包含文本节点
                do {
                    el = el.nextSibling;
                } while (el && el.nodeType !== 1);
                return el;
            }
            return el.nextElementSibling || nextElementSibling(el);
        },
        /**
         * 获取目标元素上一个节点
         * @param  {DOM}   el     目标元素
         * @return {Function}     返回上一个节点
         */
        prev: function(el) {
            function previousElementSibling(el) {
                do {
                    el = el.previousSibling
                } while (el && el.nodeType !== 1);
                return el;
            }
            return el.previousElementSibling || previousElementSibling(el);
        },
        /**
         * 获取目标元素兄弟元素
         * @param  {DOM} el    目标元素
         * @return {String}    包含兄弟元素的数组
         */
        siblings: function(el) {
            var siblings = _slice.call(el.parentNode.children);

            for (var i = siblings.length; i--;) {
                if (siblings[i] === el) {
                    siblings.splice(i, 1);
                    break;
                }
            }
            return siblings;
        },
        /**
         * 获取目标元素在文档中的位置
         * @param  {DOM} el    目标元素
         * @return {Object}    包含目标元素的top和left
         */
        offset: function(el) {
            var rect = el.getBoundingClientRect();

            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            }
        },
        /**
         * 添加事件
         * @param  {Dom}   el              目标元素
         * @param  {String} eventName      事件类型
         * @param  {Function} eventHandler 事件回调
         * @return {Void}
         */
        on: function(el, eventName, eventHandler) {
            function addEventListener(el, eventName, handler) {
                if (el.addEventListener) {
                    el.addEventListener(eventName, handler);
                } else {
                    el.attachEvent('on' + eventName, handler);
                }
            }

            addEventListener(el, eventName, eventHandler);
            return this;
        },
        /**
         * 删除事件(不能删除绑定的匿名函数)
         * @param  {Dom} el                目标元素
         * @param  {String} eventName      事件类型
         * @param  {Function} eventHandler 事件回调
         * @return {Void}
         */
        off: function(el, eventName, eventHandler) {
            var _self = this;
            function removeEventListener(el, eventName, handler) {
                if (el.removeEventListener) {
                    el.removeEventListener(eventName, handler);
                } else {
                    el.detachEvent('on' + eventName, handler);
                }
            }
            removeEventListener(el, eventName, eventHandler);
            return this;
        },
        /**
         * 页面结构加载完毕调用回调
         * @param  {Function} fn 回调函数
         * @return {Void}
         */
        ready: function(fn) {
            if (document.readyState != 'loading') {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState != 'loading') {
                        fn();
                    }
                });
            }
        },
        /**
         * 触发目标元素上的指定事件
         * @param  {DOM} el            目标元素
         * @param  {String} eventName  事件类型
         * @return {Void}
         */
        trigger: function(el, eventName) {
            if (document.createEvent) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, false);
                el.dispatchEvent(event);
            } else {
                el.fireEvent('on' + eventName);
            }
        },
        /**
         * 为方法指定上下文
         * @param  {Function} fn           目标方法
         * @param  {Object}   context      指定的上下文对象
         * @param  {arguments}   arguments 参数类数组对象
         * @return {Void}
         */
        proxy: function(fn, context, arguments) {
            return function(){
                fn.apply(context, arguments);
            }
        },
        /**
         * 数组遍历方法
         * @param  {Array}   array  目标数组
         * @param  {Function} fn    回调函数
         * @return {Void}
         */
        forEach: function(array, fn) {
            for (var i = 0; i < array.length; i++) {
                fn(array[i], i);
            }
        },
        /**
         * 遍历执行并返回结果集
         * @param  {Array}   array   目标数组
         * @param  {Function} fn     回调方法
         * @return {Array}           返回结果集
         */
        map: function(array, fn) {
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                results.push(fn(arr[i], i));
            }
            return results;
        },
        /**
         * 深拷贝
         * @param  {Object} objA 对象A
         * @param  {Object} objB 对象B
         * @return {Object}      深拷贝返回的对象
         */
        deepExtend: function({}, objA, objB) {
            var deepExtend = function(ret) {
                ret = ret || {};

                for (var i = 1; i < arguments.lenght; i++) {
                    var obj = arguments[i];
                    if (!obj) continue;

                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (this.type(obj) === 'object') {
                                ret[key] = deepExtend(ret[key], obj[key]);
                            } else {
                                ret[key] = obj[key];
                            }
                        }
                    }
                    return ret;
                };
            }
            deepExtend({}, objA, objB);
        },
        /**
         * 拷贝到一个新对象
         * @param  {Object} objA 对象A
         * @param  {Object} objB 对象B
         * @return {Object}      合并的新对象
         */
        extend: function({}, objA, objB) {
            var extend = function(ret) {
                ret = ret || {};
                for (var i = 1; i < arguments.length; i++) {
                    if (!arguments[i]) continue;

                    for (var key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key)) {
                            ret[key] = arguments[i][key];
                        }
                    }
                    return ret;
                }
            };
            extend({}, objA, objB);
        },
        /**
         * 判断是否在数组中
         * @param  {Number} value 目标数字
         * @param  {Array} array  数组
         * @return {Number}       返回-1在数组中没找到，其他返回在数组中的下标
         */
        inArray:function(value, array){
            function indexOf(value,array){
                for(var i=0;i<array.length;i++){
                    if(array[i]===item)
                        return i;
                }
                return -1;
            }
            indexOf(value,array);
        },
    };
    win.Bean = Bean;
})(window);