/*
* @Author: liuhaibo
* @Date:   2017-10-17 17:20:37
* @Last Modified by:   liuhaibo
* @Last Modified time: 2017-12-07 20:28:08
* @desc: 极验
*/

export const initGeetest = (function (window) {
    "v0.4.6 Geetest Inc.";
    "use strict";

    if (typeof window === 'undefined' || !window) {
        // throw new Error('Geetest requires browser environment');
        return {};
    }

    var document = window.document;
    var Math = window.Math;
    var head = document.getElementsByTagName("head")[0];

    function _Object(obj) {
        this._obj = obj;
    }

    _Object.prototype = {
        _each: function (process) {
            var _obj = this._obj;
            for (var k in _obj) {
                if (_obj.hasOwnProperty(k)) {
                    process(k, _obj[k]);
                }
            }
            return this;
        }
    };

    function Config(config) {
        var self = this;
        new _Object(config)._each(function (key, value) {
            self[key] = value;
        });
    }

    Config.prototype = {
        api_server: 'api.geetest.com',
        protocol: 'http://',
        typePath: '/gettype.php',
        fallback_config: {
            slide: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'slide',
                slide: '/static/js/geetest.0.0.0.js'
            },
            fullpage: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'fullpage',
                fullpage: '/static/js/fullpage.0.0.0.js'
            }
        },
        _get_fallback_config: function () {
            var self = this;
            if (isString(self.type)) {
                return self.fallback_config[self.type];
            } else if (self.new_captcha) {
                return self.fallback_config.fullpage;
            } else {
                return self.fallback_config.slide;
            }
        },
        _extend: function (obj) {
            var self = this;
            new _Object(obj)._each(function (key, value) {
                self[key] = value;
            })
        }
    };
    var isNumber = function (value) {
        return (typeof value === 'number');
    };
    var isString = function (value) {
        return (typeof value === 'string');
    };
    var isBoolean = function (value) {
        return (typeof value === 'boolean');
    };
    var isObject = function (value) {
        return (typeof value === 'object' && value !== null);
    };
    var isFunction = function (value) {
        return (typeof value === 'function');
    };

    var callbacks = {};
    var status = {};

    var random = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    };

    var loadScript = function (url, cb) {
        var script = document.createElement("script");
        script.charset = "UTF-8";
        script.async = true;

        script.onerror = function () {
            cb(true);
        };
        var loaded = false;
        script.onload = script.onreadystatechange = function () {
            if (!loaded &&
                (!script.readyState ||
                "loaded" === script.readyState ||
                "complete" === script.readyState)) {

                loaded = true;
                setTimeout(function () {
                    cb(false);
                }, 0);
            }
        };
        script.src = url;
        head.appendChild(script);
    };

    var normalizeDomain = function (domain) {
        // special domain: uems.sysu.edu.cn/jwxt/geetest/
        // return domain.replace(/^https?:\/\/|\/.*$/g, ''); uems.sysu.edu.cn
        return domain.replace(/^https?:\/\/|\/$/g, ''); // uems.sysu.edu.cn/jwxt/geetest
    };
    var normalizePath = function (path) {
        path = path.replace(/\/+/g, '/');
        if (path.indexOf('/') !== 0) {
            path = '/' + path;
        }
        return path;
    };
    var normalizeQuery = function (query) {
        if (!query) {
            return '';
        }
        var q = '?';
        new _Object(query)._each(function (key, value) {
            if (isString(value) || isNumber(value) || isBoolean(value)) {
                q = q + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        });
        if (q === '?') {
            q = '';
        }
        return q.replace(/&$/, '');
    };
    var makeURL = function (protocol, domain, path, query) {
        domain = normalizeDomain(domain);

        var url = normalizePath(path) + normalizeQuery(query);
        if (domain) {
            url = protocol + domain + url;
        }

        return url;
    };

    var load = function (protocol, domains, path, query, cb) {
        var tryRequest = function (at) {

            var url = makeURL(protocol, domains[at], path, query);
            loadScript(url, function (err) {
                if (err) {
                    if (at >= domains.length - 1) {
                        cb(true);
                    } else {
                        tryRequest(at + 1);
                    }
                } else {
                    cb(false);
                }
            });
        };
        tryRequest(0);
    };


    var jsonp = function (domains, path, config, callback) {
        if (isObject(config.getLib)) {
            config._extend(config.getLib);
            callback(config);
            return;
        }
        if (config.offline) {
            callback(config._get_fallback_config());
            return;
        }

        var cb = "geetest_" + random();
        window[cb] = function (data) {
            if (data.status == 'success') {
                callback(data.data);
            } else if (!data.status) {
                callback(data);
            } else {
                callback(config._get_fallback_config());
            }
            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };
        load(config.protocol, domains, path, {
            gt: config.gt,
            callback: cb
        }, function (err) {
            if (err) {
                callback(config._get_fallback_config());
            }
        });
    };

    var throwError = function (errorType, config) {
        var errors = {
            networkError: '网络错误',
            gtTypeError: 'gt字段不是字符串类型'
        };
        if (typeof config.onError === 'function') {
            config.onError(errors[errorType]);
        } else {
            throw new Error(errors[errorType]);
        }
    };

    var detect = function () {
        return window.Geetest || document.getElementById("gt_lib");
    };

    if (detect()) {
        status.slide = "loaded";
    }

    var initGeetest = function (userConfig, callback) {

        var config = new Config(userConfig);

        if (userConfig.https) {
            config.protocol = 'https://';
        } else if (!userConfig.protocol) {
            config.protocol = window.location.protocol + '//';
        }

        // for KFC
        if (userConfig.gt === '050cffef4ae57b5d5e529fea9540b0d1' ||
            userConfig.gt === '3bd38408ae4af923ed36e13819b14d42') {
            config.apiserver = 'yumchina.geetest.com/'; // for old js
            config.api_server = 'yumchina.geetest.com';
        }

        if (isObject(userConfig.getType)) {
            config._extend(userConfig.getType);
        }
        jsonp([config.api_server || config.apiserver], config.typePath, config, function (newConfig) {
            var type = newConfig.type;
            var init = function () {
                config._extend(newConfig);
                callback(new window.Geetest(config));
            };

            callbacks[type] = callbacks[type] || [];
            var s = status[type] || 'init';
            if (s === 'init') {
                status[type] = 'loading';

                callbacks[type].push(init);

                load(config.protocol, newConfig.static_servers || newConfig.domains, newConfig[type] || newConfig.path, null, function (err) {
                    if (err) {
                        status[type] = 'fail';
                        throwError('networkError', config);
                    } else {
                        status[type] = 'loaded';
                        var cbs = callbacks[type];
                        for (var i = 0, len = cbs.length; i < len; i = i + 1) {
                            var cb = cbs[i];
                            if (isFunction(cb)) {
                                cb();
                            }
                        }
                        callbacks[type] = [];
                    }
                });
            } else if (s === "loaded") {
                init();
            } else if (s === "fail") {
                throwError('networkError', config);
            } else if (s === "loading") {
                callbacks[type].push(init);
            }
        });
    };

    return initGeetest;

    // console.logdefine);
    // /* istanbul ignore next */
    // if (typeof module !== 'undefined' && module.exports) {
    //     module.exports = initGeetest;
    // } else if (typeof define === 'function' && define.amd) {
    //     define(function () {
    //         return initGeetest;
    //     });
    // } else {
    //     window.initGeetest = initGeetest
    // }

})(typeof(window) == 'undefined' ? false : window);
