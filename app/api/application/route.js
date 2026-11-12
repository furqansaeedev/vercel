import { NextResponse } from 'next/server';
import { applications } from '@/lib/store';

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.fullName || !data.phone || !data.email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    applications.push({ ...data, submittedAt: new Date().toISOString() });
    return NextResponse.json({ message: 'Application submitted' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}