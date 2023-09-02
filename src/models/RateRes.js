import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class RateRes extends Model {
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
        resId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'restaurant',
            key: 'res_id',
          },
          field: 'res_id',
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dateRate: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'date_rate',
        },
      },
      {
        sequelize,
        tableName: 'rate_res',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'res_id' }],
          },
          {
            name: 'res_id',
            using: 'BTREE',
            fields: [{ name: 'res_id' }],
          },
        ],
      }
    )
  }
}
