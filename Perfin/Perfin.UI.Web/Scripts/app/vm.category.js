// View Model Category
// NOTE FINISHED YET
define('vm.category',
	['ko', 'datacontext', 'config', 'router', 'messenger', 'sort'],
	function (ko, datacontext, config, router, messenger, sort) {
		
		// Private Members
		var 
			// Properties
			//----------------------------------
			currentCategoryId = ko.observable(),
			category = ko.observable(),
			logger = config.logger,


			// Knockout Computeds
			//----------------------------------
			canEdit = ko.computed(function(){
				return category() && config.currentUser() && config.currentUser().id() == speader.id();
			}),

			isDirty = ko.computed(function(){
				return canEdit() ? category().dirtyFlag().isDirty() : false;
			});

	}
);