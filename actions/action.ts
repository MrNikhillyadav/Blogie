"use server";
import prisma from "@/lib/prisma";

export async function fetchUser(){
  const user = await prisma.user.findMany();
  return user;
}