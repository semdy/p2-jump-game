/**
 * Created by wibrst@qq.com on 2014/9/4.
 */
var city;
(function (city) {
    var utils;
    (function (utils) {
        var ArrayUtil = (function () {
            function ArrayUtil() {
            }
            var d = __define,c=ArrayUtil,p=c.prototype;
            ArrayUtil.removeElem = function (elem, aOrig) {
                var idxHit = aOrig.indexOf(elem);
                if (idxHit != -1) {
                    aOrig.splice(idxHit, 1);
                    return true;
                }
                else {
                    return false;
                }
            };
            ArrayUtil.shuffle = function (aOrig) {
                for (var i = aOrig.length - 1; i > -1; --i) {
                    var r = Math.floor(aOrig.length * Math.random()); /// produce random idx
                    var tmp = aOrig[i];
                    aOrig[i] = aOrig[r];
                    aOrig[r] = tmp; /// swap element between thru idx and randm idx
                }
            };
            /// 目前只支持返回一个元素！
            ArrayUtil.getRdmElem = function (aSrc, bRemove, nStart, nEnd) {
                if (bRemove === void 0) { bRemove = false; }
                if (nStart === void 0) { nStart = 0; }
                if (nEnd === void 0) { nEnd = -1; }
                if (nEnd == -1)
                    nEnd = aSrc.length;
                var nLenValid = nEnd - nStart;
                var idxHit = this.getRdmIdx(nLenValid, nStart);
                if (bRemove) {
                    return aSrc.splice(idxHit, 1)[0];
                }
                else {
                    return aSrc[idxHit];
                }
            };
            ArrayUtil.getRdmIdx = function (nLen, nBase) {
                if (nBase === void 0) { nBase = 0; }
                return nBase + Math.floor(Math.random() * nLen);
            };
            // 取得序列数组
            ArrayUtil.getSeriesNumArr = function (iLen, iStart) {
                if (iStart === void 0) { iStart = 0; }
                //trace( "[CommUtils] getSeriesNumArr", arguments );
                if (iLen <= 0) {
                    return [];
                }
                var aProd = new Array();
                for (var i = iStart + iLen - 1; i >= iStart; --i) {
                    aProd.unshift(i);
                }
                return aProd;
            };
            return ArrayUtil;
        })();
        utils.ArrayUtil = ArrayUtil;
        egret.registerClass(ArrayUtil,'city.utils.ArrayUtil');
    })(utils = city.utils || (city.utils = {}));
})(city || (city = {}));
