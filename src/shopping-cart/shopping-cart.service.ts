import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from '../users/users.service';
import { BoilerPartsService } from '../boiler-parts/boiler-parts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { th } from '@faker-js/faker';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly boilerPartsService: BoilerPartsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { user_id: userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const part = await this.boilerPartsService.findOne(addToCartDto.partId);

    cart.user_id = user.id;
    cart.part_id = part.id;
    cart.boiler_manufacturer = part.boiler_manufacturer;
    cart.parts_manufacturer = part.parts_manufacturer;
    cart.price = part.price;
    cart.in_stock = part.in_stock;
    cart.image = JSON.parse(part.images)[0];
    cart.name = part.name;
    cart.total_price = part.price;

    return cart.save();
  }

  async updateCount(count: number, partId: number): Promise<{ count: number }> {
    await this.shoppingCartModel.update(
      { count },
      { where: { part_id: partId } },
    );
    const part = await this.shoppingCartModel.findOne({
      where: { part_id: partId },
    });
    return { count: part.count };
  }
  async updateTotalPrice(
    totalPrice: number,
    partId: number,
  ): Promise<{ totalPrice: number }> {
    await this.shoppingCartModel.update(
      { total_price: totalPrice },
      { where: { part_id: partId } },
    );
    const part = await this.shoppingCartModel.findOne({
      where: { part_id: partId },
    });
    return { totalPrice: part.total_price };
  }

  async remove(partId: number): Promise<void> {
    const part = await this.shoppingCartModel.findOne({
      where: { part_id: partId },
    });
    await part.destroy();
  }

  async removeAll(userId: number): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { user_id: userId } });
  }
}
