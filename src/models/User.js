import _sequelize from 'sequelize'
const { Model, Sequelize } = _sequelize

export default class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'user_id',
        },
        fullName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'full_name',
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        passWord: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'pass_word',
        },
        facebookAppId: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: 'facebook_app_id',
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      }
    )
  }
}
