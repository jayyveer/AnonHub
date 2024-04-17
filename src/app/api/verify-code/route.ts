import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/Users';
import { verifySchema } from '@/schemas/verifySchema';
import { z } from 'zod';

const VerifyCodeSchema = z.object({
    username: verifySchema,
  });
  

export async function POST(request: Request) {
    // Connect to the database
    await dbConnect();
  
    try {
      const { username, code } = await request.json();
      const decodedUsername = decodeURIComponent(username);
      const user = await UserModel.findOne({ username: decodedUsername });
    //validate with zod
    const result = VerifyCodeSchema.safeParse(code);
    if (!result.success) {
        const verifyErrors = result.error.format()._errors || [];
        return Response.json(
          {
            success: false,
            message:
              verifyErrors?.length > 0
                ? verifyErrors.join(", ")
                : "Invalid code",
          },
          {
            status: 400,
          }
        );
      }
      if (!user) {
        return Response.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
  
      // Check if the code is correct and not expired
      const isCodeValid = user.verifyCode === code;
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
  
      if (isCodeValid && isCodeNotExpired) {
        // Update the user's verification status
        user.isVerified = true;
        await user.save();
  
        return Response.json(
          { success: true, message: 'Account verified successfully' },
          { status: 200 }
        );
      } else if (!isCodeNotExpired) {
        // Code has expired
        return Response.json(
          {
            success: false,
            message:
              'Verification code has expired. Please sign up again to get a new code.',
          },
          { status: 400 }
        );
      } else {
        // Code is incorrect
        return Response.json(
          { success: false, message: 'Incorrect verification code' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      return Response.json(
        { success: false, message: 'Error verifying user' },
        { status: 500 }
      );
    }
  }