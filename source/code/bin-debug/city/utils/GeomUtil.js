/**
 * Created by wibrst@qq.com on 2014/10/27.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var GeomUtil = (function () {
            function GeomUtil() {
            }
            var d = __define,c=GeomUtil,p=c.prototype;
            GeomUtil.adjustDispWithCen = function (pCen, disp) {
                disp.x = pCen.x - disp.width * .5 - disp.anchorOffsetX + this.TEXT_MATRIX_ADJUST_X;
                disp.y = pCen.y - disp.height * .5 - disp.anchorOffsetY + this.TEXT_MATRIX_ADJUST_Y;
            };
            GeomUtil.TEXT_MATRIX_ADJUST_X = 8;
            GeomUtil.TEXT_MATRIX_ADJUST_Y = 8;
            return GeomUtil;
        })();
        utils.GeomUtil = GeomUtil;
        egret.registerClass(GeomUtil,'city.utils.GeomUtil');
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
