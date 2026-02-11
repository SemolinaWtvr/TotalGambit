import { DataTypes } from "sequelize";

function userModel (sequelize) {
    const user = sequelize.define (
        'user',
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            role: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            username: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            pwd: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            tokens: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            bio: {
                type: DataTypes.STRING(),
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'user'
        }
    );
    return user;
}


export default userModel;