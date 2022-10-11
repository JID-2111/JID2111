import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import ConnectionEntity from './ConnectionEntity';
import RuleEntity from './RuleEntity';

/**
 * A list of previous executions. Contains the test data, group, and test conditions.
 * Currently supports only one database // TODO add support
 */
@Entity({ name: 'Execution' })
class ExecutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  /**
   * A list of the rules being tested
   */
  @OneToMany((_type) => RuleEntity, (rule) => rule)
  rules: RuleEntity[];

  /**
   * The server connections to execute on
   */
  @ManyToMany(
    (_type) => ConnectionEntity,
    (connection) => connection.executions,
    {
      onDelete: 'CASCADE',
    }
  )
  connections: ConnectionEntity[];
}

export default ExecutionEntity;
