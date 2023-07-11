import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

const maxMBSize = 2;
const validExtensions = /(jpg|jpeg|png|webp|gif)$/;

export const imageValidator = {
  validators: [
    new MaxFileSizeValidator({
      maxSize: maxMBSize * 1000000,
      message: (maxSize) =>
        `Validation failed (expected size is less than ${
          maxSize / 1000000
        } MB)`,
    }),
    new FileTypeValidator({ fileType: validExtensions }),
  ],
};
