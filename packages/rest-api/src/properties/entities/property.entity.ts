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

  @Column({ name: 'lot_size', type: 'decimal' })
  lotSize: number;

  @Column({ name: 'status', type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ name: 'description', type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ name: 'remarks', type: 'varchar', length: 250, nullable: true })
  remarks: string;

  @ManyToMany(() => CustomerEntity, (customer) => customer.properties, {})
  @JoinTable({
    name: 'customer_properties',
    joinColumn: { name: 'property_id' },
    inverseJoinColumn: { name: 'customer_id' },
  })
  customers: CustomerEntity[];
}
