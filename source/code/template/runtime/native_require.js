
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/physics/physics.js",
	"bin-debug/city/assets/StrongAssets.js",
	"bin-debug/city/disp/ButtonHasId.js",
	"bin-debug/city/disp/ComplexTextLine.js",
	"bin-debug/city/disp/ComplexTextPara.js",
	"bin-debug/city/disp/ComplexTextUnit.js",
	"bin-debug/city/disp/LoadingUI.js",
	"bin-debug/city/disp/Mark.js",
	"bin-debug/city/disp/TxButtonHasId.js",
	"bin-debug/city/key/KeyManager.js",
	"bin-debug/city/phys/P2DebugPainter.js",
	"bin-debug/city/phys/P2Space.js",
	"bin-debug/city/touch/TouchTriggerCenter.js",
	"bin-debug/city/touch/TouchTriggerUnit.js",
	"bin-debug/city/utils/ArrayUtil.js",
	"bin-debug/city/utils/BrowserUtil.js",
	"bin-debug/city/utils/DevUtil.js",
	"bin-debug/city/utils/DispUtil.js",
	"bin-debug/city/utils/GeomUtil.js",
	"bin-debug/city/utils/Namer.js",
	"bin-debug/city/utils/StringUtil.js",
	"bin-debug/game/jumper/Bootstrap.js",
	"bin-debug/game/jumper/GameCore.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "game.jumper.Bootstrap",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};