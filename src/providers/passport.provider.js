import passport from 'passport';

import { bearerStrategyHandler } from './passport/bearer.strategy.js';

export default () => {
	passport.use(bearerStrategyHandler());
};
