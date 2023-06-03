import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { User } from '../../src/users/users.model';
import * as bcrypt from 'bcrypt';
import { BoilerPartsModule } from '../../src/boiler-parts/boiler-parts.module';
import { BoilerPartsService } from '../../src/boiler-parts/boiler-parts.service';
import { UsersService } from '../../src/users/users.service';
import { ShoppingCart } from '../../src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from '../../src/shopping-cart/shopping-cart.module';
import { ShoppingCartService } from '../../src/shopping-cart/shopping-cart.service';

const mockedUser = {
  username: 'John',
  email: 'john@mail.ru',
  password: '1234',
};

describe('Shopping Cart Service', () => {
  let app: INestApplication;
  let boilerPartsService: BoilerPartsService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        ShoppingCartModule,
        BoilerPartsModule,
      ],
    }).compile();

    boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService =
      testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const part = await boilerPartsService.findOne(1);

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
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { part_id: 1 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    cart.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          user_id: user.id,
          part_id: expect.any(Number),
          boiler_manufacturer: expect.any(String),
          price: expect.any(Number),
          parts_manufacturer: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          in_stock: expect.any(Number),
          count: expect.any(Number),
          total_price: expect.any(Number),
          updatedAt: expect.any(Date),
          createdAt: expect.any(Date),
        }),
      );
    });
  });

  it('should add cart items', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      partId: 3,
    });
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.part_id === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        user_id: user.id,
        part_id: 3,
        boiler_manufacturer: expect.any(String),
        price: expect.any(Number),
        parts_manufacturer: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        in_stock: expect.any(Number),
        count: expect.any(Number),
        total_price: expect.any(Number),
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      }),
    );
  });

  it('should update cart count', async () => {
    const result = await shoppingCartService.updateCount(3, 1);
    expect(result).toEqual({ count: 3 });
  });

  it('should update cart total price', async () => {
    const part = await boilerPartsService.findOne(1);
    const result = await shoppingCartService.updateTotalPrice(
      part.price * 3,
      1,
    );
    expect(result).toEqual({ totalPrice: part.price * 3 });
  });

  it('should delete cart item', async () => {
    await shoppingCartService.remove(1);
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.part_id === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await shoppingCartService.removeAll(user.id);

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
