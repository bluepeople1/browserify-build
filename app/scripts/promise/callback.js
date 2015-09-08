// ;(function ($) {
    // Create a collection of callbacks to be fired in a sequence, with a
    // configurable
    // Options flags:
    //  - once: Callbacks fired at most one time
    //  - memory: Remember the most recent context and arguments
    //  - stopOnFalse: Cease interation over callback list
    //  - unique: Permit adding at most one instance of the same callback
    var $ = require('jquery');
    var Callbacks = function (options) {
        options = $.extend({}, options);

        var memory,     // Last fire value (for non-forgettable lists)
            fired,      // Flag to know if list was already fired
            firing,     // Flag to know if list is current firing
            firingStart, // First callback to fire (used internall by add an fireWith)
            firingLength, // Eno of the loop when firing
            firingIndex,  // Index of currently firing callback (modified by remove if need);
            list = [],  // Actual callback lists
            stack = !options.once && []; // Stack of fire calls for  repeatable lists
            
        var fire = function (data) {
                memory = options.memory && data;
                fired  = true;
                firingIndex = firingStart || 0;

                firingStart = 0;
                firingLength = list.length;
                firing = true;

                for (;list && firingIndex < firingLength; ++firingIndex) {
                    if (list[firingIndex].apply(data[0], data[1]) === false &&
                        options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        stack.length && fire(stack.shift());
                    } else if (memory) {
                        list.length = 0;
                    } else {
                        Callbacks.disable()
                    }
                }
            }

        var Callbacks = {
            add: function () {
                if (list) {
                    var start = list.length;
                    var add = function (args) {
                        $.each(args, function(_, arg) {
                            if (typeof arg === 'function') {
                                if (!options.unique || !Callbacks.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && typeof arg !== 'string') {
                                add(arg);
                            }
                        })
                    }

                    add(arguments);
                    if (firing) {
                        firingLength = list.length;
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }

                return this;
            },
            remove: function () {
                if (list) {
                    $.each(arguments, function(_, arg) {
                        var index;
                        while((index = $.inAarray(arg, list, index)) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexs
                            if (firing) {
                                if (index <= firingLength) {
                                    --firingLength
                                }
                                if (index <= firingIndex) {
                                    --firingIndex
                                }
                            }
                        }
                    })
                }
                return this;
            },

            has: function (fn) {
                return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
            },
            empty: function () {
                firingLength = list.length = 0;
                return this;
            },
            disable: function () {
                list = stack = memory = undefined;
                return this;
            },
            disabled: function () {
                return !list;
            },
            lock: function () {
                stack = undefined;
                if (!memory) {
                    Callbacks.disable();
                }
                return this;
            },
            fireWith: function (context, args) {
                if (list && (!fired || stack)) {
                    args = args || []
                    args = [context, args.slice ? args.slice() : args];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            fire: function () {
                Callbacks.fireWith(this, arguments);
            },
            fired: function () {
                return !!fired
            }
        }
        return Callbacks;
    }
    module.exports = Callbacks;
// })