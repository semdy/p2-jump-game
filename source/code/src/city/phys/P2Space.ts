/**
 * Created by egret on 2015/1/9.
 * author: city@egret-labs.org
 */

module city.phys {

    export class P2Space {
        /**
         * p2世界坐标系与实际显示空间坐标系的比例因子
         * 通常p2进行物理运算时，使用p2世界坐标系
         * 当物理世界的刚体需要显示时，使用显示坐标系
         */
        public static  $factor:number;

        private static yAxis = p2.vec2.fromValues(0,1);

        /**
         * 判断指定的刚体在p2世界中是否满足起跳条件
         * @param world     p2世界
         * @param body      指定的刚体
         * @returns {boolean}   是否满足起跳条件
         */
        public static checkIfCanJump( world:p2.World, body:p2.Body ):boolean{
            var result = false;
            for(var i=0; i<world.narrowphase.contactEquations.length; i++){
                var c = world.narrowphase.contactEquations[i];
                if(c.bodyA === body || c.bodyB === body){
                    var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                    if(c.bodyA === body) d *= -1;
                    console.log( "checkIfCanJump:", d );
                    if(d < -0.5) result = true;
                }
            }
            return result;
        }

        /**
         * 同步p2世界中的刚体，使其对应的显示对象正确显示
         * @param 刚体
         */
        public static syncDisplay( body:p2.Body, comment:string = ""  ):void {
            /// debug
            if( !body ) return;
            
            var disp:egret.DisplayObject = body.displays[0];
            if (disp) {
                var loc:Array<any> = P2Space.getEgretLoc( body, comment );
                disp.x = loc[0];
                disp.y = loc[1];
                disp.rotation = 360 - body.angle * 180 / Math.PI;
                if( comment.length ){
                    console.log( comment + "的锚点", disp.anchorOffsetX, disp.anchorOffsetY );
                }
            }
        }

        /**
         * 由p2空间尺寸得到显示空间尺寸
         * @param extentP2          p2空间尺寸
         * @returns {number}        显示空间尺寸
         */
        public static extentEgret(extentP2:number):number {
            return extentP2 * this.$factor;
        }

        /**
         * 由显示空间尺寸得到p2空间尺寸
         * @param extentEgret       显示空间尺寸
         * @returns {number}        p2空间尺寸
         */
        public static extentP2(extentEgret:number):number {
            return extentEgret / this.$factor;
        }

        /**
         * 由Egret显示坐标系的坐标获得对应p2坐标系的坐标
         * @param xEgret
         * @param yEgret
         * @returns {any[]}     以数组返回计算出的p2空间坐标
         */
        public static getP2Pos(xEgret:number, yEgret:number):Array<number> {
            return [xEgret / this.$factor, ( /*this._rectWorld.height -*/ yEgret ) / this.$factor];
        }

        /**
         * 根据p2空间的刚体坐标计算出其对应的显示空间坐标
         * @param body
         * @returns {any[]}
         */
        public static getEgretLoc(body:p2.Body, comment:string = "" ):Array<number> {
            //var shp:p2.Shape = body.shapes[0];
            var xP2:number = body.position[0];
            var yP2:number = body.position[1];
            if( comment.length ){
                console.log( "[" +comment+ "]getEgretLoc:", xP2, yP2, "(p2->egret)", xP2 * this.$factor, /*this._rectWorld.height -*/ yP2 * this.$factor );
            }

            return [xP2 * this.$factor, /*this._rectWorld.height - */  yP2 * this.$factor];
        }

        /**
         * 初始化p2空间
         * @param factor            p2空间坐标系的比例因子
         * @param rectWorld     p2世界的矩形区域，该矩形区域使用显示空间坐标
         */
        public static initSpace(factor:number, rectWorld:egret.Rectangle):void {
            this.$factor = factor;
            this._rectWorld = rectWorld;
        }

        private static  _rectWorld:egret.Rectangle;
    }

}