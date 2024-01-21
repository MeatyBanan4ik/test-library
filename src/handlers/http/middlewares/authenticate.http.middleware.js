import passport from 'passport';

import UnauthorizedException from '../../../exceptions/unauthorized.exception.js';

import { SCHEMES } from '../../../constants/auth.constants.js';

export function parseAuthorizationHeader(header) {
	const [, scheme, value] = header.match(/(\S+)\s+(\S+)/) || [];

	if (!scheme || !value) return null;

	return { scheme, value };
}

const defaultPassportParams = { session: false };

export default (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) return next(new UnauthorizedException());

	const { scheme, value } = parseAuthorizationHeader(authorization) || {};

	if (!scheme || !value) return next(new UnauthorizedException());

	const strategy = SCHEMES[scheme.toLowerCase()];

	if (!strategy) return next(new UnauthorizedException());

	return passport.authenticate(strategy, defaultPassportParams)(req, res, next);
};
