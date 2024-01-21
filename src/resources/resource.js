export default class Resource {
	async toResponse(_data) {
		return {};
	}

	async toArray(items = []) {
		return Promise.all(items.map(item => this.toResponse(item)));
	}
}
