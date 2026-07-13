import { Inject, Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitors } from './entities/visitor.entity';

@Injectable()
export class VisitorService {
  constructor(
    @Inject('VISITORS_REPOSITORY')
    private readonly visitorsRepository: typeof Visitors,
  ) {}

  async create(createVisitorDto: CreateVisitorDto) {
    const data = await this.visitorsRepository.create(
      createVisitorDto as Visitors,
    );
    return {
      message: 'Visitor created successfully',
      data: data,
    };
  }

  findAll() {
    const data = this.visitorsRepository.findAll();
    return data;
  }

  findOne(id: number) {
    const data = this.visitorsRepository.findByPk(id);
    return data;
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    const data = await this.visitorsRepository.update(updateVisitorDto, {
      where: { id },
    });
    return {
      message: 'Visitor updated successfully',
      data: await this.findOne(id),
    };
  }

  async remove(id: number) {
    const data = await this.visitorsRepository.destroy({ where: { id } });
    return {
      message: 'Visitor deleted successfully',
    };
  }
}
