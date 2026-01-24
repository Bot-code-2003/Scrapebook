import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    // Expect access_token now instead of credential
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ success: false, message: 'No access token provided' }, { status: 400 });
    }

    // Verify token and get user info by calling Google API directly
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!googleRes.ok) {
        return NextResponse.json({ success: false, message: 'Invalid access token' }, { status: 400 });
    }

    const userData = await googleRes.json();
    const { email, name, sub: googleId, picture } = userData;

    if (!email) {
         return NextResponse.json({ success: false, message: 'Google account has no email' }, { status: 400 });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      
      user = await User.create({
        name,
        email,
        password: randomPassword,
        image: picture,
      });
    } else if (picture && user.image !== picture) {
        // Update image if it changed
        user.image = picture;
        await user.save();
    }

    // Generate our app's JWT token
    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Google login successful!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
