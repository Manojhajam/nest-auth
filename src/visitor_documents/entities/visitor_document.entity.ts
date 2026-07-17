import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Visitors } from 'src/visitor/entities/visitor.entity';
import { Users } from 'src/user/entities/user.entity';

@Table({
  tableName: 'visitor_documents',
  paranoid: true,
})
export class VisitorDocument extends Model<VisitorDocument> {
  @ForeignKey(() => Visitors)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  visitor_id!: number;

  @BelongsTo(() => Visitors)
  visitor!: Visitors;

  @Column({
    type: DataType.ENUM('CITIZENSHIP', 'DRIVING_LICENSE', 'PASSPORT', 'OTHER'),
    allowNull: false,
  })
  document_type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  document_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  file_path!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_verified!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  verified_at!: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  verified_by!: number;

  @BelongsTo(() => Users)
  verifier!: Users;
}
