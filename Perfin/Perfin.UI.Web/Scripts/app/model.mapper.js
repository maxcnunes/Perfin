define('model.mapper',
	['model'],
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
					item.dirtyFlag().reset();
					return item;
				}
			};

		// Public Members
	    return {
			cateogry: category
		};
	}
);