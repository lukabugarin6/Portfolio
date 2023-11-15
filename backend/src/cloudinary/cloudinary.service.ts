import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImages(
    files: Express.Multer.File[],
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<UploadApiResponse | UploadApiErrorResponse>(
          (resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            );

            toStream(file.buffer).pipe(upload);
          },
        ),
    );

    return Promise.all(uploadPromises);
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
