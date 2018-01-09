/**
 * Created by egret on 2015/1/29.
 */
var city;
(function (city) {
    var touch;
    (function (touch) {
        var TouchTriggerCenter = (function () {
            function TouchTriggerCenter() {
            }
            var d = __define,c=TouchTriggerCenter,p=c.prototype;
            /**
             * 增加显示对象用于触控触发
             * @param dispatcher    显示对象引用
             * @param id                    id
             * @param handler         触发处理函数，会传出id
             */
            TouchTriggerCenter.addTarget = function (dispatcher, id, handler, hostHandler) {
                /// record
                if (this._dictName2TriggerUnit == null) {
                    this._dictName2TriggerUnit = new Object;
                    egret.Ticker.getInstance().register(this.advance, this);
                }
                if (this._vcActiveName == null) {
                    this._vcActiveName = new Array();
                }
                this.register(handler, hostHandler);
                dispatcher.name = city.utils.Namer.getOne;
                dispatcher.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                dispatcher.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                this._dictName2TriggerUnit[dispatcher.name] = new touch.TouchTriggerUnit(id);
                console.log("addTarget:", this._dictName2TriggerUnit[dispatcher.name]);
            };
            TouchTriggerCenter.touchHandler = function (evt) {
                var name = evt.currentTarget.name;
                var unit = this._dictName2TriggerUnit[name];
                switch (evt.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        /// 启动计时
                        unit.startTime(egret.getTimer());
                        this._vcActiveName.push(name);
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        /// 终止计时
                        this._vcActiveName.splice(this._vcActiveName.indexOf(name));
                        break;
                }
            };
            TouchTriggerCenter.advance = function (advancedTime) {
                //console.log( "advance:", advancedTime );
                if (this._vcActiveName.length) {
                    var tm = egret.getTimer();
                    for (var i in this._vcActiveName) {
                        var unit = this._dictName2TriggerUnit[this._vcActiveName[i]];
                        if (unit.checkAndUpdateTrigger(tm)) {
                            for (var j = this._vcHandler.length - 1; j > -1; --j) {
                                this._vcHandler[j].apply(this._vcHostHandler[j], [unit.id]);
                            }
                        }
                    }
                }
            };
            TouchTriggerCenter.register = function (handler, hostHandler) {
                if (this._vcHandler == null) {
                    this._vcHandler = new Array();
                    this._vcHostHandler = new Array();
                }
                if (this._vcHandler.indexOf(handler) == -1 ||
                    this._vcHandler.indexOf(handler) != this._vcHostHandler.indexOf(hostHandler)) {
                    this._vcHandler.push(handler);
                    this._vcHostHandler.push(hostHandler);
                }
            };
            return TouchTriggerCenter;
        })();
        touch.TouchTriggerCenter = TouchTriggerCenter;
        egret.registerClass(TouchTriggerCenter,'city.touch.TouchTriggerCenter');
    })(touch = city.touch || (city.touch = {}));
})(city || (city = {}));
