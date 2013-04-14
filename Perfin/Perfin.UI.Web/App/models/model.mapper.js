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
					item.parent(dto.parent);
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
	            }
	        },
            accounttype = {
                getDtoId: function (dto) {
                    return dto.id;
                },
                fromDto: function (dto, item) {
                    item = item || new model.AccountType().id(dto.id);
                    item.name(dto.name);
                   
                    item.dirtyFlag().reset();
                    return item;
                }
            },
	        account = {
	            getDtoId: function (dto) {
	                return dto.id;
	            },
	            fromDto: function (dto, item) {
	                item = item || new model.Account().id(dto.id);
	                item.name(dto.name);
	                item.description(dto.description);
	                item.accounttypeId(dto.type.id)
	                item.categoryId(dto.category.id)
	                item.userId(dto.user.id)
                    
	                item.dirtyFlag().reset();
	                return item;
	            },
	            toJSON: function (item) {
	                var modelToJSON = item;

	                if (item.categoryId && item.categoryId() > 0) {
	                    modelToJSON.category = new model.Category().id(item.categoryId());
	                }
	                if (item.accounttypeId && item.accounttypeId() > 0) {
	                    modelToJSON.type = new model.AccountType().id(item.accounttypeId());
	                }
	                // User id fixed as 1 for while
	                item.userId(1);
	                if (item.userId && item.userId() > 0) {
	                    modelToJSON.user = new model.User().id(item.userId());
	                }

	                return ko.toJSON(modelToJSON);
	            }
	        };

		// Public Members
	    return {
	        category: category,
	        user: user,
            accounttype:accounttype,
            account:account
		};
	}
);