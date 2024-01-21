import ForbiddenException from '../../../exceptions/forbidden.exception.js';

import RoleModel from '../../../db/models/role.model.js';

import { ACCESS } from '../../../constants/role.constants.js';
import { ENTITIES } from '../../../constants/entities.constants.js';

export default (entity = '', operation = '') =>
	async (req, res, next) => {
		try {
			if (Boolean(entity) === false || !Object.values(ENTITIES).includes(entity)) {
				throw new Error('Invalid Entity');
			}

			const roleModel = await RoleModel.findByPk(req.user.roleId);

			if (!(ACCESS[roleModel.name]?.[entity] ?? []).includes(operation)) {
				throw new Error('Access denied');
			}

			return next();
		} catch (e) {
			return next(new ForbiddenException(e.message));
		}
	};
