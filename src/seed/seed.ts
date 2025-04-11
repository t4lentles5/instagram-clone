interface User {
  email: string;
  fullname: string;
  username: string;
  password: string;
  profile_photo: string;
}

interface Post {
  caption: string;
  imagesUrl: string[];
  userUsername: string;
}

interface SeedData {
  users: User[];
  posts: Post[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'correo1@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_1',
      password: '123456',
      profile_photo: '/profile_photos/photo_1.jpg',
    },
    {
      email: 'correo2@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_2',
      password: '123456',
      profile_photo: '/profile_photos/photo_2.webp',
    },
    {
      email: 'correo3@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_3',
      password: '123456',
      profile_photo: '/profile_photos/photo_3.webp',
    },
    {
      email: 'correo4@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_4',
      password: '123456',
      profile_photo: '/profile_photos/photo_4.png',
    },
    {
      email: 'correo5@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_5',
      password: '123456',
      profile_photo: '/profile_photos/photo_5.jpg',
    },
    {
      email: 'correo6@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_6',
      password: '123456',
      profile_photo: '/profile_photos/photo_6.webp',
    },
    {
      email: 'correo7@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_7',
      password: '123456',
      profile_photo: '/profile_photos/photo_7.jpg',
    },
    {
      email: 'correo8@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_8',
      password: '123456',
      profile_photo: '/profile_photos/photo_8.webp',
    },
    {
      email: 'correo9@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_9',
      password: '123456',
      profile_photo: '/profile_photos/photo_9.jpg',
    },
    {
      email: 'correo10@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_10',
      password: '123456',
      profile_photo: '/profile_photos/photo_10.jpg',
    },
  ],
  posts: [
    {
      caption: 'Post 1 👍',
      imagesUrl: ['/post_images/post_1.jpg'],
      userUsername: 'omar_1',
    },
    {
      caption: 'Post 2 👍',
      imagesUrl: ['/post_images/post_2.jpg'],
      userUsername: 'omar_1',
    },
    {
      caption: 'Post 3 👍',
      imagesUrl: ['/post_images/post_3.jpg'],
      userUsername: 'omar_1',
    },
    {
      caption: 'Post 4 👍',
      imagesUrl: ['/post_images/post_4.jpg'],
      userUsername: 'omar_1',
    },
    {
      caption: 'Post 5 👍',
      imagesUrl: ['/post_images/post_5.jpg'],
      userUsername: 'omar_1',
    },
    {
      caption: 'Post 2 👍',
      imagesUrl: ['/post_images/post_2.jpg', '/post_images/post_2.jpg'],
      userUsername: 'omar_2',
    },
    {
      caption: 'Post 3 👍',
      imagesUrl: ['/post_images/post_3.jpg'],
      userUsername: 'omar_3',
    },
    {
      caption: 'Post 4 👍',
      imagesUrl: ['/post_images/post_4.jpg'],
      userUsername: 'omar_4',
    },
    {
      caption: 'Post 5 👍',
      imagesUrl: ['/post_images/post_5.jpg'],
      userUsername: 'omar_5',
    },
    {
      caption: 'Post 6 👍',
      imagesUrl: ['/post_images/post_6.jpg'],
      userUsername: 'omar_6',
    },
    {
      caption: 'Post 7 👍',
      imagesUrl: ['/post_images/post_7.jpg'],
      userUsername: 'omar_7',
    },
    {
      caption: 'Post 8 👍',
      imagesUrl: ['/post_images/post_8.jpg'],
      userUsername: 'omar_8',
    },
    {
      caption: 'Post 9 👍',
      imagesUrl: ['/post_images/post_9.jpg'],
      userUsername: 'omar_9',
    },
    {
      caption: 'Post 10 👍',
      imagesUrl: ['/post_images/post_10.jpg'],
      userUsername: 'omar_10',
    },
  ],
};
