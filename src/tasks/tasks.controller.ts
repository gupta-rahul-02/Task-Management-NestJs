import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { query } from 'express';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if we have any filter defined , call taskService.getTasksWithFilter
    //otherwise, just get all tasks

    if(Object.keys(filterDto).length){
      return this.taskService.getTasksWithFilter(filterDto)
    }else{
      return this.taskService.getAllTasks();
    }
    
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string){
   this.taskService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id:string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Task {
      const {status} = updateTaskStatusDto
      return this.taskService.updateTaskStatus(id,status)

  }
  
}
