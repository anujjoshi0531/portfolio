"use client";

import { config } from "@/lib/constant";
import dynamic from "next/dynamic";
import "chatui/dist/chatui.css";
import { MessageCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";

const PopupChatbot = dynamic(
  () => import("chatui").then((mod) => mod.PopupChatbot),
  { ssr: false }
);
  
export default function ChatbotProvider() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  if (!userId) return null;

  return (
    <PopupChatbot
      url={config.CHATBOT_URL}
      apiKey={config.CHATBOT_API_KEY}
      position="bottom-right"
      header={{
        show: true,
        title: "Portfolio Assistant",
        avatar: "/icon.webp",
        allowMaximize: true,
      }}
      footer={{
        show: true,
        subtitle: "Portfolio Guide",
      }}
      placeholder="Ask me about my information..."
      stream={true}
      userId={userId}
      buttonStyle={{
        width: "45px",
        height: "45px",
      }}
      defaultOpen={false}
      width={450}
      height={600}
      tooltip="Chat with AI"
    >
      <MessageCircleIcon size={24} />
    </PopupChatbot>
  );
}
