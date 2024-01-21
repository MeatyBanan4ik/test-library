import ValidationException from '../../../exceptions/validation.exception.js';

export default (model = {}, path = '', isRequired = true) =>
	async (req, res, next) => {
		try {
			if (Boolean(model) === false || !('findByPk' in model)) {
				throw new Error('Invalid Model');
			}

			const id = path.split('.').reduce((a, b) => (Boolean(a) && b in a ? a[b] : null), req);
			if (Boolean(id) === false && isRequired === false) {
				return next();
			}

			if (Boolean(id) === false) {
				throw new Error('Invalid Path');
			}

			if (Boolean(await model.findByPk(id)) === false) {
				throw new Error('Invalid ID');
			}

			return next();
		} catch (e) {
			return next(new ValidationException(e.message));
		}
	};
