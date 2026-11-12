import { NextResponse } from 'next/server';
import { users } from '@/lib/store';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
    });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}