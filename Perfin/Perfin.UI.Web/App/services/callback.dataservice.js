define(['security/authentication'],
    function (authentication) {
    	var
			beforeExecCallback = function (data, status, xhr, success, error) {
				if (status === "success") {
					success(data);
				} else {
					if (!authentication.onAuthFail(xhr))
						error(xhr);
				}
			};

    	return {
    		beforeExecCallback: beforeExecCallback
    	};
    }
);

