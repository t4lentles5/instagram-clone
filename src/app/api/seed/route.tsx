import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { users } from '@/seed/seed-users';
import { changeProfilePhoto } from '@/actions/user/change-profile-photo';
import { deleteAllProfilePhotos } from '@/actions/seed/delete-all-profile-photos';

export async function POST() {
  try {
    await prisma.user.deleteMany();
    await deleteAllProfilePhotos();

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await prisma.user.create({
        data: {
          email: user.email,
          fullname: user.fullname,
          username: user.username,
          password: hashedPassword,
        },
      });

      const filePath = path.join(
        process.cwd(),
        'src',
        'seed',
        'profile_photos',
        path.basename(user.profile_photo),
      );

      try {
        await fs.access(filePath);
        const fileBuffer = await fs.readFile(filePath);
        const base64Image = fileBuffer.toString('base64');

        const uploadData = await changeProfilePhoto(base64Image, user.username);

        if (uploadData.error) {
          throw new Error(uploadData.error);
        }
      } catch (uploadError) {
        console.error(
          `Error uploading photo for ${user.username}:`,
          uploadError,
        );
      }
    }

    return NextResponse.json(
      { message: 'Seed executed successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[SEED_ERROR]', error);
    return NextResponse.json(
      { message: 'Failed to execute seed' },
      { status: 500 },
    );
  }
}
