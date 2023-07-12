import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileNamer, imageValidator } from './helpers';
import { ConfigService } from '@nestjs/config';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':imageName')
  findImage(
    @Res()
    res: Response,
    @Param('imageName')
    imageName: string,
  ) {
    const path = this.filesService.getStaticImage(imageName);

    res.sendFile(path);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(new ParseFilePipe(imageValidator))
    file: Express.Multer.File,
  ) {
    const secureUrl = `${this.configService.get('HOST_API')}/v1/files/${
      file.filename
    }`;
    return { secureUrl };
  }
}
