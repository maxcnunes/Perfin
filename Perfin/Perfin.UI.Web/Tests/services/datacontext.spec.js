﻿/// <reference path="../../Scripts/jasmine.js" />


define([
    'models/model.category',
    'models/model.user',
    'models/model.accounttype',
    'models/model.account',
    'repositories/datacontext'],
    function (categoryModel,userModel,accounttypeModel,accountModel, datacontext) {
        describe('Services :: Datacontext', function () {
            
            //it('should add category', function () {
            //    var _success, _error;

            //    var callback = {
            //        success: function (response) { _success = response; },
            //        error: function (response) { _error = response; }
            //    };

            //    var category = new categoryModel();
            //    category.name('Name test');
            //    category.parent(0);

            //    datacontext.category.addData(category, callback);

            //    waitsFor(function () {
            //        return _success || _error;
            //    }, 5000);


            //    runs(function () {
            //        expect(_success).not.toBe(undefined);
            //        expect(_error).toBe(undefined);
            //    });
            //});

            //it('should update category', function () {
            //    var _success, _error;

            //    var callback = {
            //        success: function () { _success = true; },
            //        error: function () { _error = true; }
            //    };

            //    var category = new categoryModel();
            //    category.id(10);
            //    category.name('Name test - Update');
            //    category.parent(0);

            //    datacontext.category.updateData(category, callback);

            //    waitsFor(function () {
            //        return _success || _error;
            //    }, 5000);


            //    runs(function () {
            //        expect(_success).not.toBe(undefined);
            //        expect(_error).toBe(undefined);
            //    });
            //});

            //it('should delete category', function () {
            //    var _success, _error;

            //    var callback = {
            //        success: function () { _success = true; },
            //        error: function () { _error = true; }
            //    };

            //    var category = new categoryModel();
            //    category.id(11);

            //    datacontext.category.deleteData(category, callback);

            //    waitsFor(function () {
            //        return _success || _error;
            //    }, 5000);


            //    runs(function () {
            //        expect(_success).not.toBe(undefined);
            //        expect(_error).toBe(undefined);
            //    });
            //});



            it('should add user', function () {
                var _success, _error;

                var callback = {
                    success: function (response) { _success = response; },
                    error: function (response) { _error = response; }
                };

                var user = new userModel();
                user.login('logintest');
                user.password('123');

                datacontext.user.addData(user, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).toBeDefined();
                    expect(_error).toBe(undefined);
                });
            });

            //it('should get all users', function () {
            //    var _results;

            //    datacontext.user.getAll({results: _results});

            //    waitsFor(function () {
            //        return _results;
            //    }, 5000);


            //    runs(function () {
            //        expect(_results).toBeDefined();
            //    });

            //});

            it('should update user', function () {
                var _success, _error;

                var callback = {
                    success: function () { _success = true; },
                    error: function () { _error = true; }
                };

                var user = new userModel();
                user.id(10);
                user.name('Name test - Update');
                user.login('login');
                user.password('teste');

                datacontext.user.updateData(user, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).not.toBe(undefined);
                    expect(_error).toBe(undefined);
                });
            });

            it('should delete user', function () {
                var _success, _error;

                var callback = {
                    success: function () { _success = true; },
                    error: function () { _error = true; }
                };

                var user = new userModel();
                user.id(15); // always have to alter id to some valid user if you want to pass in test

                datacontext.user.deleteData(user, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).not.toBe(undefined);
                    expect(_error).toBe(undefined);
                });
            });




            it('should add accounttype', function () {
                var _success, _error;

                var callback = {
                    success: function (response) { _success = response; },
                    error: function (response) { _error = response; }
                };

                var accounttype = new accounttypeModel();
                accounttype.name('accountName');


                datacontext.accounttype.addData(accounttype, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).toBeDefined();
                    expect(_error).toBe(undefined);
                });
            });

            it('should add account', function () {
                var _success, _error;

                var callback = {
                    success: function (response) { _success = response; },
                    error: function (response) { _error = response; }
                };

                var acccount = new accountModel();
                acccount.name('accountNAme');
                account.description('account Description');
                //acccount.accounttypeModel.id(1);
                //account.categoryModel.id(1);

                datacontext.acccount.addData(acccount, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).toBeDefined();
                    expect(_error).toBe(undefined);
                });
            });


        });
    });

