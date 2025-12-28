"use server";

import prisma from "@/lib/prisma";
import { authSession } from "@/lib/auth-utils";

export const upvotePost = async (postId: number) => {
  const session = await authSession();
  if (!postId || !session?.user.id) return;

  try {
    const response = await prisma.vote.create({
      data: {
        postId,
        userId: session?.user.id,
        targetType: "POST",
        commentId: null,
        voteType: "UPVOTE",
      },
    });

    if (!response) {
      throw new Error("Failed to upvote post");
    }
  } catch (error) {
    console.error("Error upvoting post:", error);
  }
};

export const upVoteComment = async (commentId: number) => {
  const session = await authSession();
  if (!commentId || !session?.user.id) return;
  
  try {
    const response = await prisma.vote.create({
      data: {
        commentId,
        userId: session?.user.id,
        targetType: "COMMENT",
        postId: null,
        voteType: "UPVOTE",
      },
    });

    if (!response) {
      throw new Error("Failed to upvote comment");
    }
  } catch (error) {
    console.error("Error upvoting comment:", error);
  }
};

export async function getUser() {
  try {
    const session = await authSession();
    
    if (!session?.user?.id) {
      console.log("getUser: No session or user ID");
      return null; 
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    return user;
  } 
  catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}

export async function getPostComments(id: number){
  const comments = await prisma.comment.findMany({
    where: {
      postId: id,
      parentId: null, // only top-level comments
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      children: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return comments;
}
