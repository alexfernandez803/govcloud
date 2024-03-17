import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FilteringParams, Filtering } from 'src/decorators/filtering-params';
import { PaginationParams, Pagination } from 'src/decorators/pagination-params';
import { SortingParams, Sorting } from 'src/decorators/sorting-params';
import { CreatePropertyDto } from 'src/properties/dto/create-property.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(
    @PaginationParams() paginationParams?: Pagination,
    @SortingParams(['firstName', 'lastName']) sort?: Sorting,
    @FilteringParams(['firstName', 'id', 'lastName']) filter?: Filtering,
  ) {
    return this.customersService.findAll(paginationParams, sort, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Patch(':id/status/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.customersService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @Post(':id/properties')
  createProperty(
    @Param('id') id: string,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.customersService.createProperty(id, createPropertyDto);
  }

  @Get(':id/properties')
  getProperties(@Param('id') id: string, @Param('status') status?: string) {
    return this.customersService.getProperties(id, status);
  }
}
