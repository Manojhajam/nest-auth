import { Table, DataType, Column, Model } from "sequelize-typescript";

@Table({
    tableName: 'users',
    paranoid: true,
})

export class Users extends Model<Users> {
   @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fname!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lname!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.ENUM('Admin','Student','User'),
        allowNull: false,
        defaultValue: 'User',
    })
    role!: string;
}