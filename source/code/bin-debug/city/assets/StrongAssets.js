/**
 * Created by wibrst@qq.com on 2014/10/24.
 */
var city;
(function (city) {
    var assets;
    (function (assets_1) {
        var StrongAssets = (function () {
            function StrongAssets() {
            }
            var d = __define,c=StrongAssets,p=c.prototype;
            StrongAssets.extract = function (idAsstes, bSuppressException) {
                if (bSuppressException === void 0) { bSuppressException = false; }
                var assets = RES.getRes(idAsstes);
                if (assets == undefined) {
                    if (bSuppressException) {
                        city.utils.DevUtil.trace(this, "extract failed!" + idAsstes);
                    }
                    else {
                        throw new Error("assets(" + idAsstes + ") doesn't exist!");
                    }
                }
                else {
                    return assets;
                }
            };
            StrongAssets.extractTxtrFromSheet = function (idAsstes, sheet, bSuppressException) {
                if (bSuppressException === void 0) { bSuppressException = false; }
                var assets = sheet.getTexture(idAsstes);
                if (assets == undefined) {
                    if (bSuppressException) {
                        city.utils.DevUtil.trace(this, "extract failed!" + idAsstes);
                    }
                    else {
                        throw new Error("sheet assets(" + idAsstes + ") doesn't exist!");
                    }
                }
                else {
                    return assets;
                }
            };
            StrongAssets.toString = function () {
                return "[-StrongAssets-]";
            };
            return StrongAssets;
        })();
        assets_1.StrongAssets = StrongAssets;
        egret.registerClass(StrongAssets,'city.assets.StrongAssets');
    })(assets = city.assets || (city.assets = {}));
})(city || (city = {}));
