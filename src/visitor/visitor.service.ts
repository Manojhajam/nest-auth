import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { QueryVisitorDto } from './dto/query-visitor.dto';
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

  async findAll(query: QueryVisitorDto) {
    const { page = 1, limit = 10, search } = query;
    const offset = (page - 1) * limit;

    const where = search
      ? {
          [Op.or]: [
            { full_name: { [Op.iLike]: `%${search}%` } },
            { address: { [Op.iLike]: `%${search}%` } },
            { phone: { [Op.iLike]: `%${search}%` } },
            { citizenship_no: { [Op.iLike]: `%${search}%` } },
            { purpose_of_visit: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { rows: data, count: total } =
      await this.visitorsRepository.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

    return {
      message: 'Visitors retrieved successfully',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
