import Resource from './resource.js';

class BookResource extends Resource {
	async toResponse(item) {
		return {
			id: item.id,
			title: item.title,
			author: item.author,
			year: item.year,
			genre: item.genre,
		};
	}
}

export default new BookResource();
