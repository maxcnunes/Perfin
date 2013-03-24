define([
    'models/model.category',
    'services/datacontext'],
    function (model, datacontext) {
        describe('Services :: Datacontext', function () {
            it('should add category', function () {
                var _success, _error;

                var callback = {
                    success: function (response) { _success = response; },
                    error: function (response) { _error = response; }
                };

                var category = new model();
                category.name('Name test');
                category.parent(0);

                datacontext.category.addData(category, callback);

                waitsFor(function () {
                    return _success || _error;
                }, 5000);


                runs(function () {
                    expect(_success).not.toBe(undefined);
                    expect(_error).toBe(undefined);
                });

            });
        });
    });

