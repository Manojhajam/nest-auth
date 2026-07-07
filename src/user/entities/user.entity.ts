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
    declare fname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare lname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;
}