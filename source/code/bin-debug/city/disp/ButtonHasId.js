/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var ButtonHasId = (function (_super) {
            __extends(ButtonHasId, _super);
            function ButtonHasId(txtr) {
                _super.call(this, txtr);
            }
            var d = __define,c=ButtonHasId,p=c.prototype;
            p.toString = function () {
                return "[btn" + this.id.toString() + "]";
            };
            return ButtonHasId;
        })(egret.Bitmap);
        disp.ButtonHasId = ButtonHasId;
        egret.registerClass(ButtonHasId,'city.disp.ButtonHasId');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
