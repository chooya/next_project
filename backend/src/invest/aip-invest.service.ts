import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AipInvest } from './aip-invest.entity';

@Injectable()
export class AipInvestService {
  constructor(
    @InjectRepository(AipInvest)
    private readonly repo: Repository<AipInvest>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Data not found');
    return record;
  }

  create(data: Partial<AipInvest>) {
    const newItem = this.repo.create(data);
    return this.repo.save(newItem);
  }

  async update(id: string, data: Partial<AipInvest>) {
    await this.findOne(id); // 존재 확인
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.repo.remove(record);
  }
}
