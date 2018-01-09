/**
 * Created by wibrst@qq.com on 2014/10/14.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var StringUtil = (function () {
            function StringUtil() {
            }
            var d = __define,c=StringUtil,p=c.prototype;
            StringUtil.getRepeatString = function (sBase, nRepeat) {
                if (nRepeat <= 0) {
                    throw new Error("lenth must >= 0!");
                }
                else {
                    var sProd = sBase;
                    for (var i = nRepeat; i > 1; --i)
                        sProd = sBase + sProd;
                    return sProd;
                }
            };
            StringUtil.charIsNum = function (charSuper) {
                return charSuper >= "0" && charSuper <= "9";
            };
            StringUtil.charIsLower = function (charSuper) {
                return charSuper >= "a" && charSuper <= "z";
            };
            StringUtil.charIsUpper = function (charSuper) {
                return charSuper >= "A" && charSuper <= "Z";
            };
            d(StringUtil, "urlRandomPostfix"
                ,function () {
                    return "?pfr=" + egret.getTimer().toString() + Math.ceil(Math.random() * 100000);
                    /// postfix random
                }
            );
            return StringUtil;
        })();
        utils.StringUtil = StringUtil;
        egret.registerClass(StringUtil,'city.utils.StringUtil');
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
