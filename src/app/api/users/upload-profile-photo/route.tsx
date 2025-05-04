import { NextResponse } from 'next/server';
import { changeProfilePhoto } from '@/features/profile/actions/change-profile-photo';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const username = formData.get('username') as string;
    const profile_photo_id = formData.get('profile_photo_id') as string;

    if (!file || !username) {
      return NextResponse.json(
        { error: 'Missing image or username' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const response = await changeProfilePhoto(
      base64Image,
      username,
      profile_photo_id,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
