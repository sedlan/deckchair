/**
 * deckchair
 * ---
 * clientside json store
 *
 */
var deckchair = function (options, callback) {
	// ensure deckchair was called as a constructor
	if (!(this instanceof deckchair)) {
		return new deckchair(options, callback);
	}

	// deckchair requires json
	if (!JSON) {
		throw 'JSON unavailable! Include http://www.json.org/json2.js to fix.'
	}

	// options are optional; callback is not
	if (arguments.length <= 2 && arguments.length > 0) {
		callback = (typeof arguments[0] === 'function') ? arguments[0] : arguments[1];
		options = (typeof arguments[0] === 'function') ? {} : arguments[0];
	} else {
		throw 'Incorrect # of ctor args!';
	}

	// TODO perhaps allow for pub/sub instead?
	if (typeof callback !== 'function') {
		throw 'No callback was provided';
	}

	// default configuration
	this.record = options.record || 'record';  // default for records
	this.name   = options.name   || 'records'; // default name for underlying store

	// mixin first valid  adapter
	var adapter;
	// if the adapter is passed in we try to load that only
	if (options.adapter) {
		for (var i = 0, l = deckchair.adapters.length; i < l; i++) {
			if (deckchair.adapters[i].adapter === options.adapter) {
				adapter = deckchair.adapters[i].valid() ? deckchair.adapters[i] : undefined;
				break;
			}
		}
	// otherwise find the first valid adapter for this env
	} else {
		for (i = 0, l = deckchair.adapters.length; i < l; i++) {
			adapter = deckchair.adapters[i].valid() ? deckchair.adapters[i] : undefined;
			if (adapter) {
				break;
			}
		}
	}

	// we have failed
	if (!adapter) {
		throw 'No valid adapter.';
	}

	// yay! mixin the adapter
	for (var j in adapter) {
		this[j] = adapter[j];
	}

	// call init for each mixed in plugin
	for (var i = 0, l = deckchair.plugins.length; i < l; i++) {
		deckchair.plugins[i].call(this);
	}

	// init the adapter
	this.init(options, callback);
}

deckchair.adapters = [];

/**
 * queues an adapter for mixin
 * ===
 * - ensures an adapter conforms to a specific interface
 *
 */
deckchair.adapter = function (id, obj) {
	// add the adapter id to the adapter obj
	// ugly here for a  cleaner dsl for implementing adapters
	obj['adapter'] = id;
	// methods required to implement a deckchair adapter
	var implementing = 'adapter valid init keys save batch get exists all remove nuke'.split(' ');
	var indexOf = this.prototype.indexOf;
	// mix in the adapter
	for (var i in obj) {
		if (indexOf(implementing, i) === -1) {
			throw 'Invalid adapter! Nonstandard method: ' + i;
		}
	}
	// if we made it this far the adapter interface is valid
	deckchair.adapters.push(obj);
}

deckchair.plugins = [];

/**
 * generic shallow extension for plugins
 * ===
 * - if an init method is found it registers it to be called when the deckchair is inited
 * - yes we could use hasOwnProp but nobody here is an asshole
 */
deckchair.plugin = function (obj) {
	for (var i in obj)
		i === 'init' ? deckchair.plugins.push(obj[i]) : this.prototype[i] = obj[i];
}

/**
 * helpers
 *
 */
deckchair.prototype = {

	isArray: Array.isArray || function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	},

	/**
     * this code exists for ie8... for more background see:
     * http://www.flickr.com/photos/westcoastlogic/5955365742/in/photostream
     */
	indexOf: function(ary, item, i, l) {
		if (ary.indexOf) return ary.indexOf(item)
		for (i = 0, l = ary.length; i < l; i++) {
			if (ary[i] === item) {
				return i;
			}
		}
		return -1;
	},

	// awesome shorthand callbacks as strings. this is shameless theft from dojo.
	lambda: function (callback) {
		return this.fn(this.record, callback);
	},

	// first stab at named parameters for terse callbacks; dojo: first != best // ;D
	fn: function (name, callback) {
		return typeof callback == 'string' ? new Function(name, callback) : callback;
	},

	// returns a unique identifier (by way of Backbone.localStorage.js)
	uuid: function () {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},

	// a classic iterator
	each: function (callback) {
		var cb = this.lambda(callback)
		// iterate from chain
		if (this.__results) {
			for (var i = 0, l = this.__results.length; i < l; i++) {
				cb.call(this, this.__results[i], i);
			}
		} else {
			// otherwise iterate the entire collection
			this.all(function(r) {
				for (var i = 0, l = r.length; i < l; i++) {
					cb.call(this, r[i], i);
				}
			})
		}
		return this;
	}
// --
};
