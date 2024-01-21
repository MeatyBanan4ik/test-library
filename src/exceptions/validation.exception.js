import HttpException from './http.exception.js';

export default class ValidationException extends HttpException {
	status = 422;

	constructor(message = 'Validation Error.') {
		super(message);
	}
}
