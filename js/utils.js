(function(win) {
    var _type = ("Boolean Number String Function Array Date RegExp Object").split(" ");
    var _class2type = (function() {
        var class2type = {};
        for (var i = 0, len = _type.length; i < len; i++) {
            class2type["[object " + _type[i] + "]"] = _type[i].toLowerCase();
        }
        return class2type;
    })();
    console.log(_class2type);

    var Utils = {
        toString: Object.prototype.toString,
        hasOwn: Object.prototype.hasOwnProperty,
        push: Array.prototype.push,
        slice: Array.prototype.slice,
        trim: String.prototype.trim,
        indexOf: Array.prototype.indexOf,
        type: function(obj) {
            return obj == null ?
                String(obj) :
                _class2type[this.toString.call(obj)] || "object";
        }
    };

    win.Utils = Utils;
})(window);