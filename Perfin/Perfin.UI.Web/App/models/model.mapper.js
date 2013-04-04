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
	        };

		// Public Members
	    return {
	        category: category,
            user: user
		};
	}
);