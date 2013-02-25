// View Model Category
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
			validationErrors = ko.observableArray(), // Override this after we get a session


			// Knockout Computeds
			//----------------------------------
			canEdit = ko.computed(function () {
				return category() && config.currentUser() && config.currentUser().id() == speader.id();
			}),

			isDirty = ko.computed(function () {
				return canEdit() ? category().dirtyFlag().isDirty() : false;
			}),

			isValid = ko.computed(function () {
				return canEdit() ? validationErrors().length === 0 : true;
			}),

			// Methods
			//----------------------------------
			activate = function (routeData, callback) {
				messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
				currentCategoryId(routeData.id);
				getCategory(callback);
			},

			cancelCmd = ko.asyncCommand({
				execute: function (complete) {
					var callback = function () {
						complete();
						logger.success(config.toasts.retreivedData);
					};
					getCategory(callback, true);
				},
				canExecute: function (isExecuting) {
					return !isExecuting && isDirty();
				}
			}),

			canLeave = function () {
				return canEdit() ? !isDirty() && isValid() : true;
			},

			getCategory = function (completeCallback, forceRefresh) {
				var callback = function () {
					if (completeCallback) {
						completeCallback();
					}

					validationErrors = ko.validation.group(category());
				};

				datacontext.categories.getCategoryById(
					currentCategoryId(), {
						success: function (s) {
							category(s);
							callback();
						},
						error: callback
					},
					forceRefresh
				);
			},

			goBackCmd = ko.asyncCommand({
				execute: function (complete) {
					router.navigateBack();
					complete();
				},
				canExecute: function (isExecuting) {
					return !isExecuting && !isDirty();
				}
			}),

			saveCmd = ko.asyncCommand({
				execute: function (complete) {
					if (canEdit()) {
						$.when(datacontext.categories.updateData(category()))
							.always(complete);
					} else {
						complete();
					}
				},
				canExecute: function (isExecuting) {
					return !isExecuting && isDirty() && isValid();
				}
			}),

			tmplName = function () {
				return canEdit() ? 'category.edit' : 'category.view';
			};


		// Public Members
		return {
			activate: activate,
			cancelCmd: cancelCmd,
			canEdit: canEdit,
			canLeave: canLeave,
			goBackCmd: goBackCmd,
			isDirty: isDirty,
			isValid: isValid,
			saveCmd: saveCmd,
			category: category,
			tmplName: tmplName,
			name: 'CATEGORY'// JUST TEST, REMOVE LATER
		};
	}
);