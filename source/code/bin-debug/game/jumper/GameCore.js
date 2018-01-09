/**
 * Created by egret on 2015/2/4.
 */
var game;
(function (game) {
    var jumper;
    (function (jumper) {
        var GameCore = (function (_super) {
            __extends(GameCore, _super);
            function GameCore() {
                _super.call(this);
                this.PLAYER_VY = -50;
                this.PLAYER_VX = 32;
                this.WORLD_STEP_DT = 2.5;
                this.GRAVITY = 1.6;
                this._bDispReal = true;
            }
            var d = __define,c=GameCore,p=c.prototype;
            p.touchProcess = function (e) {
                /// debug
                if (!this._pbPlayer)
                    return;
                if (city.key.KeyManager.isDown(city.key.KeyManager.Alt_L)) {
                    this.debugLogLoc(Math.floor(e.stageX), Math.floor(e.stageY));
                }
                else if (e.stageY > 750) {
                    if (e.stageX < 240) {
                        this._pbPlayer.velocity[0] = -this.PLAYER_VX;
                    }
                    else {
                        this._pbPlayer.velocity[0] = this.PLAYER_VX;
                    }
                }
                else {
                    if (city.phys.P2Space.checkIfCanJump(this._pw, this._pbPlayer)) {
                        this._pbPlayer.velocity[0] = this.PLAYER_VX * (e.stageX - 240) / 200;
                        this._pbPlayer.velocity[1] = this.PLAYER_VY;
                        console.log("jump speed:", this._pbPlayer.velocity);
                    }
                    else {
                        city.utils.DevUtil.trace("player no jump:", this._pbPlayer.velocity[1]);
                    }
                }
            };
            p.run = function (dt) {
                this._pw.step(this.WORLD_STEP_DT);
                /// 浮动板
                if (this._vcGroundsFloating[0].position[0] > this._p2FloatingLimitRight) {
                    this._vcGroundsFloating[0].position[0] = this._p2FloatingLimitLeft;
                }
                if (this._vcGroundsFloating[1].position[0] < this._p2FloatingLimitLeft) {
                    this._vcGroundsFloating[1].position[0] = this._p2FloatingLimitRight;
                }
                if (this._vcGroundsFloating[2].position[0] > this._p2FloatingLimitRight) {
                    this._vcGroundsFloating[2].position[0] = this._p2FloatingLimitLeft;
                }
                if (this._bDispReal) {
                    /// 玩家
                    city.phys.P2Space.syncDisplay(this._pbPlayer);
                    city.phys.P2Space.syncDisplay(this._vcGroundsFloating[0]);
                    city.phys.P2Space.syncDisplay(this._vcGroundsFloating[1]);
                    city.phys.P2Space.syncDisplay(this._vcGroundsFloating[2]);
                }
                else {
                    this._p2DebugPainter.drawDebug();
                }
            };
            p.setDev = function () {
            };
            p.initDebug = function () {
                this._txTouchStatus = new city.disp.TxButtonHasId;
                city.utils.DispUtil.layoutTxButtonHasId(-1, this._txTouchStatus, "", 280, 3, this, null, null, 28, 0);
            };
            p.createWorldSystem = function () {
                /// P2Center 初始化
                city.phys.P2Space.initSpace(1, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
                this._p2FloatingLimitLeft = city.phys.P2Space.extentP2(-100);
                this._p2FloatingLimitRight = city.phys.P2Space.extentP2(this.stage.stageWidth + 100);
                //创建 world
                this._pw = new p2.World();
                //this._pw.sleepMode = p2.World.BODY_SLEEPING;
                this._pw.defaultContactMaterial.friction = 0.5;
                this._pw.setGlobalStiffness(1000);
                //this._pw['setGlobalStiffness'](); 
                //P2Center.debug( world );
                this._pw.gravity[1] = this.GRAVITY;
                city.utils.DevUtil.trace("gravity:", this._pw.gravity[0], this._pw.gravity[1]);
                /// 创建 墙面 底部高50, 两边墙面间距50
                this._vcGroundsFixed = [
                    this.createGround(this._pw, this, 1, 0, 640, 50, "rects.rect-" + "9", 0, 750, "地面") /// 地面
                    ,
                    this.createGround(this._pw, this, 2, 0, 50, 750, "rects.rect-" + "1", 0, 0, "左墙面") /// 左墙面
                    ,
                    this.createGround(this._pw, this, 3, 0, 50, 750, "rects.rect-" + "1", 430, 0, "右墙面") /// 右墙面
                ];
                /// 创建浮动跳板
                this._vcGroundsFloating = [
                    this.createGround(this._pw, this, 4, 0.6, 120, 20, "rects.rect-" + "0", this._p2FloatingLimitLeft, 600) /// -->
                    ,
                    this.createGround(this._pw, this, 5, -0.8, 90, 20, "rects.rect-" + "8", this._p2FloatingLimitRight, 450) /// <--
                    ,
                    this.createGround(this._pw, this, 6, 1.2, 80, 20, "rects.rect-" + "10", this._p2FloatingLimitLeft, 300) /// -->
                ];
                /// debug
                if (this._bDispReal) {
                    city.phys.P2Space.syncDisplay(this._vcGroundsFixed[0], "地面");
                    city.phys.P2Space.syncDisplay(this._vcGroundsFixed[1]);
                    city.phys.P2Space.syncDisplay(this._vcGroundsFixed[2]);
                }
                else {
                    var spDebug = new egret.Sprite;
                    spDebug.name = "spDebug";
                    this.addChild(spDebug);
                    spDebug.graphics.beginFill(0, .3);
                    spDebug.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
                    spDebug.graphics.endFill();
                    this._p2DebugPainter = new city.phys.P2DebugPainter(this._pw, spDebug);
                }
                /// 玩家
                this._pbPlayer
                    = this.createPlayer(this._pw, this, 0, "kuchipatchi1.png", 200, 700);
                //鼠标点击跳跃
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchProcess, this, false);
            };
            /**
             * 创建玩家
             * @param world
             * @param container
             * @param id
             * @param resid
             * @param xLanding          显示像素坐标系
             * @param yLanding          显示像素坐标系，以玩家底部为准，函数将根据宽度自动调整
             * @returns {p2.Body}
             */
            p.createPlayer = function (world, container, id, resid, xLanding, yLanding) {
                var p2body = new p2.Body({ mass: 1,
                    fixedRotation: true,
                    type: p2.Body.DYNAMIC
                });
                p2body.id = id;
                world.addBody(p2body);
                /// 依照图元尺寸
                var display = city.utils.DispUtil.createBitmapByName(resid);
                //egret.log( "createPlayer display.width:", display.width );
                display.anchorOffsetX = .5 * display.width;
                display.anchorOffsetY = .5 * display.height;
                /// 对应p2形状的宽高要根据玩家计算
                var p2rect = new p2.Box({
                    width: city.phys.P2Space.extentP2(display.texture.textureWidth),
                    height: city.phys.P2Space.extentP2(display.texture.textureHeight)
                });
                p2body.addShape(p2rect);
                p2body.position = city.phys.P2Space.getP2Pos(xLanding, yLanding - display.texture.textureHeight / 2);
                this._p2posYPlayerLanding = p2body.position[1];
                if (this._bDispReal) {
                    p2body.displays = [display];
                    container.addChild(display);
                }
                return p2body;
            };
            /**
             * 地面，泛义，也包含了墙面
             * @param world
             * @param container
             * @param id
             * @param vx                不论固定地面、移动地面、还是墙面，均不需要设置y方向的速度。
             *                                     且本游戏中，地面的速度没有变化的，只有固定的
             *                                     函数将根据此值是否为零自动设置Body类型
             * @param w
             * @param h
             * @param resid
             * @param x0                    只需给出左上角坐标，函数会自动根据宽度调整
             * @param y0
             * @returns {p2.Body}
             */
            p.createGround = function (world, container, id, vx, w, h, resid, x0, y0, comment) {
                if (comment === void 0) { comment = ""; }
                var p2body = new p2.Body({ mass: 1,
                    fixedRotation: true,
                    position: city.phys.P2Space.getP2Pos(x0 + w / 2, y0 + h / 2),
                    type: vx == 0 ? p2.Body.STATIC : p2.Body.KINEMATIC,
                    velocity: [vx, 0]
                });
                p2body.id = id;
                world.addBody(p2body);
                var box = new p2.Box({
                    width: city.phys.P2Space.extentP2(w),
                    height: city.phys.P2Space.extentP2(h)
                });
                //box.width = city.phys.P2Space.extentP2( w );
                //box.height = city.phys.P2Space.extentP2( h );
                p2body.addShape(box);
                if (comment.length) {
                    console.log("[createGround] - " + comment + " 位置：", p2body.position[0], p2body.position[1], "大小:", box.width, box.height);
                }
                if (this._bDispReal) {
                    var bitmap = city.utils.DispUtil.createBitmapByName(resid);
                    bitmap.width = w;
                    bitmap.height = h;
                    //egret.log( "createGround bitmap.width:", bitmap.width );
                    bitmap.anchorOffsetX = bitmap.width * .5;
                    bitmap.anchorOffsetY = bitmap.height * .5;
                    p2body.displays = [bitmap];
                    container.addChild(bitmap);
                }
                return p2body;
            };
            p.launch = function (container) {
                container.addChild(this);
                city.key.KeyManager.init();
                this.initDebug();
                this.createWorldSystem();
                /// run the world
                this.stage.frameRate = 20;
                this.addEventListener(egret.Event.ENTER_FRAME, this.run, this);
            };
            p.debugLogLoc = function (x, y) {
                this._txTouchStatus.text = "[" + x + "," + y + "]";
            };
            d(GameCore, "$i"
                ,function () {
                    if (this._i == null) {
                        this._i = new GameCore;
                    }
                    return this._i;
                }
            );
            return GameCore;
        })(egret.Sprite);
        jumper.GameCore = GameCore;
        egret.registerClass(GameCore,'game.jumper.GameCore');
    })(jumper = game.jumper || (game.jumper = {}));
})(game || (game = {}));
