import { DataTypes, Model } from 'sequelize';

import SequelizeProvider from '../../providers/sequelize.provider.js';

class BookModel extends Model {}

BookModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		genre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: SequelizeProvider.connection,
		modelName: 'book',
		timestamps: false,
	},
);

export default BookModel;
