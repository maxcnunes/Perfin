define(function() {
    var welcome = function () {
        this.pageDisplayName = 'Dashboard';
        this.pageDescription = 'All informations about your personal finance on the same place';
    };

    welcome.prototype.viewAttached = function (view) {
        //you can get the view after it's bound and connected to it's parent dom node if you want
    };

    return welcome;
});