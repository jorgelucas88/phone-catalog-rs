import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';


@Injectable()
export class PhoneCatalogService {

  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>
    ) { }

  public async createPhone(phone: Phone) {
    return await this.phoneRepository.save(phone);
  }

  public async getPhones(page: number, pageSize: number): Promise<{ total: number, phones: Phone[] }> {
    
    const phones: Phone[] = 
      await this.phoneRepository
        .createQueryBuilder("Phone")
        .select() // *
        .where("deletedAt is null")
        .orderBy("id", "DESC")
        .take(pageSize)
        .skip(page * pageSize)
        .getMany();
    const phoneCount: Phone[] = 
      await this.phoneRepository
        .createQueryBuilder("Phone")
        .select() // *
        .where("deletedAt is null")
        .getMany();

    return { total: phoneCount.length, phones: phones };

  }

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
    return await this.phoneRepository
      .createQueryBuilder()
      .update(Phone)
      .set(phone)
      .where("id = :id", { id: phone.id })
      .execute();
  }
}
