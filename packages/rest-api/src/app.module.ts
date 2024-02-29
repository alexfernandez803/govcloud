import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { CustomersModule } from './customers/customers.module';
import { CustomerEntity } from './customers/entities/customer.entity';
import { PropertiesModule } from './properties/properties.module';
import { PropertyEntity } from './properties/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '',
      username: 'postgres',
      entities: [UserEntity, CustomerEntity, PropertyEntity], // here we have added user enitity in entities array
      database: 'govcloud',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CustomersModule,
    PropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
