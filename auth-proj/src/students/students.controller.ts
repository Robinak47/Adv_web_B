import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Public } from 'src/auth/public.decorator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('students')
  @Public()
  getStudents() {
    return 'meow';
  }
}
