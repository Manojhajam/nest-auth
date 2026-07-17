import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Request, Response } from 'express';
import { VisitorDocumentService } from './visitor_document.service';
import { CreateVisitorDocumentDto } from './dto/create-visitor-document.dto';
import { UpdateVisitorDocumentDto } from './dto/update-visitor-document.dto';
import { QueryVisitorDocumentDto } from './dto/query-visitor-document.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('visitor-documents')
export class VisitorDocumentController {
  constructor(private readonly service: VisitorDocumentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        const allowedMimes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/jpg',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only PDF, JPEG, and PNG files are allowed'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() dto: CreateVisitorDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    dto.visitor_id = Number(dto.visitor_id);
    return this.service.create(dto, file?.filename);
  }

  
  @Get()
  async findAll(@Query() query: QueryVisitorDocumentDto) {
    return this.service.findAll(query);
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads' });
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVisitorDocumentDto,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id/verify')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async verify(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req['user'] as { id: number };
    return this.service.verify(id, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
