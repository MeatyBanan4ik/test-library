import AuthService from '../../services/auth.service.js';

export default class AuthHttpHandler {
	constructor() {
		this.service = AuthService;
	}

	async login(req, res) {
		const { username, password } = req.body;

		res._success({ data: await this.service.login(username, password) });
	}

	async register(req, res) {
		const { username, password } = req.body;

		await this.service.register(username, password);

		res._success({ data: {}, message: 'Registration completed successfully.' });
	}

	async refresh(req, res) {
		const { refresh_token: refreshToken } = req.body;

		res._success({ data: await this.service.refresh(refreshToken) });
	}
}
