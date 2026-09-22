import { NextResponse } from 'next/server';

export async function GET(request) {
  const adminPassword = request.headers.get('x-admin-password');

  // Verify your admin password (matches your environment variable or default)
  if (adminPassword !== (process.env.ADMIN_PASSWORD || 'MySuperSecretAdminPassword123')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ logs: global.loginLogs || [] });
}
