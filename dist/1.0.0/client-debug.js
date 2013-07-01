/**
 * 客户端信息识别
 *
 *
 */
define("matcha/client/1.0.0/client-debug", [], function(require, exports, module) {
    "use strict";

    var userAgent = window.navigator.userAgent.toLowerCase(),
        external = window.external,
        msieRegular = /msie ([\d.]+)/;

    // 特征
    var feature = {
        device: [
            ['pc', 'windows nt'],
            ['mac', 'macintosh'],
            ['ipad', 'ipad'],
            ['ipod', 'ipod'],
            ['iphone', 'iphone'],
            ['samsung', 'samsung'],
            ['nexus', 'nexus'],
            ['mi', /mi-one plus/],
            ['meizu', function() {
                if (userAgent.indexOf('meizu mx') !== -1) {
                    return 'mx';
                }
                return /m(?:\d+)/.exec(userAgent);
            }],
            ['android', 'android'],
            ['wp', /windows (?:phone|ce)/],
            ['chrome', 'cros i686'],
            ['nokia', /nokia([\da-z\-]+)/],
            ['blackberry', 'blackberry']
        ],
        os: [
            ['windows', /windows nt ([\d.]+)/],
            ['macosx', /mac os x ([\d._]+)/],
            ['ios', /cpu(?: iphone)? os ([\d._]+)/],
            ['android', /android ([\d.]+)/],
            ['linux', 'linux'],
            ['chromeos', /cros i686 ([\d.]+)/],
            ['wp', /windows phone(?: os)? ([\d.]+)/],
            ['windowsce', 'windows ce'],
            ['meego', 'meego'],
            ['symbian', /symbianos.*series([\d]+)\//],
            ['blackberry', 'blackberry']
        ],
        browser: [
            ['sogou', /se ([\d.x]+) metasr/],
            //['360', ''],
            ['qq', /qqbrowser\/([\d.]+)/],
            ['maxthon', function() {
                try{
                    if(external && (external.mxVersion || external.max_version)){
                        return (external.mxVersion || external.max_version);
                    }
                }catch(e){}

                var match = /maxthon\/([\d.]+)/.exec(userAgent);
                if (match && match[1]) {
                    return match[1];
                }
            }],
            ['uc', /(?:ucbrowser|ucweb)\/([\d.]+)/],
            ['mi', /miuibrowser\/([\d.]+)/],
            ['tb', /taobrowser\/([\d.]+)/],
            ['baidu', /bidubrowser[ \/]([\d.x]+)/],
            ['theworld', function() {
                if (!external || !external.twGetRunPath) {
                    return false;
                }

                try {
                    var runPath = external.twGetRunPath.toLowerCase();

                    if (runPath && runPath.indexOf('theworld') === -1) {
                        return false;
                    }

                    var security = external.twGetSecurityID(window),
                        version = external.twGetVersion(security);

                    if (version) {
                        return version;
                    }
                } catch(e) {}

                return false;
            }],
            ['nokia', /nokiabrowser\/([\d.]+)/],
            ['opera', function() {
                var match, operaRegular;

                if (userAgent.indexOf('opera mini') != -1) {
                    operaRegular = /opera mini\/([\d.]+)\//;
                } else if (userAgent.indexOf('opr') != -1) {
                    operaRegular = /opr\/([\d.]+) \(edition next\)/;
                } else {
                    operaRegular = /opera.*version\/([\d.]+)/;
                }

                match = operaRegular.exec(userAgent);
                if (match && match[1]) {
                    return match[1];
                }
            }],
            ['ie', msieRegular],
            ['chrome', /(?:chrome|crios|crmo)\/([\d.]+)/],
            ['firefox', /firefox\/([\d.]+)/],
            ['safari', /version\/([\d.]+)(?: mobile(?:\/\w+|)|) safari/],
            ['webview', /applewebkit\/.*mobile\/(?!.*safari)/]
        ],
        engine: [
            ['trident', msieRegular],
            ['webkit', /applewebkit\/([\d.]+)/],
            ['gecko', /gecko\/(\d+)/],
            ['presto', /presto\/([\d.]+)/]
        ]
    };

    function toString(obj) {
        return Object.prototype.toString.call(obj);
    }

    /**
     * IE兼容模式
     */
    function compatibleMode() {
        var browserVersion, engineVersion,
            browserMode, engineMode,
            isCompatible = false,
            match;

        // 先用UA的IE版本好作版本号基础
        match = msieRegular.exec(userAgent);
        browserVersion = browserMode = match[1];

        var tmpVer = match[1].split('.');
        tmpVer[0] = numberize(tmpVer[0]) - 4;
        engineVersion = engineMode = tmpVer.join('.');

        // ie8及以上才有trident信息
        match = /trident\/([\d.]+)/.exec(userAgent);
        if (match && match[1]) {
            var engineVer = match[1].split('.');
            engineVer[0] = numberize(engineVer[0]) + 4;

            browserVersion = engineVer.join('.');
            engineVersion = match[1];
        }


        if (engineVersion !== engineMode) {
            isCompatible = true;
        }

        return {
            browserVersion: browserVersion,
            engineVersion: engineVersion,
            browserMode: browserMode,
            engineMode: engineMode,
            isCompatible: isCompatible
        }
    }

    /**
     * 整型转换
     * @param number
     * @return {Number}
     */
    function numberize(number) {
        return parseFloat(number, 10) || 0;
    }

    /**
     * 特征分析
     * @param feature
     */
    function discern(feature) {
        var expression = feature[1],
            info = [feature[0]], // return info format: [name, version]
            tmpVer = null;

        if (!expression) {
            return false;
        }

        switch(toString(expression)) {
            case '[object Function]':
                tmpVer = expression();
                if (!tmpVer) {
                    return false;
                }
                break;
            case '[object String]':
                if (userAgent.indexOf(expression) === -1) {
                    return false;
                }
                break;
            case '[object RegExp]':
                var match = expression.exec(userAgent);
                if (!match) {
                    return false;
                }

                if (match[1]) {
                    tmpVer = match[1];
                    tmpVer = tmpVer.replace(/_/g, '.');
                }
                break;
        }

        info.push(tmpVer);

        return info;
    }

    /**
     * 分析进程
     * @param key
     * @param callback
     */
    function process(key, callback) {
        var items = feature[key],
            match;

        var i = 0, len = items.length;
        for (; i < len; ++i) {
            match = discern(items[i]);
            if (match) {
                return callback.apply(null, match);
            }
        }
        return false;
    }

    function analysis() {
        var client = {
                device: null, os: null,
                browser: null, engine: null
            },
            ieModeInfo;

        // 全IE系列检查兼容模式
        if (msieRegular.test(userAgent)) {
            ieModeInfo = compatibleMode();
        }

        // 设备
        process('device', function(name, version) {
            client.device = {
                name: name
            };

            if (version) {
                client.device.version = version;
                client.device.fullVersion = version;
            }

            client.device[name] = true;
        });

        // 系统
        process('os', function(name, version) {
            client.os = {
                name: name,
                version: numberize(version),
                fullVersion: version
            };

            client.os[name] = true;
        });

        // 浏览器
        process('browser', function(name, version) {
            var isCompatible = false,
                mode = version;

            if (ieModeInfo) {
                if (name == 'ie') {
                    version = ieModeInfo.browserVersion;
                }

                mode = ieModeInfo.browserMode;
                isCompatible = ieModeInfo.isCompatible;
            }

            client.browser = {
                name: name,
                version: numberize(version),
                fullVersion: version,
                compatible: isCompatible
            };

            if (ieModeInfo) {
                client.browser.mode = numberize(mode);
                client.browser.fullMode = mode;
            }

            client.browser[name] = true;
        });

        // 渲染引擎
        process('engine', function(name, version) {
            var isCompatible = false,
                mode = version;

            if (ieModeInfo) {
                version = ieModeInfo.engineVersion;
                mode = ieModeInfo.engineMode;
                isCompatible = ieModeInfo.isCompatible;
            }

            client.engine = {
                name: name,
                version: numberize(version),
                fullVersion: version,
                compatible: isCompatible
            };

            if (ieModeInfo) {
                client.engine.mode = numberize(mode);
                client.engine.fullMode = mode;
            }

            client.engine[name] = true;
        });

        return client;
    }

    var client = analysis();
    client.debug = function(ua) {
        userAgent = ua.toLowerCase();
        return analysis();
    };

    module.exports = client;
});
