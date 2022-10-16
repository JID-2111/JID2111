import { Type } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
  ChildEntity,
} from 'typeorm';
import {
  OutputFormat,
  RecordMatches,
  RowBooleanOperations,
  RowIDOperations,
  RowNumberOperations,
  RowStringOperations,
  TableGenericOperations,
  UnitTestOperations,
} from './enum';
import RuleEntity from './RuleEntity';

@TableInheritance({ column: { type: 'varchar', name: 'type' } })
@Entity({ name: 'UnitTest' })
export abstract class UnitTestEntity {
  @Column({
    enum: UnitTestOperations,
    type: 'simple-enum',
  })
  abstract level: UnitTestOperations;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    enum: RecordMatches,
    type: 'simple-enum',
  })
  expectedRecordMatches: RecordMatches;

  @Column()
  total: boolean;

  @Column()
  expectedNumRecords: number;

  @Column()
  table: string; // table to run test on

  @Column({
    nullable: true,
  })
  column?: string;

  @Column({
    nullable: true,
  })
  value?: string;

  abstract operation:
    | TableGenericOperations
    | RowStringOperations
    | RowBooleanOperations
    | RowNumberOperations
    | RowIDOperations;

  @Column()
  result: boolean; // Pass or Fail

  @Column({
    type: 'simple-enum',
    enum: OutputFormat,
  })
  format: OutputFormat; // Format for output field

  @Column()
  output: string; // Debug information

  @ManyToOne((_type) => RuleEntity, (rule) => rule.unitTests, {
    onDelete: 'CASCADE',
  })
  @Type(() => RuleEntity)
  rule: RuleEntity;
}

@ChildEntity()
export class TableTestEntity extends UnitTestEntity {
  level: UnitTestOperations.TableGenericOperations;

  @Column({
    type: 'simple-enum',
    enum: TableGenericOperations,
  })
  operation: TableGenericOperations;
}

@ChildEntity()
export class RowStringEntity extends UnitTestEntity {
  level: UnitTestOperations.RowStringOperations;

  @Column({
    type: 'simple-enum',
    enum: RowStringOperations,
  })
  operation: RowStringOperations;
}

@ChildEntity()
export class RowIDEntity extends UnitTestEntity {
  level: UnitTestOperations.RowIDOperations;

  @Column({
    type: 'simple-enum',
    enum: RowIDOperations,
  })
  operation: RowIDOperations;
}

@ChildEntity()
export class RowNumberEntity extends UnitTestEntity {
  level: UnitTestOperations.RowNumberOperations;

  @Column({
    type: 'simple-enum',
    enum: RowNumberOperations,
  })
  operation: RowNumberOperations;
}

@ChildEntity()
export class RowBooleanEntity extends UnitTestEntity {
  level: UnitTestOperations.RowBooleanOperations;

  @Column({
    type: 'simple-enum',
    enum: RowBooleanOperations,
  })
  operation: RowBooleanOperations;
}
