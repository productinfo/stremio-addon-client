module.exports = function promisify(fn) 
{
	return function()
	{
		var args = Array.prototype.slice.call(arguments)
		var lastArg = args[args.length-1]

		// If a callback is passed, just call the original function
		// Else, construct a promise and return that
		
		if (typeof(lastArg) === 'function')
			return fn.apply(null, args)
		else
			return new Promise(function(resolve, reject) {
				args.push(function(err, res) {
					if (err) reject(err)
					else resolve(res)
				})
				// @TODO: NOTE: should we try-catch and reject here? or will new Promise() handle this for us?
				fn.apply(null, args)
			})
	}
}