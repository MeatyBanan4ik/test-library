import Service from './service.js';

import BookModel from '../db/models/book.model.js';

class BookService extends Service {
	constructor() {
		super(BookModel);
	}
}

export default new BookService();
