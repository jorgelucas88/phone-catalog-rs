import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhoneCatalogService } from './phonecatalog.service';

@Controller("phones")
export class PhoneCatalogController {
  constructor(private readonly phoneCatalogService: PhoneCatalogService) {}

  @Get()
  async getPhones(@Req() req) {
    const page: number = req.query.page;
    const pageSize: number = req.query.pageSize;
    return await this.phoneCatalogService.getPhones(page, pageSize);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPhone(@UploadedFile() image: Express.Multer.File, @Body() body) {console.log(body);
    return await this.phoneCatalogService.createPhone({
      id: null,
      dateAdded: new Date(),
      name: body.data.name,
      manufacturer: body.data.manufacturer,
      description: body.data.description,
      color: body.data.color,
      price: body.data.price,
      image: image?.buffer,
      screen: body.data.screen,
      processor: body.data.processor,
      ram: body.data.ram,
    });
  }

  @Delete("/:id")
  async deletePhone(@Param('id') id: number) {
    return await this.phoneCatalogService.deletePhone(id);
  }
  @Patch()
  async updatePhone(@Body() body) {console.log(body);
    return await this.phoneCatalogService.updatePhone({
      id: body.data.data.id,
      name: body.data.data.name,
      manufacturer: body.data.data.manufacturer,
      description: body.data.data.description,
      color: body.data.data.color,
      price: body.data.data.price,
      screen: body.data.data.screen,
      processor: body.data.data.processor,
      ram: body.data.data.ram,
      updatedAt: new Date()
    });
  }
}
