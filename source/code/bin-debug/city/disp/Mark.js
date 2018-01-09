/**
 * Created by wibrst@qq.com on 2014/8/20.
 */
var city;
(function (city) {
    var disp;
    (function (disp) {
        var Mark = (function (_super) {
            __extends(Mark, _super);
            function Mark(cLine, cFill) {
                _super.call(this);
                this.graphics.lineStyle(1, cLine);
                this.graphics.beginFill(cFill);
                this.graphics.drawRect(0, 0, 10, 10);
                this.graphics.endFill();
            }
            var d = __define,c=Mark,p=c.prototype;
            return Mark;
        })(egret.Shape);
        disp.Mark = Mark;
        egret.registerClass(Mark,'city.disp.Mark');
    })(disp = city.disp || (city.disp = {}));
})(city || (city = {}));
