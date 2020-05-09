'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserEntity = sequelize.define('UserEntity', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        isEmail: true,
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'createdAt',
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updatedAt',
    },
  }, {});
  UserEntity.associate = function(models) {
    // associations can be defined here
  };
  return UserEntity;
};
