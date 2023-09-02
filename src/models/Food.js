import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class Food extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        foodId: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'food_id',
        },
        foodName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'food_name',
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        desc: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        typeId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'food_type',
            key: 'type_id',
          },
          field: 'type_id',
        },
      },
      {
        sequelize,
        tableName: 'food',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'food_id' }],
          },
          {
            name: 'type_id',
            using: 'BTREE',
            fields: [{ name: 'type_id' }],
          },
        ],
      }
    )
  }
}
