define(['ko', 'common/utils'], function (ko, utils) {
    var colors = Highcharts.getOptions().colors;


    var ChartTotalTotalCategoriesByMonth = function (containerId, dtos) {
        var
            chart,
            chartName = 'Categories',
            rootCategories,
            rootCategoriesName,
            dataChart,
            getRootCategories = function () {
                return _.filter(dtos, function (dto) { return dto.parentCategoryId === null; });
            },
            getCategoriesName = function (categories) {
                return _.map(categories, function (dto) { return dto.category; });
            },
            getChildrenCategoriesByParentId = function (parentId) {
                return _.filter(dtos, function (dto) { return dto.parentCategoryId === parentId; });
            },
            getChildWithChildren = function (childrenData, id) {
                return _.find(childrenData, function (item) { return item.id === id; });
            },
            getChartChildrenData = function (childrenCategoriesDtos, color, parentId) {
                var childrenData = [];
                _.each(childrenCategoriesDtos, function (dto) {
                    var items = prepareDataToChartByCategory(dto, color, parentId);
                    if (items) childrenData.push(items);
                });
                return childrenData;
            },
            getChildrenCategoriesAmounts = function (childrenCategoriesDtos, childrenData) {
                return _.map(childrenCategoriesDtos, function (dto) {
                    var childWithChildren = getChildWithChildren(childrenData, dto.id);
                    if (childWithChildren) {
                        return childWithChildren;
                    }
                    return dto.amount;
                });
            },
            sumChildrenCategoriesAmounts = function (childrenCategoriesAmounts) {
                var sum = _.reduce(childrenCategoriesAmounts, function (memo, item) {
                    if (!isNaN(item)) return memo + item;
                    if (item.y) {
                        var sumChildren = sumChildrenCategoriesAmounts(item.drilldown.data);
                        return memo + item.y + sumChildren;
                    }
                }, 0);
                return sum;
            },
            prepareDataToChartByCategory = function (categoryDto, color, parentId) {
                var childrenCategoriesDtos = getChildrenCategoriesByParentId(categoryDto.id);

                // chart point data
                var pointData = {
                    y: categoryDto.amount,
                    color: color,
                    id: categoryDto.id,
                    parentCategoryId: parentId,
                    hasChildrenCategories: (childrenCategoriesDtos.length > 0)
                };

                // has no data
                if (!pointData.hasChildrenCategories && parentId) return;

                // has children categories
                if (pointData.hasChildrenCategories) {
                    var childrenData = getChartChildrenData(childrenCategoriesDtos, color, categoryDto.id);

                    var childrenCategoriesNames = getCategoriesName(childrenCategoriesDtos);

                    var childrenCategoriesAmounts = getChildrenCategoriesAmounts(childrenCategoriesDtos, childrenData);

                    // override point data with total amount
                    pointData.y = categoryDto.amount + sumChildrenCategoriesAmounts(childrenCategoriesAmounts);

                    // include sub chart
                    pointData.drilldown = {
                        name: categoryDto.category,
                        categories: childrenCategoriesNames,
                        data: childrenCategoriesAmounts,
                        color: color
                    };
                }

                return pointData;
            },
            prepareDataToChartRootCategories = function () {
                var index = -1;
                return _.map(rootCategories, function (dto) {
                    index++;
                    return prepareDataToChartByCategory(dto, colors[index]);
                });
            },
            setChart = function (name, categories, data, color) {
                chart.xAxis[0].setCategories(categories, false);
                chart.series[0].remove(false);
                chart.addSeries({
                    name: name,
                    data: data,
                    color: color || 'white'
                }, false);
                chart.redraw();
            },
            onClick = function () {
                debugger;
                var drilldown = this.drilldown;
                if (drilldown) {
                    setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                } else {
                    setChart(chartName, rootCategoriesName, dataChart);
                }
            },
            toolTipFormatter = function () {
                var point = this.point,
                    toolTipText = this.x + ':<b>' + utils.formatCurrency(this.y) + '</b><br/>';
                if (point.drilldown) {
                    toolTipText += 'Click to view ' + point.category + ' children categories';
                } else {
                    toolTipText += 'Click to return to root categories';
                }
                return toolTipText;
            },
            buildChart = function () {
                chart = $(containerId).highcharts({
                    chart: { type: 'column' },
                    title: { text: 'Total Categories, ' + moment().format('MMMM') },
                    subtitle: { text: 'Click the columns to expand the children categories' },
                    xAxis: { categories: rootCategoriesName },
                    yAxis: { title: { text: 'Total Amount' } },
                    plotOptions: {
                        column: {
                            cursor: 'pointer',
                            point: { events: { click: onClick } },
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
                    tooltip: { formatter: toolTipFormatter },
                    series: [{
                        name: chartName,
                        data: dataChart,
                        color: 'white'
                    }],
                    exporting: { enabled: false }
                })
                .highcharts();
            },
            init = function () {
                rootCategories = getRootCategories();
                rootCategoriesName = getCategoriesName(rootCategories);
                dataChart = prepareDataToChartRootCategories();

                buildChart();
            };

        init();

        return chart;
    };


    return ChartTotalTotalCategoriesByMonth;
});