import AnalysysAgent from './util/sdk/AnalysysAgent_Baidu_SDK.es6.min.js'
import AnalysysEncryption from './util/sdk/AnalysysAgent_encryption.es6.min.js'
AnalysysAgent.encrypt = AnalysysEncryption
AnalysysAgent.debugMode = 1
AnalysysAgent.appkey = 'sdktest201907'
// AnalysysAgent.uploadURL = 'https://arksdk.analysys.cn'
AnalysysAgent.uploadURL = 'https://arkpaastest.analysys.cn:4089'   // 明文
// AnalysysAgent.uploadURL = 'https://arksdk.analysys.cn:4089'    //密文
// AnalysysAgent.uploadURL = 'http://192.168.220.132:8089'    //密文


// AnalysysAgent.uploadURL = 'https://arksdktest.analysys.cn:4069'    //密文
// AnalysysAgent.uploadURL = 'http://192.168.8.103:8089'    //密文
AnalysysAgent.autoShare = false
// AnalysysAgent.encryptType = 0
AnalysysAgent.auto = false
AnalysysAgent.autoProfile = true

AnalysysAgent.autoTrack = true
AnalysysAgent.allowTimeCheck = false
AnalysysAgent.maxDiffTimeInterval = 1

AnalysysAgent.identify("AAAAxxxx")

// AnalysysAgent.autoProfile = false
// AnalysysAgent.auto = true
/**
 * @file app.js
 * @author swan
 */
/* globals swan */

App({
    onLaunch (options) {
        // do something when launch
        // 引导添加，参见文档： http://smartprogram.baidu.com/docs/design/component/guide_add/
    },
    onShow (options) {
        // AnalysysAgent.appStart(options)
        // do something when show
    },
    onHide () {
        // do something when hide
    }
})
