// Shell View Model
define('vm.shell',
	['ko', 'config'],
	function (ko, config) {

		// Private Members
		var
			currentUser = config.currentUser,

			menuHashes = config.hashes,

			activate = function (routeData) {
				// Not implementd yet
			},

			init = function () {
				activate();
			};

		init();

		// Public Members
		return {
			activate: activate,
			currentUser: currentUser,
			menuHashes: menuHashes,
			name: 'MAIN'// JUST TEST, REMOVE LATER
		};
	}
);
