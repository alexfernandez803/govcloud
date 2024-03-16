import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyEntity } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filtering } from 'src/decorators/filtering-params';
import { Pagination } from 'src/decorators/pagination-params';
import { Sorting } from 'src/decorators/sorting-params';
import { getWhere, getOrder } from 'src/helpers/where';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}
  create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  async findAll(
    { page = 0, limit = 10, size = 100, offset = 0 }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ) {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [languages, total] = await this.propertyRepository.findAndCount({
      where,
      order: {
        updatedAt: 'desc',
      },
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

  findOne(id: string) {
    const property = this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new Error('Customer not found');
    }

    return property;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
