/**
 * Created by wibrst@qq.com on 2014/10/27.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var BrowserUtil = (function () {
            function BrowserUtil() {
            }
            var d = __define,c=BrowserUtil,p=c.prototype;
            BrowserUtil.updateURL = function (uTo) {
                window.open(uTo, "_self");
            };
            BrowserUtil.refreshSelf = function () {
                location.reload();
            };
            return BrowserUtil;
        })();
        utils.BrowserUtil = BrowserUtil;
        egret.registerClass(BrowserUtil,'city.utils.BrowserUtil');
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
