import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

class BoilerParts {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  boiler_manufacturer: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  parts_manufacturer: string;

  @ApiProperty()
  vendor_code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string;

  @ApiProperty()
  in_stock: number;

  @ApiProperty()
  bestseller: boolean;

  @ApiProperty()
  new: boolean;

  @ApiProperty()
  popularity: number;

  @ApiProperty({ example: faker.lorem.sentence(4) })
  compatibility: string;

  @ApiProperty({ example: '2023-06-01T06:54:33.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-06-01T06:54:33.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: BoilerParts, isArray: true })
  rows: BoilerParts;
}

export class Bestsellers extends BoilerParts {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Bestsellers, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends BoilerParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: NewParts, isArray: true })
  rows: NewParts;
}

export class SearchByLetterResponse extends BoilerParts {
  @ApiProperty({ example: 'Nulla consequuntur.' })
  name: string;
}
export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}
export class SearchRequest {
  @ApiProperty({ example: 'l' })
  search: string;
}

export class GetByNameResponse extends BoilerParts {
  @ApiProperty({ example: 'Nulla consequuntur.' })
  name: string;
}
export class GetByNameRequest {
  @ApiProperty({ example: 'Nulla consequuntur.' })
  name: string;
}

export class FindOneResponse extends BoilerParts {}

export interface IBoilerPartsQuery {
  limit: string;
  offset: string;
}
