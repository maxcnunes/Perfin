define([
    'jquery',
    'repositories/datacontext',
    'common/logger',
    'durandal/system',
    'common/breadcrumb',
    'common/config'],
    function ($, datacontext, logger, system, breadcrumb, config) {
        var
            welcome = this,
            entries = ko.observableArray(),
            chartTotalTypeTransactionsByMonth = ko.observable(),
            activate = function () {
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getTotalTypeTransactionsByMonth())

                        .fail(function () { def.reject(); })

                        .done(function (dtos) {

                            var data = _.map(dtos, function (dto) {
                                return [dto.typeTransaction, dto.amount];
                            });

                            var chartOptions = {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                title: {
                                    text: 'Total Type Transactions, 04/2013'
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                                    percentageDecimals: 1
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            formatter: function () {
                                                return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                                            }
                                        }
                                    }
                                },
                                series: [{
                                    type: 'pie',
                                    name: 'Total Type Transactions',
                                    data: data
                                }]
                            };

                            chartTotalTypeTransactionsByMonth(chartOptions);

                            def.resolve();
                        });

                }).promise();
            };


        return {
            entries: entries,
            activate: activate,
            chartTotalTypeTransactionsByMonth: chartTotalTypeTransactionsByMonth,

            // module page info
            pageDisplayName: 'Dashboard',
            pageDescription: 'All informations about your personal finance on the same place',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.welcome)
        };
    });