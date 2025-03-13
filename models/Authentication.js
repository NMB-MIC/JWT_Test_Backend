module.exports = (sequelize, DataTypes) => {
    const Authentication = sequelize.define(
      "Authentication",
      {
        auth_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
  
        emp_no: {
          type: DataTypes.STRING(5),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(450),
          allowNull: false,
          unique: true,
        },
        signup_status: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: "deactivate",
        },
      },
      {
        freezeTableName: true,
      }
    );
    return Authentication;
  };
  