import { NextResponse } from 'next/server';

export async function GET(request) {
  const secretKey = request.headers.get('x-admin-password');
  const MASTER_PASSWORD = process.env.ADMIN_PASSWORD || 'MySuperSecretAdminPassword123';

  if (secretKey !== MASTER_PASSWORD) {
    return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
  }

  const logs = global.loginLogs || [];
  return NextResponse.json({ logs });
}
