define('route-mediator',
    ['mediator', 'config'],
    function (messenger, config) {

        // Private Members
        var
            canleaveCallback,
            self = this,

            viewModelActivated = function (options) {
                canleaveCallback = options && options.canleaveCallback;
            },

            canLeave = function () {
                // Check the active view model to see if we can leave it
                var
                    val = canleaveCallback ? canleaveCallback() : true,
                    response = {
                        val: val,
                        message: config.toasts.changesPending
                    };

                return response;
            },

            subscribeToViewModelActivations = function () {
                var context = self;

                messenger.subscribe({
                    topic: config.messages.viewModelActivated,
                    context: context,
                    callback: viewModelActivated
                });
            },

            init = function () {
                subscribeToViewModelActivations();
            };

        init();


        // Public Members
        return {
            canLeave: canLeave
        };
    }
);