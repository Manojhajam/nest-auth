import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateVisitorDocumentDto } from './dto/create-visitor-document.dto';
import { UpdateVisitorDocumentDto } from './dto/update-visitor-document.dto';
import { QueryVisitorDocumentDto } from './dto/query-visitor-document.dto';
import { VisitorDocument } from './entities/visitor_document.entity';

@Injectable()
export class VisitorDocumentService {
  constructor(
    @Inject('VISITOR_DOCUMENTS_REPOSITORY')
    private readonly repo: typeof VisitorDocument,
  ) {}

  async create(dto: CreateVisitorDocumentDto, filePath?: string) {
    const data = await this.repo.create({
      ...dto,
      file_path: filePath || dto.file_path,
    } as VisitorDocument);
    return {
      message: 'Document uploaded successfully',
      data,
    };
  }

  async findAll(query: QueryVisitorDocumentDto) {
    const { page = 1, limit = 10, search, visitor_id } = query;
    const offset = (page - 1) * limit;

    const where: any = {};

    if (visitor_id) {
      where.visitor_id = visitor_id;
    }

    if (search) {
      where[Op.or] = [
        { document_number: { [Op.iLike]: `%${search}%` } },
        { document_type: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows: data, count: total } = await this.repo.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      message: 'Documents retrieved successfully',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const data = await this.repo.findByPk(id);
    if (!data) {
      throw new NotFoundException('Document not found');
    }
    return data;
  }

  async update(id: number, dto: UpdateVisitorDocumentDto) {
    await this.repo.update(dto, { where: { id } });
    return {
      message: 'Document updated successfully',
      data: await this.findOne(id),
    };
  }

  async verify(id: number, verifiedBy: number) {
    const doc = await this.findOne(id);
    await doc.update({
      is_verified: true,
      verified_at: new Date(),
      verified_by: verifiedBy,
    });
    return {
      message: 'Document verified successfully',
      data: doc,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.destroy({ where: { id } });
    return {
      message: 'Document deleted successfully',
    };
  }
}
