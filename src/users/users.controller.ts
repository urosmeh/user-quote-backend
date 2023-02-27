import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserWithQuoteDto } from './dtos/user-with-quote.dto';
import { UsersService } from './users.service';
import { diskStorage } from 'multer';
import path = require('path');
import { UploadedFile } from '@nestjs/common/decorators';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename = path.parse(file.originalname).name;
      const extension = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Serialize(UserWithQuoteDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  setUserAvatar(@UploadedFile() file, @Request() req, @Param('id') id: string) {
    return this.usersService.setUserAvatar(parseInt(id), file.filename);
  }

  @Get('/avatar/:filename')
  findAvatar(@Param('filename') filename, @Res() res) {
    return res.sendFile(
      join(process.cwd(), 'uploads/profileimages/' + filename),
    );
  }
}
