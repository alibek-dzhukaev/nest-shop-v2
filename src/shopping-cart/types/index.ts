import { ApiProperty } from '@nestjs/swagger';
class ShoppingCartItem {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly user_id: number;

  @ApiProperty()
  readonly part_id: number;

  @ApiProperty()
  readonly boiler_manufacturer: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly parts_manufacturer: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly in_stock: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly total_price: number;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCartResponse extends ShoppingCartItem {}
export class UpdateCountResponse {
  @ApiProperty()
  readonly count: number;
}
export class UpdateCountRequest {
  @ApiProperty()
  readonly count: number;
}

export class UpdateTotalPriceResponse {
  @ApiProperty()
  readonly totalPrice: number;
}
export class UpdateTotalPriceRequest {
  @ApiProperty()
  readonly totalPrice: number;
}
