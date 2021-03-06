import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { fstat } from 'fs';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
const fs = require('fs')

@Injectable()
export class PhoneCatalogService {

  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>
    ) { }

  public async createPhone(phone: Phone) {
    return await this.phoneRepository.save(phone);
  }

  public async getPhones(page: number, pageSize: number, searchTerm?: string): Promise<{ total: number, phones: Phone[] }> {
    searchTerm = searchTerm?.trim() || "";
    const phones: Phone[] = // actual data
      await this.phoneRepository
        .createQueryBuilder("Phone")
        .select() // *
        .where("(deletedAt is null) and (name like :name or manufacturer like :manufacturer or description like :description or color like :color or price like :price or screen like :screen or processor like :processor or ram like :ram)", {
          name: `%${searchTerm}%`,
          manufacturer:`%${searchTerm}%`,
          description:`%${searchTerm}%`,
          color:`%${searchTerm}%`,
          price:`%${searchTerm}%`,
          screen:`%${searchTerm}%`,
          processor:`%${searchTerm}%`,
          ram: `%${searchTerm}%`,
        })
        .orderBy("id", "DESC")
        .take(pageSize)
        .skip(page * pageSize)
        .getMany();
    const phoneCount: Phone[] = // count for pagination purposes in frontend
      await this.phoneRepository
        .createQueryBuilder("Phone")
        .select() // *
        .where("(deletedAt is null) and (name like :name or manufacturer like :manufacturer or description like :description or color like :color or price like :price or screen like :screen or processor like :processor or ram like :ram)", {
          name: `%${searchTerm}%`,
          manufacturer:`%${searchTerm}%`,
          description:`%${searchTerm}%`,
          color:`%${searchTerm}%`,
          price:`%${searchTerm}%`,
          screen:`%${searchTerm}%`,
          processor:`%${searchTerm}%`,
          ram: `%${searchTerm}%`,
        })
        .getMany();
  
    phones.forEach(p => {
      p = p.imageFilename ? p["image"] = fs.readFileSync(`./phoneImages/${p.imageFilename}`, { encoding: 'base64'}) : ""
    });
    return { total: phoneCount.length, phones: phones };

  }

  public async 

  public async deletePhone(phoneId: number) {
    return await this.phoneRepository
      .createQueryBuilder()
      .update(Phone)
      .set({
        deletedAt: new Date()
      })
      .where("id = :id", { id: phoneId })
      .execute()
      ;
  }
  
  public async updatePhone(phone: Phone) {
    phone.updatedAt = new Date();
    console.log(phone, "updatePhone");
    return await this.phoneRepository
      .createQueryBuilder()
      .update(Phone)
      .set(phone)
      .where("id = :id", { id: phone.id })
      .execute();
  }

  public async deletePhoneImage(phoneId: number) {
    const phone: Phone = await this.phoneRepository.findOne(phoneId);
    await fs.unlink(`./phoneImages/${phone.imageFilename}`, (r) => { console.log(r) });

    return await this.phoneRepository
      .createQueryBuilder()
      .update(Phone)
      .set({
        updatedAt: new Date(),
        imageOriginalFileName: null,
        imageFilename: null
      })
      .where("id = :id", { id: phoneId })
      .execute()
      ;
  }
}
