define(function(require) {
    var expect = require('expect');
    var Client = require('client');

    var exams = [
        // Window7 IE10
        {
            title: 'Window7 IE10',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // Window7 IE10 兼容模式
        {
            title: 'Window7 IE10 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // Window7 IE9
        {
            title: 'Window7 IE9',
            ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:9.0|c:0|m:9.0',
                engine: 'n:trident|v:5.0|c:0|m:5.0'
            }
        },
        // Window7 IE9 兼容模式
        {
            title: 'Window7 IE9 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:9.0|c:1|m:7.0',
                engine: 'n:trident|v:5.0|c:1|m:3.0'
            }
        },
        // Window XP IE8
        {
            title: 'Window XP IE8',
            ua: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:ie|v:8.0|c:0|m:8.0',
                engine: 'n:trident|v:4.0|c:0|m:4.0'
            }
        },
        // Window XP IE8 兼容模式
        {
            title: 'Window XP IE8 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:ie|v:8.0|c:1|m:7.0',
                engine: 'n:trident|v:4.0|c:1|m:3.0'
            }
        },
        // Window XP IE7
        {
            title: 'Window XP IE7',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:ie|v:7.0|c:0|m:7.0',
                engine: 'n:trident|v:3.0|c:0|m:3.0'
            }
        },
        // Window XP IE6
        {
            title: 'Window XP IE6',
            ua: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:ie|v:6.0|c:0|m:6.0',
                engine: 'n:trident|v:2.0|c:0|m:2.0'
            }
        },



        // Window7 Chrome
        {
            title: 'Window7 Chrome',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:chrome|v:27.0.1453.110|c:0',
                engine: 'n:webkit|v:537.36|c:0'
            }
        },
        // Window XP Chrome
        {
            title: 'Window XP Chrome',
            ua: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:chrome|v:26.0.1410.64|c:0',
                engine: 'n:webkit|v:537.31|c:0'
            }
        },
        // Macintosh Chrome
        {
            title: 'Macintosh Chrome',
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.99 Safari/537.22',
            answer: {
                device: 'n:mac',
                os: 'n:macosx|v:10.8.3',
                browser: 'n:chrome|v:25.0.1364.99|c:0',
                engine: 'n:webkit|v:537.22|c:0'
            }
        },
        // Google ChromeOS Chrome
        {
            title: 'Google ChromeOS Chrome',
            ua: 'Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML like Gecko) Chrome/27.0.1453.116 Safari/537.36',
            answer: {
                device: 'n:chrome',
                os: 'n:chromeos|v:3912.101.0',
                browser: 'n:chrome|v:27.0.1453.116|c:0',
                engine: 'n:webkit|v:537.36|c:0'
            }
        },
        // iPhone Chrome
        {
            title: 'iPhone Chrome',
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) CriOS/27.0.1453.10 Mobile/11A4372q Safari/8536.25',
            answer: {
                device: 'n:iphone',
                os: 'n:ios|v:7.0',
                browser: 'n:chrome|v:27.0.1453.10|c:0',
                engine: 'n:webkit|v:536.26|c:0'
            }
        },
        // iPad Chrome
        {
            title: 'iPad Chrome',
            ua: 'Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) CriOS/27.0.1453.10 Mobile/10B329 Safari/8536.25',
            answer: {
                device: 'n:ipad',
                os: 'n:ios|v:6.1.3',
                browser: 'n:chrome|v:27.0.1453.10|c:0',
                engine: 'n:webkit|v:536.26|c:0'
            }
        },
        // Galaxy Nexus Chrome
        {
            title: 'Galaxy Nexus Chrome',
            ua: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:4.0.4',
                browser: 'n:chrome|v:18.0.1025.133|c:0',
                engine: 'n:webkit|v:535.19|c:0'
            }
        },
        // Nexus 7 Chrome
        {
            title: 'Nexus 7 Chrome',
            ua: 'Mozilla/5.0 (Linux; Android 4.1.2; Nexus 7 Build/JZ054K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:4.1.2',
                browser: 'n:chrome|v:18.0.1025.166|c:0',
                engine: 'n:webkit|v:535.19|c:0'
            }
        },



        // Window7 Firefox
        {
            title: 'Window7 Firefox',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:firefox|v:21.0|c:0',
                engine: 'n:gecko|v:20100101|c:0'
            }
        },
        // Window XP Firefox
        {
            title: 'Window XP Firefox',
            ua: 'Mozilla/5.0 (Windows NT 5.1; rv:20.0) Gecko/20100101 Firefox/20.0',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:firefox|v:20.0|c:0',
                engine: 'n:gecko|v:20100101|c:0'
            }
        },
        // Macintosh Firefox
        {
            title: 'Macintosh Firefox',
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:19.0) Gecko/20100101 Firefox/19.0',
            answer: {
                device: 'n:mac',
                os: 'n:macosx|v:10.8',
                browser: 'n:firefox|v:19.0|c:0',
                engine: 'n:gecko|v:20100101|c:0'
            }
        },



        // Windows7 Safari
        {
            title: 'Windows7 Safari',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:safari|v:5.1.7|c:0',
                engine: 'n:webkit|v:534.57.2|c:0'
            }
        },
        // Macintosh Safari
        {
            title: 'Macintosh Safari',
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/536.28.10 (KHTML, like Gecko) Version/6.0.3 Safari/536.28.10',
            answer: {
                device: 'n:mac',
                os: 'n:macosx|v:10.8.3',
                browser: 'n:safari|v:6.0.3|c:0',
                engine: 'n:webkit|v:536.28.10|c:0'
            }
        },
        // iPhone Safari
        {
            title: 'iPhone Safari',
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.40 (KHTML, like Gecko) Version/6.0 Mobile/11A4372q Safari/8536.25',
            answer: {
                device: 'n:iphone',
                os: 'n:ios|v:7.0',
                browser: 'n:safari|v:6.0|c:0',
                engine: 'n:webkit|v:537.40|c:0'
            }
        },
        // iPad Safari
        {
            title: 'iPad Safari',
            ua: 'Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25',
            answer: {
                device: 'n:ipad',
                os: 'n:ios|v:6.1.3',
                browser: 'n:safari|v:6.0|c:0',
                engine: 'n:webkit|v:536.26|c:0'
            }
        },
        // iPod Safari
        {
            title: 'iPod Safari',
            ua: 'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
            answer: {
                device: 'n:ipod',
                os: 'n:ios|v:4.3.3',
                browser: 'n:safari|v:5.0.2|c:0',
                engine: 'n:webkit|v:533.17.9|c:0'
            }
        },
        // Nexus One Safari
        {
            title: 'Nexus One Safari',
            ua: 'Mozilla/5.0 (Linux; U; Android 2.2; en-gb; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML like Gecko) Version/4.0 Mobile Safari/533.1',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:2.2',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:533.1|c:0'
            }
        },
        // Nexus S Safari
        {
            title: 'Nexus S Safari',
            ua: 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:2.3.6',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:533.1|c:0'
            }
        },
        // Galaxy Nexus
        {
            title: 'Galaxy Nexus',
            ua: 'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:4.0.2',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:534.30|c:0'
            }
        },




        // Windows7 Opera
        {
            title: 'Opera',
            ua: 'Opera/9.80 (Windows NT 6.1; Win64; x64) Presto/2.12.388 Version/12.15',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:opera|v:12.15|c:0',
                engine: 'n:presto|v:2.12.388|c:0'
            }
        },
        // Windows7 Opera Next
        {
            title: 'Opera Next',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36 OPR/15.0.1147.100 (Edition Next)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:opera|v:15.0.1147.100|c:0',
                engine: 'n:webkit|v:537.36|c:0'
            }
        },
        // iPhone Opera
        {
            title: 'iPhone Opera',
            ua: 'Opera/9.80 (iPhone; Opera Mini/7.0.5/29.3551; U; zh) Presto/2.8.119 Version/11.10n/11.10',
            answer: {
                device: 'n:iphone',
                os: null,
                browser: 'n:opera|v:7.0.5|c:0',
                engine: 'n:presto|v:2.8.119|c:0'
            }
        },




        // 搜狗浏览器
        {
            title: '搜狗浏览器',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17 SE 2.X MetaSr 1.0',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:sogou|v:2.x|c:0',
                engine: 'n:webkit|v:537.17|c:0'
            }
        },
        // 搜狗浏览器 兼容模式
        {
            title: '搜狗浏览器 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; SE 2.X MetaSr 1.0)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:sogou|v:2.x|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 傲游云浏览器 极速模式
        {
            title: '傲游云浏览器 极速模式',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Maxthon/4.0.6.2000 Chrome/26.0.1410.43 Safari/537.1',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:maxthon|v:4.0.6.2000|c:0',
                engine: 'n:webkit|v:537.1|c:0'
            }
        },
        // 傲游云浏览器 兼容模式
        {
            title: '傲游云浏览器 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; Maxthon/4.0.6.2000)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:maxthon|v:4.0.6.2000|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // QQ浏览器 极速模式
        {
            title: 'QQ浏览器 极速模式',
            ua: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.7 (KHTML, like Gecko) Chrome/20.0.1099.0 Safari/536.7 QQBrowser/6.14.15138.201',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:qq|v:6.14.15138.201|c:0',
                engine: 'n:webkit|v:536.7|c:0'
            }
        },
        // QQ浏览器 兼容模式
        {
            title: 'QQ浏览器 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) QQBrowser/6.14.15138.201',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:qq|v:6.14.15138.201|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 360安全浏览器 V6 极速模式
        {
            title: '360安全浏览器 V6 极速模式',
            ua: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:5.1',
                browser: 'n:chrome|v:21.0.1180.89|c:0',
                engine: 'n:webkit|v:537.1|c:0'
            }
        },
        // 360安全浏览器 V6 兼容模式
        {
            title: '360安全浏览器 V6 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 360安全浏览器 V6 IE10模式
        {
            title: '360安全浏览器 V6 IE10模式',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // 360安全浏览器 V5
        {
            title: '360安全浏览器 V5',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // 360极速浏览器 极速模式
        {
            title: '360极速浏览器 极速模式',
            ua: ' Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:chrome|v:24.0.1312.57|c:0',
                engine: 'n:webkit|v:537.17|c:0'
            }
        },
        // 360极速浏览器 兼容模式
        {
            title: '360极速浏览器 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 360极速浏览器 IE9/IE10模式
        {
            title: '360极速浏览器 IE9/IE10模式',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // 淘宝浏览器 极速模式
        {
            title: '淘宝浏览器 极速模式',
            ua: ' Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/3.0 Safari/536.11',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:tb|v:3.0|c:0',
                engine: 'n:webkit|v:536.11|c:0'
            }
        },
        // 淘宝浏览器 兼容模式
        {
            title: '淘宝浏览器 兼容模式',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; TaoBrowser/3.0)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:tb|v:3.0|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 百度浏览器 极速模式
        {
            title: '百度浏览器 极速模式',
            ua: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 BIDUBrowser/2.x Safari/537.31',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:baidu|v:2.x|c:0',
                engine: 'n:webkit|v:537.31|c:0'
            }
        },
        // 百度浏览器 兼容模式
        {
            title: '百度浏览器 兼容模式',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:baidu|v:2.x|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        /*
        // 世界之窗
        {
            title: '世界之窗',
            ua: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:theworld|v:3.6.1.0|c:1|m:7.0',
                engine: 'n:trident|v:6.0|c:1|m:3.0'
            }
        },
        // 世界之窗 IE高级渲染模式
        {
            title: '世界之窗 IE高级渲染模式',
            ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)',
            answer: {
                device: 'n:pc',
                os: 'n:windows|v:6.1',
                browser: 'n:theworld|v:3.6.1.0|c:1|m:9.0',
                engine: 'n:trident|v:6.0|c:1|m:5.0'
            }
        },*/



        // iPhone 新浪微博 Webview
        {
            title: 'iPhone 新浪微博 Webview',
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.40 (KHTML, like Gecko) Mobile/11A4400f',
            answer: {
                device: 'n:iphone',
                os: 'n:ios|v:7.0',
                browser: 'n:webview|v:null|c:0',
                engine: 'n:webkit|v:537.40|c:0'
            }
        },
        // iPhone 微信 Webview
        {
            title: 'iPhone 微信 Webview',
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.40 (KHTML, like Gecko) Mobile/11A4400f MicroMessenger/4.5',
            answer: {
                device: 'n:iphone',
                os: 'n:ios|v:7.0',
                browser: 'n:webview|v:null|c:0',
                engine: 'n:webkit|v:537.40|c:0'
            }
        },
        // iPhone QQ客户端 Webview
        {
            title: 'iPhone QQ客户端 Webview',
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.40 (KHTML, like Gecko) Mobile/11A4400f',
            answer: {
                device: 'n:iphone',
                os: 'n:ios|v:7.0',
                browser: 'n:webview|v:null|c:0',
                engine: 'n:webkit|v:537.40|c:0'
            }
        },
        // iPad Webview
        {
            title: 'iPad Webview',
            ua: 'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176',
            answer: {
                device: 'n:ipad',
                os: 'n:ios|v:5.1',
                browser: 'n:webview|v:null|c:0',
                engine: 'n:webkit|v:534.46|c:0'
            }
        },
        // iPhone UC浏览器
        /*{
            title: 'iPhone UC浏览器',
            ua: 'Mozilla/5.0 (X11; U; Linux i686; zh-CN; rv:1.2.3.4) Gecko/',
            answer: {
                device: 'n:nexus',
                os: 'n:android|v:4.0.2',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:534.30|c:0'
            }
        },*/


        // SymbianOS
        {
            title: 'SymbianOS',
            ua: 'Mozilla/5.0 (SymbianOS/9.1; U; en-us) AppleWebKit/413 (KHTML like Gecko) Safari/413',
            answer: {
                device: null,
                os: 'n:symbian|v:9.1',
                browser: null,
                engine: 'n:webkit|v:413|c:0'
            }
        },

        // BlackBerry 9900
        {
            title: 'BlackBerry 9900',
            ua: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11+',
            answer: {
                device: 'n:blackberry',
                os: 'n:blackberry|v:null',
                browser: 'n:safari|v:7.0.0.187|c:0',
                engine: 'n:webkit|v:534.11|c:0'
            }
        },



        // Windows Phone 8.0 IE10 华为 W1-U00
        {
            title: 'Windows Phone 8.0 IE10 华为 W1-U00',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HUAWEI; W1-U00)',
            answer: {
                device: 'n:wp',
                os: 'n:wp|v:8.0',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // Windows Phone 8.0 IE10
        {
            title: 'Windows Phone 8.0 IE10',
            ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch)',
            answer: {
                device: 'n:wp',
                os: 'n:wp|v:8.0',
                browser: 'n:ie|v:10.0|c:0|m:10.0',
                engine: 'n:trident|v:6.0|c:0|m:6.0'
            }
        },
        // Windows Phone 7.5 IE9
        {
            title: 'Windows Phone 7.5 IE9',
            ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
            answer: {
                device: 'n:wp',
                os: 'n:wp|v:7.5',
                browser: 'n:ie|v:9.0|c:0|m:9.0',
                engine: 'n:trident|v:5.0|c:0|m:5.0'
            }
        },
        // Windows CE IE6.0
        {
            title: 'Windows CE IE6.0',
            ua: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 8.12; MSIEMobile6.0) Sprint T7380',
            answer: {
                device: 'n:wp',
                os: 'n:windowsce|v:null',
                browser: 'n:ie|v:6.0|c:0|m:6.0',
                engine: 'n:trident|v:2.0|c:0|m:2.0'
            }
        },

        // 小米
        {
            title: '小米',
            ua: 'Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; MI-ONE Plus Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
            answer: {
                device: 'n:mi',
                os: 'n:android|v:2.3.5',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:533.1|c:0'
            }
        },

        // 魅族 M030
        {
            title: '魅族 M030',
            ua: 'Mozilla/5.0 (Linux; U; Android 4.0.3; zh-cn; M030 Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 MicroMessenger/4.2.191',
            answer: {
                device: 'n:meizu',
                os: 'n:android|v:4.0.3',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:534.30|c:0'
            }
        },
        // 魅族 MX 11316
        {
            title: '魅族 MX 11316',
            ua: 'Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; MEIZU MX Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
            answer: {
                device: 'n:meizu',
                os: 'n:android|v:2.3.5',
                browser: 'n:safari|v:4.0|c:0',
                engine: 'n:webkit|v:533.1|c:0'
            }
        }
    ];

    describe('client', function() {
        var i = 0, len = exams.length,
            clientInfo;

        for (; i < len; i++) {
            clientInfo = Client.debug(exams[i].ua);

            (function(clientInfo, title, answer) {
                it(title, function() {
                    var k;
                    for (k in answer) {
                        var result = null;

                        if (clientInfo[k]) {
                            var result = ['n:' + clientInfo[k].name];
                            if (k !== 'device') {
                                result.push('v:' + clientInfo[k].fullVersion);
                            }

                            if (k === 'browser' || k === 'engine') {
                                result.push('c:' + (clientInfo[k].compatible ? 1 : 0));
                                clientInfo[k].fullMode && result.push('m:' + clientInfo[k].fullMode);
                            }

                            result = result.join('|');
                        }

                        expect(result).to.equal(answer[k]);
                    }
                });
            })(clientInfo, exams[i].title, exams[i].answer);
        }
    });
});