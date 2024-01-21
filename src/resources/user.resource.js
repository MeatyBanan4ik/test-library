import Resource from './resource.js';

class UserResource extends Resource {
	async toResponse(item) {
		return {
			id: item.id,
			username: item.username,
			role_id: item.roleId,
		};
	}
}

export default new UserResource();
