define([
    'jquery',
    'repositories/datacontext',
    'common/logger',
    'durandal/system',
    'common/breadcrumb',
    'common/config',
    'common/utils',
    'moment',
    'charts/chart.totalTypeTransactionsByMonth',
    'charts/chart.totalCategoriesByMonth'],
    function ($, datacontext, logger, system, breadcrumb, config, utils, moment, ChartTotalTypeTransactionsByMonth, ChartTotalTotalCategoriesByMonth) {
        var
            welcome = this,
            entries = ko.observableArray(),
            activate = function () {

            },

            loadChartTotalTypeTransactionsByMonth = function () {
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getTotalTypeTransactionsByMonth())

                        .fail(function () { def.reject(); })

                        .done(function (dtos) {
                            var chart = new ChartTotalTypeTransactionsByMonth('#chart-type-transactions', dtos);

                            def.resolve();
                        });

                }).promise();
            },

            loadChartTotalCategoriesByMonth = function () {
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getTotalCategoriesByMonth())

                        .fail(function () { def.reject(); })

                        .done(function (dtos) {
                            var chart = new ChartTotalTotalCategoriesByMonth('#chart-categories', dtos);

                            def.resolve();
                        });

                }).promise();
            },

            viewAttached = function (view) {
                loadChartTotalTypeTransactionsByMonth();
                loadChartTotalCategoriesByMonth();
            };


        return {
            entries: entries,
            activate: activate,
            viewAttached: viewAttached,

            // module page info
            pageDisplayName: 'Dashboard',
            pageDescription: 'All informations about your personal finance on the same place',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.welcome)
        };
    });