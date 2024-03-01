import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, PropertyEntity])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
