// 第二步：components/movie/index.js
let AnalysysAgent = swan.AnalysysAgent;
import { SmallFourBeh } from '../behavior.js' // 导入behavior.js
Component({
    properties: {
        propName: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'val', // 属性初始值（必填）
            observer: function (newVal, oldVal) {
                // 属性被改变时执行的函数（可选）
            }
        }
    },
    behaviors: [SmallFourBeh], //  继承behavior.js里面的properties，data，methods

    data: {}, // 私有数据，可用于模版渲染

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },

    detached: function () { },

    methods: {
        onTap (ev) {
            AnalysysAgent.registerSuperProperty("wewe", "dedede1111")
        },
        onPageView () {
            AnalysysAgent.pageView("wewe", "dedede1111")
        },
        onTapBeh () {
            this.behaviorTap() // 通过this可以访问behavior.js里面的内容
        }
    }
});