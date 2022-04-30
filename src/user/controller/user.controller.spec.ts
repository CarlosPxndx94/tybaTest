import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TypeORMExceptionFilter } from 'src/filters/typeorm-exceptions.filter';
import * as request from 'supertest';
import { UserDto } from '../dto/user.dto';
import { UserModule } from '../user.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new TypeORMExceptionFilter());
    await app.init();
  });

  it('users CRUD', async () => {
    const server = request(app.getHttpServer());

    const currentGetAllRequest = await server.get('/users').expect(200);
    const currentSize = currentGetAllRequest.body.length;

    const newUser: UserDto = {
      name: 'Carlos',
      lastName: 'Balcazar',
    };

    const newUserRequest = await server
      .post('/users')
      .type('form')
      .send(newUser)
      .expect(201);

    expect(newUserRequest.body.name).toBe(newUser.name);

    await server.post('/users').type('form').send(newUser).expect(400);

    expect(newUserRequest.body.id).toBe('' + currentSize);
    const postNewRequest = await server.get('/users').expect(200);
    const postNewSize = postNewRequest.body.length;
    expect(postNewSize).toBe(currentSize + 1);

    const id = newUserRequest.body.id;
    const getUserByIdRequest = await server.get(`/users/${id}`).expect(200);
    expect(getUserByIdRequest.body.id).toBe(id);

    const updateUser: UserDto = {
      id: newUserRequest.body.id,
      name: 'Mateo',
      lastName: 'Aguilera',
    };

    const updateUserRequest = await server
      .put(`/users/${updateUser.id}`)
      .expect(200)
      .type('form')
      .send(updateUser);
    expect(updateUserRequest.body.name).toEqual(updateUser.name);

    await server.delete(`/users/${updateUser.id}`).expect(200);
    const postDeleteGetAllRequest = await server.get('/users').expect(200);
    const postDeleteSize = postDeleteGetAllRequest.body.length;
    expect(postDeleteSize).toBe(currentSize);
  });
});
