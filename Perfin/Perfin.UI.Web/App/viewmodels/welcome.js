
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
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