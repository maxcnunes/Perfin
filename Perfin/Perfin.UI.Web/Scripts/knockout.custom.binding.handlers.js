// ########################
// # Custom Bind Handlers #
// ########################


(function () {
    // Datepicker JQuery UI
    //-------------------------
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options.dateFormat = 'dd/mm/yy';

            $(element).datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($(element).datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datepicker("destroy");
            });

        },
        //update the control when the view model changes
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).datepicker("setDate", value);
        }
    };

    // Datepicker Meio Mask
    //-------------------------
    ko.bindingHandlers.meiomask = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            debugger;

            $(element)
                .attr('data-mask', valueAccessor())
                .css('padding-right', '20px')
                .setMask();

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                //var observable = valueAccessor();
                //observable($(element).datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                //$(element).datepicker("destroy");
            });

        },
        //update the control when the view model changes
        update: function (element, valueAccessor) {
            debugger;
            var value = ko.utils.unwrapObservable(valueAccessor());
            //$(element).datepicker("setDate", value);
        }
    };
})();
// Chosen Jquery
//-------------------------
//ko.bindingHandlers.singleChosen = {

//	init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
//		setTimeout(function () {
//			// This will be called when the binding is first applied to an element
//			// Set up any initial state, event handlers, etc. here
//			$(element).addClass('chzn-select');
//			$(element).chosen();
//		}, 200);

//		ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//			// Not implemented
//		});

//	},
//	update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
//		// This will be called once when the binding is first applied to an element,
//		// and again whenever the associated observable changes value.
//		// Update the DOM element based on the supplied values here.
//		var value = ko.utils.unwrapObservable(valueAccessor());

//		ko.bindingHandlers.options.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

//		setTimeout(function () {
//			$(element).trigger("liszt:updated");
//		}, 0);

//	}
//};