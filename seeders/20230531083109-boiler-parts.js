'use strict';
const { faker } = require('@faker-js/faker');

const boilerManufacturers = [
  'Ariston',
  'Chaffonteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];

const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'BoilerParts',
      Array.from({ length: 100 }, () => ({
        boiler_manufacturer:
          boilerManufacturers[
            Math.floor(Math.random() * boilerManufacturers.length)
          ],
        parts_manufacturer:
          partsManufacturers[
            Math.floor(Math.random() * partsManufacturers.length)
          ],
        price: faker.string.numeric(4),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify(
          Array.from(
            { length: 2 },
            () =>
              `${faker.image.urlLoremFlickr({
                category: 'technics',
              })}?random=${faker.string.numeric(30)}`,
          ),
        ),
        vendor_code: faker.internet.password(),
        in_stock: faker.string.numeric(1),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.string.numeric(3),
        compatibility: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BoilerParts', null, {});
  },
};
