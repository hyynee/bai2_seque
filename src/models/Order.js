import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class Order extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
          },
          field: 'user_id',
        },
        foodId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'food',
            key: 'food_id',
          },
          field: 'food_id',
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        arrSubId: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'arr_sub_id',
        },
      },
      {
        sequelize,
        tableName: 'order',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'food_id' }],
          },
          {
            name: 'food_id',
            using: 'BTREE',
            fields: [{ name: 'food_id' }],
          },
        ],
      }
    )
  }
}
