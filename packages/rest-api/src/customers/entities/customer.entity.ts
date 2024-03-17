import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from 'src/database/base.entity';
import { PropertyEntity } from 'src/properties/entities/property.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ name: 'status', type: 'varchar', length: 50, default: 'active' })
  status: string;

  @ManyToMany(() => PropertyEntity, (property) => property.customers)
  properties: PropertyEntity[];
}
