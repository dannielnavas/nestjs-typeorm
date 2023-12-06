import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
