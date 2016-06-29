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

    var Utils = {
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
        }

    };

    win.Utils = Utils;
})(window);