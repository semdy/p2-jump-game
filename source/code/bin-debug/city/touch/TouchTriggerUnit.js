/**
 * Created by egret on 2015/1/29.
 */
var city;
(function (city) {
    var touch;
    (function (touch) {
        var TouchTriggerUnit = (function () {
            function TouchTriggerUnit(id) {
                //this.tmBegin = tmBegin;
                this.id = id;
            }
            var d = __define,c=TouchTriggerUnit,p=c.prototype;
            p.startTime = function (tm) {
                //this.tmBegin = tm;
                this.tmNextTrigger = tm + TouchTriggerUnit.tmDelayFirstTrigger;
            };
            p.checkAndUpdateTrigger = function (tm) {
                console.log("checkAndUpdateTrigger:", tm, this.tmNextTrigger);
                if (tm > this.tmNextTrigger) {
                    this.tmNextTrigger = this.tmNextTrigger + TouchTriggerUnit.tmIntervalTrigger;
                    return true;
                }
                else {
                    return false;
                }
            };
            TouchTriggerUnit.tmDelayFirstTrigger = 400;
            TouchTriggerUnit.tmIntervalTrigger = 80;
            return TouchTriggerUnit;
        })();
        touch.TouchTriggerUnit = TouchTriggerUnit;
        egret.registerClass(TouchTriggerUnit,'city.touch.TouchTriggerUnit');
    })(touch = city.touch || (city.touch = {}));
})(city || (city = {}));
