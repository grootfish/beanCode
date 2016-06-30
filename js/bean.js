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
        addClass:function(el,className){
            if(el.classList){
                el.classList.add(className);
            }else{
                el.className +=' '+className;
            }
        },
        removeClass:function(el,className){
            if(el.classList){
                el.classList.remove(className);
            }else{
                el.className =el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        /**
         * 在dom元素后插入htmlString
         * @param  {DOM} el             在此dom元素后面插入
         * @param  {String} htmlString  插入的字符串模板
         */
        after:function(el,htmlString){
            el.insertAdjacentHTML('afterend',htmlString);
        },
        /**
         * 在dom元素后插入htmlString
         * @param  {DOM} el             在此dom元素前面插入
         * @param  {String} htmlString  插入的字符串模板
         */
        before:function(el,htmlString){
            el.insertAdjacentHTML('beforebegin',htmlString);
        },
        /**
         * 获取元素的子节点
         * @param  {DOM} el    目标元素
         * @return {Array}     返回子节点数组
         */
        children:function(el){
            var children = [];
            for(var i=el.children.length;i--;){
                //过滤注释节点 in IE8
                if(el.children[i].nodeType!=8){
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
        clone:function(el){
            return el.cloneNode(true);
        },
        /**
         * 目标元素是否包含某个子元素
         * @param  {DOM} el        目标元素
         * @param  {DOM} child     判断包含的元素
         * @return {Boolean}       返回是否包含
         */
        contains:function(el,child){
            return el!==child&&el.contains(child);
        },
        /**
         * 目标元素是否存在匹配选择器子孙元素
         * @param  {DOM} el           目标元素
         * @param  {String} selector  匹配选择器
         * @return {Boolean}          是否存在
         */
        exist:function(el,selector){
            return el.querySelector(selector) !==null;
        },
        /**
         * 节点遍历方法
         * @param  {String}   selector 选择器字符串
         * @param  {Function} fn       遍历回调函数，包含两个参数，第一个参数是当前元素节点本身，第二个参数是当前节点的索引
         * @return {Void}
         */
        each:function(selector,fn){
            var elements = document.querySelectorAll(selector);
            for(var i =0;i<elements.length;i++){
                fn(elements[i],i);
            }
        },
        /**
         * 过滤元素节点
         * @param  {String}   selector 选择器字符串
         * @param  {Function} fn       过滤函数
         * @return {Array}             返回过滤后的节点数组
         */
        filter:function(selector,fn){
            var elements = document.querySelectorAll(selector);
            var ret = [];
            for(var i= elements.length;i--;){
                if(fn(elements[i])){
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
        empty:function(el){
            while(el.firstChild){
                el.removeChild(el.firstChild);
            }
        },
        /**
         * 获取文本内容
         * @param  {DOM} el    目标元素
         * @return {String}    文本内容
         */
        text:function(el){
            return el.textContent || el.innerText;
        },
        /**
         * 是否有某个类class
         * @param  {DOM}  el           目标元素
         * @param  {String}  className 选择器表达式
         * @return {Boolean}           返回是否包含类名class
         */
        hasClass:function(el,className){
            if(el.classList){
                return el.classList.contains(className);
            }else{
                return new RegExp('(^| )'+className+'( |$)','gi').test(el.className);
            }
        },


    };

    win.Bean = Bean;
})(window);