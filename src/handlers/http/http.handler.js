import NotFoundException from '../../exceptions/notFound.exception.js';

export default class HttpHandler {
	constructor(Service, Resource) {
		this.service = Service;
		this.resource = Resource;
	}

	async all(req, res) {
		const { limit = 10, offset = 0, sort } = req.query;

		const data = await this.service.all({ limit, offset, sort });

		data.items = await this.resource.toArray(data.items);
		res._success({ data });
	}

	async create(req, res) {
		this._req = req;

		const item = await this.service.create(await this.getCreateAttributes());

		res._success({ data: await this.resource.toResponse(item) });
	}

	async get(req, res) {
		const item = await this.service.get(req.params.id);

		if (item === null) {
			throw new NotFoundException();
		}

		res._success({ data: await this.resource.toResponse(item) });
	}

	async update(req, res) {
		this._req = req;

		const item = await this.service.update(req.params.id, await this.getUpdateAttributes());

		res._success({ data: await this.resource.toResponse(item) });
	}

	async delete(req, res) {
		await this.service.delete(req.params.id);

		res._success();
	}

	async getCreateAttributes() {
		return this._req.body;
	}

	async getUpdateAttributes() {
		return this._req.body;
	}
}
