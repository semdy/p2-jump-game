/**
 * Created by wibrst@qq.com on 2014/10/23.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var Namer = (function () {
            function Namer() {
            }
            var d = __define,c=Namer,p=c.prototype;
            d(Namer, "getOne"
                ,function () {
                    ++this.count;
                    return "obj_" + this.count;
                }
            );
            Namer.count = 0;
            return Namer;
        })();
        utils.Namer = Namer;
        egret.registerClass(Namer,'city.utils.Namer');
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
