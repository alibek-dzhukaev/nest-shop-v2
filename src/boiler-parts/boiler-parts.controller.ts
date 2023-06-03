import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@ApiTags('Boiler parts')
@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartsService: BoilerPartsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @Get()
  @UseGuards(AuthenticatedGuard)
  paginateAndFilter(@Query() query) {
    return this.boilerPartsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @Get('find/:id')
  @UseGuards(AuthenticatedGuard)
  getOne(@Param('id') id: number) {
    return this.boilerPartsService.findOne(id);
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  @Get('bestsellers')
  @UseGuards(AuthenticatedGuard)
  getBestseller() {
    return this.boilerPartsService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @Get('new')
  @UseGuards(AuthenticatedGuard)
  getNew() {
    return this.boilerPartsService.new();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @Post('search')
  @UseGuards(AuthenticatedGuard)
  search(@Body() { search }: { search: string }) {
    return this.boilerPartsService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @Post('name')
  @UseGuards(AuthenticatedGuard)
  getByName(@Body() { name }: { name: string }) {
    return this.boilerPartsService.findOneByName(name);
  }
}
