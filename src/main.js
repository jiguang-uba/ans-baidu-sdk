import baseConfig from './lib/baseConfig/index';
import Util from './lib/common/index';
import { errorLog, successLog } from './lib/printLog/index';
import { resetCode } from './lib/fillFiled/index';
import { API } from './API/index';
import { userClick } from './API/template/userClick'
import { userClickPage } from './API/template/userClickPage'
import { UTM } from './lib/fillFiled/UTM'

import PublicApp from './lib/common/publicApp.js'
let setPublicApp = PublicApp.setPublicApp
let getPublicApp = PublicApp.getPublicApp


class Ark_PASS_SDK extends API {
    constructor() {
        super()
    }
    set appkey (key) {
        resetCode();
        if (Util.paramType(key) !== 'String') {
            baseConfig.status.FnName = "appkey";
            baseConfig.status.errorCode = "60001";
            baseConfig.status.key = key;
            errorLog();
            return;
        }
        if (key == "") {
            baseConfig.status.FnName = "appkey";
            baseConfig.status.errorCode = "60006";
            errorLog();
            return;
        }
        baseConfig.status.FnName = "appkey";
        baseConfig.status.successCode = "20002";
        baseConfig.status.value = key;
        successLog();
        baseConfig.status.successCode = "20007";
        baseConfig.status.value = baseConfig.base.$lib_version;
        successLog();
        baseConfig.base.appid = key;
    }
    get appkey () {
        return baseConfig.base.appid;
    }
    set debugMode (debug) {
        resetCode();
        baseConfig.base.$debug = debug;
    }
    get debugMode () {
        return baseConfig.base.$debug;
    }
    set auto (AUTO) {
        resetCode();
        if (Util.paramType(AUTO) !== 'Boolean') {
            baseConfig.status.key = "auto";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = AUTO;
            errorLog();
            return;
        }
        baseConfig.base.auto = AUTO;
    }
    get auto () {
        return baseConfig.base.auto;
    }
    set uploadURL (ServerUrl) {
        resetCode();
        if (!ServerUrl) {
            baseConfig.status.errorCode = "60007";
            errorLog();
            return;
        }
        if (!Util.checkURL(ServerUrl)) {
            baseConfig.status.errorCode = "600011";
            baseConfig.status.key = "uploadURL";
            baseConfig.status.value = ServerUrl;
            errorLog()
            return;
        };
        if (ServerUrl.charAt(ServerUrl.length - 1) !== '/') {
            ServerUrl += '/';
        };
        baseConfig.base.uploadURL = ServerUrl + 'up';
        baseConfig.status.successCode = "20008";
        baseConfig.status.value = ServerUrl;
        successLog();
    }
    get uploadURL () {
        return baseConfig.base.uploadURL;
    }
    set autoProfile (autoPro) {
        resetCode();
        if (Util.paramType(autoPro) !== 'Boolean') {
            baseConfig.status.key = "autoProfile";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = autoPro;
            errorLog();
            return;
        }
        baseConfig.base.autoProfile = autoPro;
    }
    get autoProfile () {
        return baseConfig.base.autoProfile;
    }
    set encryptType (encryptType) {
        resetCode();
        if (Util.paramType(encryptType) !== "Number") {
            baseConfig.status.key = "encryptType";
            baseConfig.status.errorCode = "60002";
            baseConfig.status.value = encryptType;
            errorLog();
            return;
        }
        baseConfig.base.encryptType = encryptType;
    }
    get encryptType () {
        return baseConfig.base.encryptType;
    }
    set autoShare (shareStatus) {
        resetCode();
        if (Util.paramType(shareStatus) !== "Boolean") {
            baseConfig.status.key = "autoShare";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = shareStatus;
            errorLog();
            return;
        }
        baseConfig.base.autoShare = shareStatus;
    }
    get autoShare () {
        return baseConfig.base.autoShare;
    }
    set allowTimeCheck (Flag) {
        resetCode();
        if (Util.paramType(Flag) !== "Boolean") {
            baseConfig.status.key = "allowTimeCheck";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = Flag;
            errorLog();
            return;
        }
        baseConfig.base.allowTimeCheck = Flag;
    }
    get allowTimeCheck () {
        return baseConfig.base.allowTimeCheck;
    }
    set maxDiffTimeInterval (time) {
        resetCode();
        if (Util.paramType(time) !== "Number") {
            baseConfig.status.key = "maxDiffTimeInterval";
            baseConfig.status.errorCode = "60002";
            baseConfig.status.value = time;
            errorLog();
            return;
        }
        baseConfig.base.maxDiffTimeInterval = time;
    }
    get maxDiffTimeInterval () {
        return baseConfig.base.maxDiffTimeInterval;
    }
    set autoTrack (autoTrackStatus) {
        resetCode();
        if (Util.paramType(autoTrackStatus) !== "Boolean") {
            baseConfig.status.key = "autoTrack";
            baseConfig.status.errorCode = "60003";
            baseConfig.status.value = autoTrackStatus;
            errorLog();
            return;
        }
        baseConfig.base.autoTrack = autoTrackStatus;
    }
    get autoTrack () {
        return baseConfig.base.autoTrack;
    }
}

// ?????????????????????????????? ??????????????????????????????????????????
function appFn (obj, Fn, toFn) {
    if (obj[Fn]) {
        let oldFn = obj[Fn];
        if (Fn === "onShareAppMessage") {
            obj[Fn] = function (t) {
                // return toFn(oldFn());
                return toFn(oldFn.call(this, t));
            }
        } else {
            obj[Fn] = function (t) {
                // toFn(t);
                // oldFn(t)
                var b = oldFn.apply(this, arguments);
                toFn(t);
                return b;
            }
        }
    } else {
        if (Fn !== "onShareAppMessage") {
            obj[Fn] = function (t) {
                toFn(t);
            }
        }
    }
}

let ark_sdk = new Ark_PASS_SDK();
let publicApp = getPublicApp()
if (publicApp) {
    publicApp.AnalysysAgent = ark_sdk;
}
// wx.AnalysysAgent = ark_sdk;

// AnalysysAgent ??????????????????  App ??????????????????????????? ????????????????????? ??????????????????; 
// App ????????? APP ??? ??????????????????app.js ????????? App????????????????????????????????????????????????App????????????APP??????????????????
let APP = App;
App = function (app) {
    // UTM ??????onshow ,??????????????????????????????????????????????????????????????????
    appFn(app, 'onShow', function setOptions (options) {
        let option = options
        if (options && options._status == "create") {
            setPublicApp(options)
            option = options.options
        }
        // ??????????????? utm ??????
        if (option.query && Object.keys(option.query).length > 0) {
            if (option.query.utm_campaign && option.query.utm_medium && option.query.utm_source) {
                UTM.utm_campaign_id = option.query.campaign_id;
                UTM.utm_campaign = option.query.utm_campaign;
                UTM.utm_content = option.query.utm_content;
                UTM.utm_medium = option.query.utm_medium;
                UTM.utm_source = option.query.utm_source;
                UTM.utm_term = option.query.utm_term;
            }
            // ???????????????????????????
            if (option.query.share_id && option.query.share_level && option.query.share_path) {
                baseConfig.base.$share_id = option.query.share_id;
                baseConfig.base.$share_level = option.query.share_level;
                baseConfig.base.$share_path = decodeURIComponent(option.query.share_path);
            }
        }
        // ?????????????????????????????????????????????
        if (option.scene) {
            baseConfig.system.scene = options.scene;
        }
    })
    APP(app);
};
// 
let hookListNot = ["data", "onLoad", "onShow", "onReady", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onResize", "onTabItemTap", "onHide", "onUnload"]

function hookMethods (methods) {
    appFn(methods, 'onShow', ark_sdk.startUp)
    if (baseConfig.base.autoShare == true) {
        appFn(methods, 'onShareAppMessage', ark_sdk.share);
    }
    if (baseConfig.base.autoTrack == true) {
        for (var i in methods) {
            if (Util.paramType(methods[i]) == "Function" && hookListNot.indexOf(i) < 0) {
                appFn(methods, i, userClick);
            }
            if (Util.paramType(methods[i]) == "Function" && i == "onTabItemTap") {
                appFn(methods, i, userClickPage);
            }
        }
    }
}

let PAGE = Page;
Page = function (page) {
    hookMethods(page)
    PAGE(page);
};

// hook Component ?????????????????? methods????????????????????????????????????????????????????????????????????????component ????????????taro?????????????????????????????????hook????????????????????????
let COMPONENT = Component
let hookFlag = false;

Component = function (component) {
    for (var funName in component.methods) {
        if (Util.paramType(component.methods[funName]) == "Function" && hookListNot.indexOf(funName) < 0) {
            hookFlag = true;
        }
    }
    if (hookFlag) {
        hookMethods(component.methods)
    } else {
        hookMethods(component)
    }
    COMPONENT(component)
}


export default ark_sdk