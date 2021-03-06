﻿
define([],
    function () {
        
        var
            hasProperties = function(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        return true;
                    }
                }
                return false;
            },
            invokeFunctionIfExists = function (callback) {
                if (_.isFunction(callback)) {
                    callback();
                }
            },
            mapMemoToArray = function (items) {
                var underlyingArray = [];
                for (var prop in items) {
                    if (items.hasOwnProperty(prop)) {
                        underlyingArray.push(items[prop]);
                    }
                }
                return underlyingArray;
            },
            formatCurrency = function (value) {
                return $('<span />').text(value).currency().text();
            };

        // Public Members
        return {
            hasProperties: hasProperties,
            invokeFunctionIfExists: invokeFunctionIfExists,
            mapMemoToArray: mapMemoToArray,
            formatCurrency: formatCurrency
        };
    }
);