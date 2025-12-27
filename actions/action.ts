"use server";

import prisma from "@/lib/prisma";
import { getSession } from "better-auth/api";

export const upvotePost = async (postId: number, userId: string) => {
  if (!postId || !userId) return;

  try {
    const response = await prisma.vote.create({
      data: {
        postId,
        userId: "DGX35Dz2QgdFxmH6tFk5BimUaHqMjb0x",
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

export const upVoteComment = async (commentId: number, userId: string) => {
  if (!commentId || !userId) return;

  try {
    const response = await prisma.vote.create({
      data: {
        commentId,
        userId: "DGX35Dz2QgdFxmH6tFk5BimUaHqMjb0x",
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
  const session = getSession();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });
  return user;
}

export async function getPostComments(id: number){
  const comments = await prisma.comment.findMany({
     where: {
       postId: id,
       parentId: null,              // only top-level comments
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
  
  console.log("comments", JSON.stringify(comments))
  return comments ;
} 

