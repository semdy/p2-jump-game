/**
 * Created by egret on 2015/1/9.
 * author: city@egret-labs.org
 */
var city;
(function (city) {
    var phys;
    (function (phys) {
        var P2Space = (function () {
            function P2Space() {
            }
            var d = __define,c=P2Space,p=c.prototype;
            /**
             * 判断指定的刚体在p2世界中是否满足起跳条件
             * @param world     p2世界
             * @param body      指定的刚体
             * @returns {boolean}   是否满足起跳条件
             */
            P2Space.checkIfCanJump = function (world, body) {
                var result = false;
                for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
                    var c = world.narrowphase.contactEquations[i];
                    if (c.bodyA === body || c.bodyB === body) {
                        var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                        if (c.bodyA === body)
                            d *= -1;
                        console.log("checkIfCanJump:", d);
                        if (d < -0.5)
                            result = true;
                    }
                }
                return result;
            };
            /**
             * 同步p2世界中的刚体，使其对应的显示对象正确显示
             * @param 刚体
             */
            P2Space.syncDisplay = function (body, comment) {
                if (comment === void 0) { comment = ""; }
                /// debug
                if (!body)
                    return;
                var disp = body.displays[0];
                if (disp) {
                    var loc = P2Space.getEgretLoc(body, comment);
                    disp.x = loc[0];
                    disp.y = loc[1];
                    disp.rotation = 360 - body.angle * 180 / Math.PI;
                    if (comment.length) {
                        console.log(comment + "的锚点", disp.anchorOffsetX, disp.anchorOffsetY);
                    }
                }
            };
            /**
             * 由p2空间尺寸得到显示空间尺寸
             * @param extentP2          p2空间尺寸
             * @returns {number}        显示空间尺寸
             */
            P2Space.extentEgret = function (extentP2) {
                return extentP2 * this.$factor;
            };
            /**
             * 由显示空间尺寸得到p2空间尺寸
             * @param extentEgret       显示空间尺寸
             * @returns {number}        p2空间尺寸
             */
            P2Space.extentP2 = function (extentEgret) {
                return extentEgret / this.$factor;
            };
            /**
             * 由Egret显示坐标系的坐标获得对应p2坐标系的坐标
             * @param xEgret
             * @param yEgret
             * @returns {any[]}     以数组返回计算出的p2空间坐标
             */
            P2Space.getP2Pos = function (xEgret, yEgret) {
                return [xEgret / this.$factor, (yEgret) / this.$factor];
            };
            /**
             * 根据p2空间的刚体坐标计算出其对应的显示空间坐标
             * @param body
             * @returns {any[]}
             */
            P2Space.getEgretLoc = function (body, comment) {
                if (comment === void 0) { comment = ""; }
                //var shp:p2.Shape = body.shapes[0];
                var xP2 = body.position[0];
                var yP2 = body.position[1];
                if (comment.length) {
                    console.log("[" + comment + "]getEgretLoc:", xP2, yP2, "(p2->egret)", xP2 * this.$factor, /*this._rectWorld.height -*/ yP2 * this.$factor);
                }
                return [xP2 * this.$factor, yP2 * this.$factor];
            };
            /**
             * 初始化p2空间
             * @param factor            p2空间坐标系的比例因子
             * @param rectWorld     p2世界的矩形区域，该矩形区域使用显示空间坐标
             */
            P2Space.initSpace = function (factor, rectWorld) {
                this.$factor = factor;
                this._rectWorld = rectWorld;
            };
            P2Space.yAxis = p2.vec2.fromValues(0, 1);
            return P2Space;
        })();
        phys.P2Space = P2Space;
        egret.registerClass(P2Space,'city.phys.P2Space');
    })(phys = city.phys || (city.phys = {}));
})(city || (city = {}));
