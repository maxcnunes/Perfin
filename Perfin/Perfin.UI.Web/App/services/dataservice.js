﻿// Aggregate all data services

define([
        'services/dataservice.category',
        'services/dataservice.accounttyype',
        'services/dataservice.account',
        'services/dataservice.user'],
    function (category, user) {
        return {
            category: category,
            user: user,
            accounttype: accounttype,
            account: account
        };

    });