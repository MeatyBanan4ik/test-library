import { Op } from 'sequelize';

import ValidationException from '../../../exceptions/validation.exception.js';

export default (model = {}, param = '', field = '', expectId = '', isRequired = true) =>
	async (req, res, next) => {
		try {
			if (Boolean(model) === false || !('findByPk' in model)) {
				throw new Error('Invalid Model');
			}

			if (Boolean(param) === false) {
				throw new Error('Invalid Param');
			}

			if (Boolean(field) === false) {
				field = param;
			}

			if (Boolean(req.body[param]) === false && isRequired === false) {
				return next();
			}

			const query = {
				[field]: req.body[param],
			};

			if (Boolean(expectId) === true) {
				query.id = {
					[Op.ne]: expectId,
				};
			}

			if (Boolean(await model.findOne({ where: query })) === true) {
				throw new Error(`The ${field} has already been taken.`);
			}

			return next();
		} catch (e) {
			return next(new ValidationException(e.message));
		}
	};
