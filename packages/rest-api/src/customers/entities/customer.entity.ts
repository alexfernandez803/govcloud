import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from 'src/database/base.entity';
import { PropertyEntity } from 'src/properties/entities/property.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @ManyToMany(() => PropertyEntity, (property) => property.customers)
  @JoinTable({ name: 'customer_properties' })
  properties: PropertyEntity[];
}
