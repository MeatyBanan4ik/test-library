import { Strategy } from 'passport';

export default class AbstractStrategy extends Strategy {
	constructor(verify) {
		super();
		this.verify = verify;
	}

	/* c8 ignore next 3 */
	get name() {
		throw new Error('abstract method');
	}

	/* c8 ignore next 3 */
	authenticate(_req, _res, _next) {
		throw new Error('abstract method');
	}
}
