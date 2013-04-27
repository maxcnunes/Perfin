﻿// ########################
// # Custom Bind Handlers #
// ########################


(function () {
    // Datepicker JQuery UI
    //-------------------------
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options.dateFormat = 'dd/mm/yy';

            $(element).datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($(element).datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datepicker("destroy");
            });

        },
        //update the control when the view model changes
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).datepicker("setDate", value);
        }
    };

    // Datepicker Meio Mask
    //-------------------------
    ko.bindingHandlers.meiomask = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            $(element)
                .attr('data-mask', valueAccessor())
                .css('padding-right', '20px')
                .setMask();
        },
        //update the control when the view model changes
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
        }
    };

    // Chosen Jquery
    //-------------------------
    ko.bindingHandlers.chosen = {
        init: function (elemenet, valueAccessor) {
            var chosenOptions = ko.utils.unwrapObservable(valueAccessor());

            // use setTimeout if width of select item does not set using CSS
            setTimeout(function () {
                $(elemenet).chosen(chosenOptions);
            }, 300);
        },
        update: function (elemenet, valueAccessor, allValuesAccessor) {
            ko.utils.unwrapObservable(allValuesAccessor().value);
            ko.utils.unwrapObservable(allValuesAccessor().options);
            ko.utils.unwrapObservable(allValuesAccessor().selectedOptions);
            $(elemenet).trigger("liszt:updated");
        }
    };
})();
