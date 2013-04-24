//// Bind Handler for Chosen Jquery
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