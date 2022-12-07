function systemPromise() {
    let promist = new Promise(function (resolve, reject) {
        swan.getSystemInfo({
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        })
    }).catch((e) => {

    })
    return promist
}

export {
    systemPromise
}