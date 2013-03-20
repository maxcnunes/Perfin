define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router'],
    function (app, datacontext, router) {
        var isSaving = ko.observable(false),
            //rooms = ko.observableArray(),
            //session = ko.observable(),
            //speakers = ko.observableArray(),
            //timeSlots = ko.observableArray(),
            //tracks = ko.observableArray(),
            category = ko.observable(),

            activate = function () {
                initLookups();
                //session(datacontext.createSession());
            },
            initLookups = function () {
                //rooms(datacontext.lookups.rooms);
                //timeSlots(datacontext.lookups.timeslots);
                //tracks(datacontext.lookups.tracks);
                //speakers(datacontext.lookups.speakers);
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            hasChanges = ko.computed(function () {
                return false;//return datacontext.hasChanges();
            }),
            canSave = ko.computed(function () {
                return !isSaving() && isDirty() && isValid();
                //return hasChanges() && !isSaving();
            }),

            isDirty = ko.computed(function () {
                return canEdit() ? category().dirtyFlag().isDirty() : false;
            }),

			isValid = ko.computed(function () {
			    return canEdit() ? validationErrors().length === 0 : true;
			}),

            save = function () {
                isSaving(true);
                //datacontext.saveChanges()
                //    .then(goToEditView).fin(complete);

                function goToEditView(result) {
                    router.replaceLocation('#/categorydetail/' + category().id());
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                if (hasChanges()) {
                    var msg = 'Do you want to leave and cancel?';
                    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                        .then(function (selectedOption) {
                            if (selectedOption === 'Yes') {
                                datacontext.cancelChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            //rooms: rooms,
            //save: save,
            //session: session,
            //speakers: speakers,
            //timeSlots: timeSlots,
            title: 'Add a New Category',
            //tracks: tracks
            category: category
        };

        return vm;
    });