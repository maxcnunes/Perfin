define(['durandal/system'],
    function (system) {
        var logger = {
            info: info,
            error: error,
            warning: warning,
            success: success
        };

        return logger;

        function info(message, showToast, data, source) {
            logIt(message, data, source, showToast, toastr.info);
        }

        function error(message, showToast, data, source) {
            logIt(message, data, source, showToast, toastr.error);
        }

        function warning(message, showToast, data, source) {
            logIt(message, data, source, showToast, toastr.warning);
        }

        function success(message, showToast, data, source) {
            logIt(message, data, source, showToast, toastr.success);
        }

        function logIt(message, data, source, showToast, toastSender) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                system.log(source, message, data);
            } else {
                system.log(source, message);
            }

            if (showToast && toastSender) {
                toastSender(message);
            }
        }

        function cleanLogs(message, data, source, showToast) {
            toastr.clear();
        }
    });