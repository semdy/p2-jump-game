/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var TxButtonHasId = (function (_super) {
            __extends(TxButtonHasId, _super);
            function TxButtonHasId() {
                _super.call(this);
            }
            var d = __define,c=TxButtonHasId,p=c.prototype;
            p.toString = function () {
                return "[txbtn" + this.id.toString() + "]";
            };
            return TxButtonHasId;
        })(egret.TextField);
        disp.TxButtonHasId = TxButtonHasId;
        egret.registerClass(TxButtonHasId,'city.disp.TxButtonHasId');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
