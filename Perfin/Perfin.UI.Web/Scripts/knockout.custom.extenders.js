// ########################
// # Custom Extenders #
// ########################


(function () {
    // Backup
    //-------------------------
    ko.extenders.backupEnabled = function (target) {
        target.backupEnabled = function () {
            return true;
        }
        return target;
    };
})();
