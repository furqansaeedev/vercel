import { NextResponse } from 'next/server';
import { users } from '@/lib/store';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (users.find((u) => u.email === email)) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    users.push({ name, email, password });
    return NextResponse.json({ message: 'Registered successfully' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}