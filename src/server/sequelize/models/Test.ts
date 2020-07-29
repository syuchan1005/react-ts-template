import { Model, DataTypes } from 'sequelize';

// eslint-disable-next-line import/prefer-default-export
export class Test extends Model {
  public id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize) {
    Test.init({
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
    }, {
      sequelize,
      tableName: 'test',
    });
  }

  /*
  public static associate() {
    ex) Test.belongsTo(...);
  }
  */
}
