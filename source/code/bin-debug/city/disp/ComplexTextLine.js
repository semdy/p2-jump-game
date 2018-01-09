/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var ComplexTextLine = (function (_super) {
            __extends(ComplexTextLine, _super);
            function ComplexTextLine(atu) {
                _super.call(this);
                var tu;
                var xOffset = 0;
                for (var i = 0; i < atu.length; ++i) {
                    tu = atu[i];
                    tu.x = xOffset;
                    xOffset += tu.width;
                    _super.prototype.addChild.call(this, tu);
                }
            }
            var d = __define,c=ComplexTextLine,p=c.prototype;
            return ComplexTextLine;
        })(egret.Sprite);
        disp.ComplexTextLine = ComplexTextLine;
        egret.registerClass(ComplexTextLine,'city.disp.ComplexTextLine');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
