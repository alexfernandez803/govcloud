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

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
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
    return this.customerRepository.findOneBy({ id });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.customerRepository.delete(id);
  }
}
