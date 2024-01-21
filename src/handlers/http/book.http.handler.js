import HttpHandler from './http.handler.js';

import BookService from '../../services/book.service.js';

import BookResource from '../../resources/book.resource.js';

export default class BookHttpHandler extends HttpHandler {
	constructor() {
		super(BookService, BookResource);
	}

	async getCreateAttributes() {
		const { title, author, year, genre } = this._req.body;

		return { title, author, year: Number(year), genre };
	}

	async getUpdateAttributes() {
		const { title, author, year, genre } = this._req.body;

		const data = { title, author, genre };

		if (year !== undefined) {
			data.year = Number(year);
		}

		return data;
	}
}
