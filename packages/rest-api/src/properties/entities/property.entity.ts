import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from 'src/database/base.entity';
import { CustomerEntity } from 'src/customers/entities/customer.entity';

@Entity('properties')
export class PropertyEntity extends BaseEntity {
  @Column({ name: 'address_line1', type: 'varchar', length: 100 })
  addressLine1: string;
  @Column({ name: 'address_line2', type: 'varchar', length: 100 })
  addressLine2: string;

  @Column({ name: 'barangay', type: 'varchar', length: 50 })
  barangay: string;

  @Column({ name: 'city', type: 'varchar', length: 50 })
  city: string;

  @Column({ name: 'assessed_value', type: 'decimal' })
  assessedValue: number;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  status: string;

  @Column({ name: 'description', type: 'varchar', length: 250 })
  description: string;

  @Column({ name: 'remarks', type: 'varchar', length: 250 })
  remarks: string;

  @ManyToMany(() => CustomerEntity, (customer) => customer.properties, {
    cascade: true,
  })
  @JoinTable({ name: 'customer_properties' }) // Fix: Add parentheses around the options object
  customers: CustomerEntity[];
}
