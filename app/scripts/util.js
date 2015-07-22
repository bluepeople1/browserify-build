var extend = function (src, dest) {
	for (var key in dest) {
		if (src.hasOwnProperty(key)) {
			src[key] = dest[key];
		}
	}
} 

module.exports = {
	extend: extend
}