/**
 * Created by wibrst@qq.com on 2014/9/29.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var ComplexTextPara = (function (_super) {
            __extends(ComplexTextPara, _super);
            function ComplexTextPara(atl) {
                _super.call(this);
                var wMax = 0;
                var tl;
                for (var i = 0; i < atl.length; ++i) {
                    if (atl[i].width > wMax) {
                        wMax = atl[i].width;
                    }
                }
                var hOffset = 0;
                for (var i = 0; i < atl.length; ++i) {
                    atl[i].x = (wMax - atl[i].width) / 2;
                    atl[i].y = hOffset;
                    hOffset += atl[i].height;
                    this.addChild(atl[i]);
                }
            }
            var d = __define,c=ComplexTextPara,p=c.prototype;
            return ComplexTextPara;
        })(egret.Sprite);
        disp.ComplexTextPara = ComplexTextPara;
        egret.registerClass(ComplexTextPara,'city.disp.ComplexTextPara');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
