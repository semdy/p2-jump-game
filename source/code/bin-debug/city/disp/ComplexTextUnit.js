/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var ComplexTextUnit = (function (_super) {
            __extends(ComplexTextUnit, _super);
            function ComplexTextUnit(text, color) {
                _super.call(this);
                this.fontFamily = "微软雅黑";
                this.textColor = color;
                this.size = 40;
                this.text = text;
            }
            var d = __define,c=ComplexTextUnit,p=c.prototype;
            return ComplexTextUnit;
        })(egret.TextField);
        disp.ComplexTextUnit = ComplexTextUnit;
        egret.registerClass(ComplexTextUnit,'city.disp.ComplexTextUnit');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
