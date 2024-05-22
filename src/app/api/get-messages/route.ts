import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import UserModel from '@/models/Users';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id);
try {
  const user = await UserModel.aggregate([
    { $match: { _id: userId } },
    { 
      $project: { 
        _id: 1,
        messages: 1 
      }
    },
    { 
      $unwind: { 
        path: '$messages',
        preserveNullAndEmptyArrays: true // This ensures that users with empty messages arrays are included.
      } 
    },
    { 
      $sort: { 
        'messages.createdAt': -1 
      } 
    },
    { 
      $group: { 
        _id: '$_id', 
        messages: { $push: '$messages' } 
      } 
    },
    { 
      $project: { 
        _id: 0, 
        messages: 1 
      } 
    }
  ]).exec();

  if (!user || user.length === 0) {
    return Response.json(
      { message: 'User not found', success: false },
      { status: 404 }
    );
  }

  // If the user exists but has no messages, return an empty array of messages.
  const messages = user[0].messages.filter((msg:any) => msg !== null);

  return Response.json(
    { messages: messages },
    {
      status: 200,
    }
  );
} catch (error) {
  console.error('An unexpected error occurred:', error);
  return Response.json(
    { message: 'Internal server error', success: false },
    { status: 500 }
  );
}
}