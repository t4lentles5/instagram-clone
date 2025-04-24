interface User {
  email: string;
  fullname: string;
  username: string;
  password: string;
  profile_photo: string;
  bio: string;
}

interface Post {
  caption?: string;
  imagesUrl: string[];
  userUsername: string;
  aspect_ratio: 'original' | 'square' | 'portrait' | 'video';
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
      bio: 'Bio 👍',
    },
    {
      email: 'correo2@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_2',
      password: '123456',
      profile_photo: '/profile_photos/photo_2.webp',
      bio: 'Bio 👍',
    },
    {
      email: 'correo3@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_3',
      password: '123456',
      profile_photo: '/profile_photos/photo_3.webp',
      bio: 'Bio 👍',
    },
    {
      email: 'correo4@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_4',
      password: '123456',
      profile_photo: '/profile_photos/photo_4.png',
      bio: 'Bio 👍',
    },
    {
      email: 'correo5@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_5',
      password: '123456',
      profile_photo: '/profile_photos/photo_5.jpg',
      bio: 'Bio 👍',
    },
    {
      email: 'correo6@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_6',
      password: '123456',
      profile_photo: '/profile_photos/photo_6.webp',
      bio: 'Bio 👍',
    },
    {
      email: 'correo7@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_7',
      password: '123456',
      profile_photo: '/profile_photos/photo_7.jpg',
      bio: 'Bio 👍',
    },
    {
      email: 'correo8@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_8',
      password: '123456',
      profile_photo: '/profile_photos/photo_8.webp',
      bio: 'Bio 👍',
    },
    {
      email: 'correo9@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_9',
      password: '123456',
      profile_photo: '/profile_photos/photo_9.jpg',
      bio: 'Bio 👍',
    },
    {
      email: 'correo10@correo.com',
      fullname: 'Omar Obregon',
      username: 'omar_10',
      password: '123456',
      profile_photo: '/profile_photos/photo_10.jpg',
      bio: 'Bio 👍',
    },
  ],
  posts: [
    {
      caption: 'Post 1 👍',
      imagesUrl: [
        '/post_images/image_1.jpg',
        '/post_images/image_11.png',
        '/post_images/image_12.png',
      ],
      userUsername: 'omar_1',
      aspect_ratio: 'square',
    },
    {
      caption: 'Post 2 👍',
      imagesUrl: ['/post_images/image_2.jpg', '/post_images/image_1.jpg'],
      userUsername: 'omar_1',
      aspect_ratio: 'portrait',
    },
    {
      caption: 'Post 3 👍',
      imagesUrl: ['/post_images/image_3.jpg', '/post_images/image_4.jpg'],
      userUsername: 'omar_1',
      aspect_ratio: 'video',
    },
    {
      caption: 'Post 4 👍',
      imagesUrl: ['/post_images/image_4.jpg', '/post_images/image_7.jpg'],
      userUsername: 'omar_1',
      aspect_ratio: 'original',
    },
    {
      caption: 'Post 5 👍',
      imagesUrl: ['/post_images/image_5.jpg'],
      userUsername: 'omar_1',
      aspect_ratio: 'original',
    },
    {
      caption: 'Post 2 👍',
      imagesUrl: ['/post_images/image_2.jpg', '/post_images/image_2.jpg'],
      userUsername: 'omar_2',
      aspect_ratio: 'video',
    },
    {
      caption: 'Post 3 👍',
      imagesUrl: [
        '/post_images/image_3.jpg',
        '/post_images/image_1.jpg',
        '/post_images/image_2.jpg',
      ],
      userUsername: 'omar_3',
      aspect_ratio: 'original',
    },
    {
      caption: 'Post 4 👍',
      imagesUrl: ['/post_images/image_4.jpg'],
      userUsername: 'omar_4',
      aspect_ratio: 'portrait',
    },
    {
      caption: 'Post 5 👍',
      imagesUrl: ['/post_images/image_5.jpg'],
      userUsername: 'omar_5',
      aspect_ratio: 'original',
    },
    {
      caption: 'Post 6 👍',
      imagesUrl: ['/post_images/image_6.jpg'],
      userUsername: 'omar_6',
      aspect_ratio: 'portrait',
    },
    {
      caption: 'Post 7 👍',
      imagesUrl: ['/post_images/image_7.jpg'],
      userUsername: 'omar_7',
      aspect_ratio: 'video',
    },
    {
      caption: 'Post 8 👍',
      imagesUrl: ['/post_images/image_8.jpg'],
      userUsername: 'omar_8',
      aspect_ratio: 'original',
    },
    {
      caption: 'Post 9 👍',
      imagesUrl: ['/post_images/image_9.jpg'],
      userUsername: 'omar_9',
      aspect_ratio: 'portrait',
    },
    {
      caption: 'Post 10 👍',
      imagesUrl: ['/post_images/image_10.jpg'],
      userUsername: 'omar_10',
      aspect_ratio: 'video',
    },
    {
      imagesUrl: ['/post_images/image_13.jpg'],
      userUsername: 'omar_10',
      aspect_ratio: 'original',
    },
  ],
};
