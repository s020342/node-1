define([

], function() {
    return {
        obj: {},
        on(event, cb) {
            if (this.obj[event]) {
                this.obj[event].push(cb)
            } else {
                this.obj[event] = [cb]
            }
        },
        emit(event, ...rest) {
            for (const key in this.obj) {
                if (this.obj.hasOwnProperty(key) && key == event) {
                    const arr = this.obj[key];
                    arr.forEach((cb) => {

                        cb(...rest)
                    });
                }
            }
        },
        destroyed(event) {
            delete this.obj[event]
        }
    }
});


// event.on("up", (a, b, c) => {
//     console.log()
// })
// event.on("dwon", (a, b, c) => {
//     console.log()
// })

// event.emit("up", 1, 3, 3, 4, 5)