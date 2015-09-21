var extend = function (src, dest) {
	for (var key in dest) {
		if (src.hasOwnProperty(key)) {
			src[key] = dest[key];
		}
	}
}

var consoleLine = function () {
    var trace = console.trace();
}

module.exports = {
	extend: extend,
    consoleLine: consoleLine,
}

var tmpConolseLog = console.log;
console.Tlog = function log (...args) {
    var err = new Error();
    if (!err.stack) {
        try {
            throw err;
        } catch (e) {
            if (!e.stack) {
                return 0; // IE < 10, likely
            }
        }
    }
    var stacks  = err.stack.toString().split(/\r\n|\n/);
    var frameRE = /\/(\w+)\.js:(\d+):(?:\d+)([^\d])*$/;

    stacks      = stacks.map(function (stack) {
        return stack.match(frameRE);
    }).filter(item => !!item)

    console.log(stacks);
    console.log.apply(console, args);
}
