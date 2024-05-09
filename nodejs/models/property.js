const Sequelize = require('sequelize');

class Property extends Sequelize.Model {
    static initiate(sequelize) {
        Property.init({
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            postalCode: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            roadAddress: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            jibunAddress: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Property',
                tableName: 'property',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
        });
    }
};

module.exports = Property;