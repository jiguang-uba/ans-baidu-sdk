// 第一步：创建behavior.js，里面的properties，data，methods里面的方法，可以共享给movie、music等等组件使用
let SmallFourBeh = Behavior({
    // 共享属性
    properties: {
        name: String,
        type: String
    },
    // 共享数据
    data: {
        selectedName: '',
        selectedType: ''
    },
    // 共享方法
    methods: {
        behaviorTap (name, type) {
            console.log("这个是组件的公共方法，直接绑定公共方法是hook不到，不能发送$user_click")
            console.log("调用了公用方法，可以绑定调用也可以 在组件内通过 this 调用")
        }
    }
})
export { SmallFourBeh } // 导出