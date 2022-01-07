import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { PhoneCatalogController } from './phonecatalog.controller';
import { PhoneCatalogService } from './phonecatalog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneCatalogController],
  providers: [PhoneCatalogService],
  exports: [],
})
export class PhoneCatalogModule {}
