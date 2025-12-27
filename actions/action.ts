"use server";

import prisma from "@/lib/prisma";
import { getSession } from "better-auth/api";

export const upvotePost = async (postId: number,userId:string) => {
  if (!postId || !userId) return;
  
  try {
    const response = await prisma.vote.create({
        data: {
          postId,
          userId: userId,
          targetType: 'POST',
          commentId : null,
          voteType : 'UPVOTE'
        },
    });
    
    if(!response){
      throw new Error('Failed to upvote post');
    }
    
  } catch (error) {
    console.error('Error upvoting post:', error);
  }
};


export async function fetchUser(){
  const user = await prisma.user.findMany();
  return user;
}

export async function getUser(){
  const session =  getSession();
  console.log("session", session);
  
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });
  return user;
}
