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
                                return { name: dto.typeTransaction, data: [dto.amount] };
                            });
                            debugger;



                            var chartOptions = {
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: 'Current '
                                },
                                //subtitle: {
                                //    text: 'Source: WorldClimate.com'
                                //},
                                xAxis: {
                                    categories: ['Type Transactions']
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Amount ($)'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0">$ <b>{point.y:.1f}</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.2,
                                        borderWidth: 0
                                    }
                                },
                                series: data
                            };

                            chartTotalTypeTransactionsByMonth(chartOptions);

                            def.resolve();
                        });

                }).promise();
            },
            viewAttached = function (view) {
                //$('#tabs').tabs();
                $('#tabs').carouFredSel({
                    circular: false,
                    items: 1,
                    width: '100%',
                    auto: false,
                    pagination: {
                        container: '#pager',
                        anchorBuilder: function (nr) {
                            return '<a href="#">' + $(this).find('h3').text() + '</a>';
                        }
                    }
                });
            };


        return {
            entries: entries,
            activate: activate,
            viewAttached: viewAttached,
            chartTotalTypeTransactionsByMonth: chartTotalTypeTransactionsByMonth,

            // module page info
            pageDisplayName: 'Dashboard',
            pageDescription: 'All informations about your personal finance on the same place',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.welcome)
        };
    });