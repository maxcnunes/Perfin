define(['common/utils'], function (utils) {
    var colors = Highcharts.getOptions().colors;


    var ChartTotalTypeTransactionsByMonth = function (containerId, dtos) {
        var
            chart,
            dataChart,
            prepareDataToChart = function () {
                return _.map(dtos, function (dto) {
                    return { name: dto.typeTransaction, data: [dto.amount] };
                });
            },
            buildChart = function () {
                
                chart = $(containerId).highcharts({
                    chart: { type: 'column' },
                    title: { text: 'Balance, ' + moment().format('MMMM') },
                    colors: [
                       '#c42525',
                       '#2f7ed8'
                    ],
                    xAxis: { categories: ['Type Transactions'] },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Amount'
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.x + '</b><br>' + utils.formatCurrency(this.y);
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                color: '#4d759e',
                                style: {
                                    fontWeight: 'bold'
                                },
                                formatter: function () {
                                    return utils.formatCurrency(this.y);
                                }
                            }
                        }
                    },
                    series: dataChart
                })
                .highcharts();
            },
            init = function () {
                dataChart = prepareDataToChart();

                buildChart();
            };

        init();

        return chart;
    };


    return ChartTotalTypeTransactionsByMonth;
});