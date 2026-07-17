import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'visitors',
  paranoid: true,
})
export class Visitors extends Model<Visitors> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  citizenship_no!: string;

  @Column({
    type: DataType.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  purpose_of_visit!: string;
}
