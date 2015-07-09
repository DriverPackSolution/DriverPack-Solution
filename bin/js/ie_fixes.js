Array.prototype.extend = function (array) {
    array.unshift(array.length)
    array.unshift(this.length)
    Array.prototype.splice.apply(this,array)
    array.shift() // restore b
    array.shift() //
}


/************ FOR IE<9 ************/
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
if (!Object.create) {
    Object.create = function (o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function')
            throw new TypeError('Object prototype may only be an Object: ' + o);
        else if (o === null)
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");

        if (typeof properties != 'undefined')
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {
        }

        F.prototype = o;

        return new F();
    };
}

if (typeof Object.getPrototypeOf !== "function") {
    Object.getPrototypeOf = "".__proto__ === String.prototype
            ? function (object) {
                return object.__proto__;
            }
    : function (object) {
        // May break if the constructor has been tampered with
        return object.constructor.prototype;
    };
}
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
        if (i === undefined)
            i = 0;
        if (i < 0)
            i += this.length;
        if (i < 0)
            i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function (find, i /*opt*/) {
        if (i === undefined)
            i = this.length - 1;
        if (i < 0)
            i += this.length;
        if (i > this.length - 1)
            i = this.length - 1;
        for (i++; i-- > 0; ) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}

/****************** JSON *******************/
if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';
    function f(n) {
// Format integers to have at least two digits.
        return n < 10
                ? '0' + n
                : n;
    }
    function this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                    : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }
    var cx,
            escapable,
            gap,
            indent,
            meta,
            rep;
    function quote(string) {
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.
        escapable.lastIndex = 0;
        return escapable.test(string)
                ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string'
                            ? c
                            : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"'
                : '"' + string + '"';
    }
    function str(key, holder) {
// Produce a string from holder[key].
        var i, // The loop counter.
                k, // The member key.
                v, // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];
// If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
// What happens next depends on the value's type.
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
// JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(value)
                        ? String(value)
                        : 'null';
            case 'boolean':
            case 'null':
// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.
                return String(value);
// If the type is 'object', we might be dealing with an object or an array or
// null.
            case 'object':
// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.
                if (!value) {
                    return 'null';
                }
// Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];
// Is the value an array?
                if (Object.prototype.toString.apply(value) === '[object Array]') {
// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
// Join all of the elements together, separated with commas, and wrap them in
// brackets.
                    v = partial.length === 0
                            ? '[]'
                            : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
// If the replacer is an array, use it to select the members to be stringified.
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                        ? ': '
                                        : ':'
                                        ) + v);
                            }
                        }
                    }
                } else {
// Otherwise, iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                        ? ': '
                                        : ':'
                                        ) + v);
                            }
                        }
                    }
                }
// Join all of the member texts together, separated with commas,
// and wrap them in braces.
                v = partial.length === 0
                        ? '{}'
                        : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
// If the JSON object does not yet have a stringify method, give it one.
    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {// table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {
// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.
            var i;
            gap = '';
            indent = '';
// If the space parameter is a number, make an indent string containing that
// many spaces.
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
// If the space parameter is a string, it will be used as the indent string.
            } else if (typeof space === 'string') {
                indent = space;
            }
// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                            typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.
            return str('', {'': value});
        };
    }
// If the JSON object does not yet have a parse method, give it one.
    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {
// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.
            var j;
            function walk(holder, key) {
// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.
// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
            if (
                    /^[\],:{}\s]*$/.test(
                            text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
                            )
                    ) {
// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.
                j = eval('(' + text + ')');
// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.
                return typeof reviver === 'function'
                        ? walk({'': j}, '')
                        : j;
            }
// If the text is not JSON parseable, then a SyntaxError is thrown.
            throw new SyntaxError('JSON.parse');
        };
    }
}());


if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
