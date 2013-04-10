define(
	['models/model'],
	function (model) {
		
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
	                item.accounttypeId(dto.AccountType.id)
	                item.categoryId(dto.Category.id)
                    
	                item.dirtyFlag().reset();
	                return item;
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