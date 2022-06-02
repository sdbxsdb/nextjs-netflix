import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';

export async function middleware(req, ev) {
  console.log({req, ev});

  const token = context.req ? cookies?.token : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl.clone();

  if (token && userId || pathname.includes(`/api/login`) || pathname.includes('/static'))    
  {
    return NextResponse.next();
  }

  if (!token && pathname !== `/login`) {
    return NextResponse.redirect(`/login`);
  }

}