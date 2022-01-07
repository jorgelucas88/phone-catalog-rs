import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneCatalogController } from './phonecatalog/phonecatalog.controller';
import { PhoneCatalogModule } from './phonecatalog/phonecatalog.module';
import { PhoneCatalogService } from './phonecatalog/phonecatalog.service';

@Module({
  imports: [PhoneCatalogModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
   }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
