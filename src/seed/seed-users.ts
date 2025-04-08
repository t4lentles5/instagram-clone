import bcrypt from 'bcrypt';

interface User {
  email: string;
  fullname: string;
  username: string;
  password: string;
  profile_photo: string;
}

export const users: User[] = [
  {
    email: 'correo1@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_1',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo2@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_2',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo3@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_3',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo4@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_4',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo5@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_5',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo6@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_6',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo7@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_7',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo8@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_8',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo9@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_9',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
  {
    email: 'correo10@correo.com',
    fullname: 'Omar Obregon',
    username: 'omar_10',
    password: bcrypt.hashSync('123456', 10),
    profile_photo: '',
  },
];
