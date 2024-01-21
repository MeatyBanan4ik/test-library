export default class Service {
	constructor(Model) {
		this.Model = Model;
	}

	async all({ limit = 10, offset = 0, sort = { id: 'ASC' } }) {
		const { count, rows } = await this.Model.findAndCountAll({
			offset: Number(offset),
			limit: Number(limit),
			order: Object.entries(sort),
		});

		return { total: count || 0, items: rows };
	}

	async create(data) {
		return this.Model.create(data);
	}

	async get(id) {
		return this.Model.findByPk(id);
	}

	async update(id, data) {
		await this.Model.update(data, { where: { id } });

		return this.get(id);
	}

	async delete(id) {
		return Boolean(
			await this.Model.destroy({
				where: { id },
			}),
		);
	}
}
