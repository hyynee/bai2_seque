import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class SubFood extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        subId: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'sub_id',
        },
        subName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'sub_name',
        },
        subPrice: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'sub_price',
        },
        foodId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'food',
            key: 'food_id',
          },
          field: 'food_id',
        },
      },
      {
        sequelize,
        tableName: 'sub_food',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'sub_id' }],
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
