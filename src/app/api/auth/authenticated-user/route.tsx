import { NextResponse } from 'next/server';

export async function GET() {
  try {
  } catch (error) {
    console.log('[GET_USER_AUTHENTICATED_ERROR]', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
