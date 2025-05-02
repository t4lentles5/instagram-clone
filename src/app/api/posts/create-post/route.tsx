import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    const userId = formData.get('userId') as string;

    if (!files.length || !userId) {
      return NextResponse.json(
        { error: 'Missing images or userId' },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Upload received!' });
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
