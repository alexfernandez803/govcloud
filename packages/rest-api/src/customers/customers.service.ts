import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Filtering } from 'src/decorators/filtering-params';
import { Pagination } from 'src/decorators/pagination-params';
import { Sorting } from 'src/decorators/sorting-params';
import { getWhere, getOrder } from 'src/helpers/where';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { CreatePropertyDto } from 'src/properties/dto/create-property.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer: CustomerEntity = new CustomerEntity();
    customer.firstName = createCustomerDto.firstName;
    customer.lastName = createCustomerDto.lastName;
    return this.customerRepository.save(customer);
  }

  async findAll(
    { page = 0, limit = 10, size = 100, offset = 0 }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ) {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [languages, total] = await this.customerRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: languages,
      page,
      size,
    };
  }

  findOne(id: string): Promise<CustomerEntity> {
    const customer = this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.firstName = updateCustomerDto.firstName;
    customer.lastName = updateCustomerDto.lastName;

    return this.customerRepository.save(customer);
  }

  async createProperty(customerId: string, property: CreatePropertyDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    const newProperty = new PropertyEntity();
    newProperty.addressLine1 = property.addressLine1;
    newProperty.addressLine2 = property.addressLine2;
    newProperty.barangay = property.barangay;
    newProperty.city = property.city;
    newProperty.assessedValue = property.assessedValue;
    newProperty.description = property.description;
    newProperty.remarks = property.remarks;
    newProperty.lotSize = property.lotSize;

    const existing = await this.propertyRepository.save(newProperty);
    existing.customers = [customer];
    return this.propertyRepository.save(existing);
  }

  async getProperties(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['properties'],
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer.properties;
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.customerRepository.delete(id);
  }
}
