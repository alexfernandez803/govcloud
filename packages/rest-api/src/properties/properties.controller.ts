import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FilteringParams, Filtering } from 'src/decorators/filtering-params';
import { PaginationParams, Pagination } from 'src/decorators/pagination-params';
import { SortingParams, Sorting } from 'src/decorators/sorting-params';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(
    @PaginationParams() paginationParams?: Pagination,
    @SortingParams(['firstName', 'lastName']) sort?: Sorting,
    @FilteringParams(['firstName', 'id', 'lastName']) filter?: Filtering,
  ) {
    return this.propertiesService.findAll(paginationParams, sort, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id/status/:status')
  toArchive(@Param('id') id: string, @Param('status') status: string) {
    return this.propertiesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
