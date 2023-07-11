import { join } from 'path';
import { existsSync } from 'fs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticImage(imageName: string) {
    const path = join(__dirname, '../../static/uploads/', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(`No file with name ${imageName}`);
    }

    return path;
  }
}
