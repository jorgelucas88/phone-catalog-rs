import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhoneCatalogService } from './phonecatalog.service';

@Controller("phones")
export class PhoneCatalogController {
  constructor(private readonly phoneCatalogService: PhoneCatalogService) {}

  @Get()
  async getPhones(@Req() req) {
    const page: number = req.query.page || 0;
    const pageSize: number = req.query.pageSize || 15;
    return await this.phoneCatalogService.getPhones(page, pageSize);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './phoneImages',
      }),
    }),
  )
  async createPhone(@UploadedFile() image: Express.Multer.File, @Body() body) {
    body = !body.data ? { data: JSON.parse(JSON.stringify(body)) } : body;
    return await this.phoneCatalogService.createPhone({
      id: null,
      dateAdded: new Date(),
      name: body.data.name,
      manufacturer: body.data.manufacturer,
      description: body.data.description,
      color: body.data.color,
      price: body.data.price,
      imageOriginalFileName: image?.originalname,
      imageFilename: image?.filename,
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './phoneImages',
      }),
    }),
  )
  async updatePhone(@UploadedFile() image: Express.Multer.File, @Body() body) {
    body = !body.data ? { data: JSON.parse(JSON.stringify(body)) } : body;
    console.log(image, body);
    return await this.phoneCatalogService.updatePhone({
      id: body.data.id,
      name: body.data.name,
      manufacturer: body.data.manufacturer,
      description: body.data.description,
      color: body.data.color,
      price: body.data.price,
      imageOriginalFileName: image?.originalname,
      imageFilename: image?.filename,
      screen: body.data.screen,
      processor: body.data.processor,
      ram: body.data.ram,
      updatedAt: new Date()
    });
  }

  @Delete("image/:id")
  async deletePhoneImage(@Param('id') id: number) {
    return await this.phoneCatalogService.deletePhoneImage(id);
  }
}
