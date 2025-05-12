import { NextResponse } from 'next/server';
import sharp from 'sharp';

import prisma from '@/core/config/prisma';
import { createPost } from '@/features/posts/actions/create-post';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    const caption = formData.get('caption') as string;
    const userId = formData.get('userId') as string;
    const aspect_ratio = formData.get('aspect_ratio') as
      | 'original'
      | 'square'
      | 'portrait'
      | 'video';

    if (!files.length || !userId) {
      return NextResponse.json(
        { error: 'Missing images or userId' },
        { status: 400 },
      );
    }

    const firstImageBuffer = Buffer.from(await files[0].arrayBuffer());
    const metadata = await sharp(firstImageBuffer).metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { error: 'Invalid image dimensions' },
        { status: 400 },
      );
    }

    const firstImageDimensions = `${metadata.width}/${metadata.height}`;

    const post = await prisma.post.create({
      data: {
        caption,
        authorId: userId,
        aspect_ratio: aspect_ratio,
        first_image_dimensions: firstImageDimensions,
      },
    });

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Body = buffer.toString('base64');
      const mimeType = file.type;
      const base64Image = `data:${mimeType};base64,${base64Body}`;

      const uploadData = await createPost(base64Image, post.id);

      if (uploadData.error) {
        throw new Error(uploadData.error);
      }
    }

    return NextResponse.json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('[CREATE_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
