import ValidationException from '../../../exceptions/validation.exception.js';

export default field => (req, res, next) => {
	try {
		if (!(field in req.body) || req.body[field].length === 0) {
			throw new Error(`The ${field} is required`);
		}

		next();
	} catch (e) {
		next(new ValidationException(e.message));
	}
};
