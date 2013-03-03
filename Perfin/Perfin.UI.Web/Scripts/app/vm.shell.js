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
			},

            tmplName = function () {
                return 'shell';
            };

		init();

		// Public Members
		return {
			activate: activate,
			currentUser: currentUser,
			menuHashes: menuHashes,
			tmplName: tmplName,
			name: 'MAIN'// JUST TEST, REMOVE LATER
		};
	}
);
