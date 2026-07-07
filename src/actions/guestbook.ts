"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const dataFilePath = path.join(process.cwd(), "data", "guestbook.json");

export async function getGuestbookMessages() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading guestbook data:", error);
    return [];
  }
}

export async function addGuestbookMessage(name: string, message: string) {
  try {
    let messages = [];
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8");
      messages = JSON.parse(fileContents);
    }
    
    const newMsg = {
      id: Date.now(),
      name: name,
      message: message,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      bgColor: "bg-[#3a1d1d]",
      doodles: "absolute left-1/4 bottom-1/4 text-orange-500/20 text-5xl font-serif rotate-45",
      doodle2: "absolute right-1/4 top-1/4 w-16 h-16 border-2 border-orange-500/20 rounded-lg -rotate-12",
      avatarBg: "bg-orange-500"
    };

    const updatedMessages = [newMsg, ...messages];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedMessages, null, 2), "utf8");
    
    revalidatePath("/guestbook");
    
    return { success: true, message: newMsg };
  } catch (error) {
    console.error("Error saving guestbook data:", error);
    return { success: false, error: "Failed to save message" };
  }
}
