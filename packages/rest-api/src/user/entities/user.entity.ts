import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;
}
