﻿define(
    ['ko'],
    function (ko) {
        var User = function () {

            var self = this;
            self.id = ko.observable();
            self.login = ko.observable().extend({ required: true });
            self.password = ko.observable().extend({ required: true });
            self.email = ko.observable();
            self.name = ko.observable();
            self.salt = ko.observable();
            self.oAuthId = ko.observable();
            
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.login, self.password, self.email, self.name, self.salt, self.oAuthId]);

            return self;
        };

        User.Nullo = new User().id(0).login('Not a User').password('12');//TODo add all parameters
        User.Nullo.isNullo = true;
        User.Nullo.dirtyFlag().reset();

        User.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        User.prototype.picture =  ko.observable();

        return User;
    });