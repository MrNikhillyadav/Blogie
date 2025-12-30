"use server";

import prisma from "@/lib/prisma";
import { authSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

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
      where: { id: session.user.id },
    });

    return user;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}

export async function getPostComments(id: number) {
  return await prisma.comment.findMany({
    where: {
      postId: id,
      parentId: null,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      votes: {
        select: { id: true, voteType: true },
      },
      children: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          votes: {
            select: { id: true, voteType: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}


export async function commentOnPost(postId: number, content: string) { 
  const session = await authSession();
  if (!session?.user.id || !content?.trim()) return;

  try {
    console.log("creating top-level comment...");
    const response = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        postId,
        parentId: null,  // Top-level comment
        upVotes: 0,
        downVotes: 0,
        repliesCount: 0
      }
    });
    
    console.log('comment created:', response.id);
    
    revalidatePath(`/posts/${postId}`);
    revalidatePath('/');  
    
    return { success: true, commentId: response.id };
  } 
  catch (error) {
    
    console.error("Error creating comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
}

export async function replyToCommentAction(formData: FormData) {
  
  const commentId = Number(formData.get("commentId"));
  const postId = Number(formData.get("postId"));
  const content = (formData.get("content") as string)?.trim();
  
  if (!content) return { success: false };
  
  const session = await authSession();
  if (!session?.user.id) return { success: false };
  
  try {
    const response = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        postId,
        parentId: commentId,
        upVotes: 0,
        downVotes: 0,
        repliesCount: 0
      }
    });
    
    revalidatePath(`/posts/${postId}`);
    return { success: true, commentId: response.id };
  } catch (error) {
    console.error("Reply error:", error);
    return { success: false };
  }
}

