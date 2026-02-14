"use client";

import { config } from "@/lib/constant";
import dynamic from "next/dynamic";
import "chatui/dist/chatui.css";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";
import { MagnetBtn } from "@/components/animate/MagnetBtn";

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
      buttonClassName="bg-transparent hover:bg-transparent shadow-none p-0 border-none hover:scale-100"
      buttonStyle={{
        width: "auto",
        height: "auto",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
      defaultOpen={false}
      width={450}
      height={600}
    >
      <MagnetBtn text="Chat with AI&nbsp;&nbsp;·&nbsp;&nbsp;ASK AI&nbsp;&nbsp;·&nbsp;&nbsp;Talk with AI&nbsp;&nbsp;·&nbsp;&nbsp;" size="xs" className="text-[12px]">
        <Sparkles className="size-5 fill-background" />
      </MagnetBtn>
    </PopupChatbot>
  );
}
