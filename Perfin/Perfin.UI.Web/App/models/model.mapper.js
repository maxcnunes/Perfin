define(
	['ko', 'models/model'],
	function (ko, model) {

	    // Private Members
	    var
			category = {
			    getDtoId: function (dto) {
			        return dto.id;
			    },
			    fromDto: function (dto, item) {
			        item = item || new model.Category().id(dto.id);
			        item.name(dto.name);
			        item.parentCategoryId(dto.parentCategoryId);
			        item.dirtyFlag().reset();
			        return item;
			    }
			},
	        user = {
	            getDtoId: function (dto) {
	                return dto.id;
	            },
	            fromDto: function (dto, item) {
	                item = item || new model.User().id(dto.id);
	                item.login(dto.login);
	                item.password(dto.password);
	                item.name(dto.name);
	                item.email(dto.email);
	                item.salt(dto.salt);
	                item.dirtyFlag().reset();
	                return item;
	            },
	            fromAuth0Dto: function (dto, item) {
	                item = item || new model.User().id(dto.id);
	                item.login(dto.nickname);
	                item.name(dto.name);
	                item.email(dto.email);
	                item.dirtyFlag().reset();
	                item.oAuthId(dto.user_id);
	                item.picture(dto.picture);
	                return item;
	            }
	        },
	        entry = {
	            getDtoId: function (dto) {
	                return dto.id;
	            },
	            fromDto: function (dto, item) {
	                item = item || new model.Entry().id(dto.id);
	                item.amount(dto.amount);
	                item.description(dto.description);
	                item.createDate(dto.createDate);
	                item.entryDate(dto.entryDate);
	                item.categoryId(dto.category.id);
	                item.typeTransaction(dto.typeTransaction);
	                item.userId(dto.user.id);

	                item.dirtyFlag().reset();
	                return item;
	            },

	            toJSON: function (item) {
	                var modelToJSON = item;

	                if (item.categoryId && item.categoryId() > 0) {
	                    modelToJSON.category = new model.Category().id(item.categoryId());
	                }
	                // User id fixed as 1 for while
	                item.userId(1);
	                if (item.userId && item.userId() > 0) {
	                    modelToJSON.user = new model.User().id(item.userId());
	                }

	                var amount = item.amount().toString().split('.').join('').replace(',', '.');
	                modelToJSON.amount = parseFloat(amount);

	                return ko.toJSON(modelToJSON);
	            }
	        };

	    // Public Members
	    return {
	        category: category,
	        user: user,
	        entry: entry
	    };
	}
);