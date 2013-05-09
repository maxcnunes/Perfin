define([
    'repositories/datacontext',
    'common/logger',
    'durandal/system',
    'durandal/plugins/router',
    'jquery',
    'durandal/app',
    'common/breadcrumb',
    'common/config',
    'underscore', 
    'moment'],
    function (datacontext, logger, system, router, $, app, breadcrumb, config, _, moment) {
        var
            show = this,
            entries = ko.observableArray(),
            isDeleting = ko.observable(false),
            groupentries = ko.observableArray(),
            //totals = ko.computed()

            activate = function () {
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getData({ results: entries }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + entries().length + ' entries ',
                                true, null, system.getModuleId(show));

                            groupbydays();
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            },

            groupbydays = function () {
                debugger;
                var groups = _.groupBy(entries(), function (entry) { return moment(entry.entryDate()).format("DD"); });

                var gentries = _.map(groups, function (group, key, list) {

                    //get the total per day
                    var _total = _.reduce(group, function (memo, entry) { return memo + entry["amount"](); }, 0);
                    //var total = 0;
                    //for (var i = 0; i < group.length; i++) {
                    //    total = total + group[i]["amount"]();
                    //}

                    return {
                        day: key,
                        entries: group,
                        totalday: _total
                    };
                });

                groupentries(gentries);
            },

            visibleDay = function () {
                //var _array = _.groupBy([1.3, 2.1, 2.4], function (num) { return Math.floor(num); });
                //var _arrayAllDays = [];
                //var _daysInMonth = moment(moment(entries()[0].entryDate())).daysInMonth();
                //var _dayToCompare = 0;
             
                var testGroup = _.groupBy(entries(), function (entry) { return moment(entry.entryDate()).format("DD"); });

                return _arrayAllDays;
            },

            gotoDetails = function (selectedItem) {
                if (selectedItem && selectedItem.id()) {
                    var url = '#/entry/details/' + selectedItem.id();
                    router.navigateTo(url);
                }
            },

            viewAttached = function (view) {
                bindEventToList(view, '.btnEdit', gotoDetails);
                bindEventToList(view, '.btnDelete', deleteEntryType);
            },

            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    var entry = ko.dataFor(this);
                    callback(entry);
                    return false;
                });
            },

            deleteEntryType = function (selectedItem) {
                if (!selectedItem || !selectedItem.id()) {
                    return;
                }

                var msg = 'Delete entry "' + selectedItem.account.name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.entry.deleteData(selectedItem))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            entries.remove(selectedItem);
                        }

                        function failed(error) {
                            cancel();
                            var errorMsg = 'Error: ' + error.message;
                            logger.logError(
                                errorMsg, true, error, system.getModuleId(vm));
                        }

                        function finish() {
                            return selectedOption;
                        }
                    }
                    isDeleting(false);
                }
            };


        return {
            entries: entries,
            activate: activate,
            viewAttached: viewAttached,
            groupentries: groupentries,
            

            // module page info
            pageDisplayName: 'List Entry',
            pageDescription: 'All your entries',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.show)
        };
    });