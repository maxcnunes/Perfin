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
            currentMonth = ko.observable(),
            currentYear = ko.observable(),
            totalMonth = ko.observable(),



            activate = function () {
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getData({ results: entries }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + entries().length + ' entries ',
                                true, null, system.getModuleId(show));

                            loadCurrentDate();
                            groupbydays();
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            },

            loadCurrentDate = function () {
                currentMonth(moment().month());
                currentYear(moment().year());
            },

            prevYear = function () {
                currentYear(currentYear() - 1);
                groupbydays();
            },
            nextYear = function () {
                currentYear(currentYear() + 1);
                groupbydays();
            },
            prevMonth = function () {
                currentMonth(currentMonth() - 1);
                groupbydays();
            },
            nextMonth = function () {
                currentMonth(currentMonth() + 1);
                groupbydays();
            },
            groupbydays = function () {
                totalMonth(0);

                //filter entries that are in current selected month
                var filteredByMonth = _.filter(entries(), function (entry) {
                    return moment(entry.entryDate()).format("MM") == (currentMonth() + 1)
                            && moment(entry.entryDate()).format("YYYY") == currentYear()
                })
                //group the entries that are the same day
                var groupsbyday = _.groupBy(filteredByMonth, function (entry) { return moment(entry.entryDate()).format("DD"); });

                //map groups to bind the view correctely
                var gentries = _.map(groupsbyday, function (group, key, list) {
                    debugger;
                    var _totalByDay = 0;
                    var _totalExpensesByDay = 0;
                    var _totalIncomesByDay = 0;

                    //get the total per day
                    _totalByDay = _.reduce(group, function (subtotal, entry) {
                        //if expense subtract total
                        if (entry["typeTransaction"]() == 0)
                            return subtotal - entry["amount"]();
                        else
                            return subtotal + entry["amount"]();
                    }, 0);
                    //get the total of Expenses per day
                    _totalExpensesByDay = _.reduce(group, function (subtotal, entry) {
                        //if expense sum
                        if (entry["typeTransaction"]() == 0)
                            return subtotal + entry["amount"]();
                        else return subtotal + 0;
                    }, 0);
                    //get the total of Incomes per day
                    _totalIncomesByDay = _.reduce(group, function (subtotal, entry) {
                        //if income sum 
                        if (entry["typeTransaction"]() == 1)
                            return subtotal + entry["amount"]();
                        else return subtotal + 0;
                    }, 0);

                    totalMonth(totalMonth() + _totalByDay);

                    return {
                        day: key,
                        entries: group,
                        totalday: _totalByDay,
                        totalExpensesDay: _totalExpensesByDay,
                        totalIncomesDay: _totalIncomesByDay
                    };
                });

                groupentries(gentries);
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
            currentMonth: currentMonth,
            currentYear: currentYear,
            prevYear: prevYear,
            nextYear: nextYear,
            prevMonth: prevMonth,
            nextMonth: nextMonth,
            totalMonth: totalMonth,



            // module page info
            pageDisplayName: 'List Entry',
            pageDescription: 'Your entries listed by dailies of the month',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.show)
        };
    });