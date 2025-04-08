import { changeProfilePhoto } from '@/actions/user/change-profile-photo';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const username = formData.get('username') as string;

  if (!file || !username) {
    return NextResponse.json(
      { error: 'Missing image or username' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = buffer.toString('base64');

  const response = await changeProfilePhoto(base64Image, username);

  return NextResponse.json(response);
}
