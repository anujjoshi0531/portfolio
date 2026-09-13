"use client";

import { clientConfig } from "@/lib/constant/config.client";
import dynamic from "next/dynamic";
import "chatui/dist/chatui.css";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";
import { MagnetBtn } from "@/components/animate/MagnetBtn";
import Logo from "../site/Logo";

const PopupChatbot = dynamic(
  () => import("chatui").then((mod) => mod.PopupChatbot),
  { ssr: false }
);

export default function ChatbotProvider() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Delay chatbot initialization slightly so chatui bundle execution does not block initial main thread / TBT
    const timer = setTimeout(() => {
      setUserId(getUserId());
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!userId) return null;

  return (
    <PopupChatbot
      url={clientConfig.CHATBOT_URL}
      apiKey={clientConfig.CHATBOT_API_KEY}
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
      <MagnetBtn text="Chat with AI&nbsp;&nbsp;·&nbsp;&nbsp;ASK AI&nbsp;&nbsp;·&nbsp;&nbsp;Talk with AI&nbsp;&nbsp;·&nbsp;&nbsp;" size="xs" className="text-[12px] group">
        <div className="relative flex items-center justify-center size-10">
          <Logo className="group-hover:opacity-100 opacity-0 absolute transition-all duration-500" />
          <Sparkles className="size-5 fill-background group-hover:opacity-0 transition-all duration-500" />
        </div>
      </MagnetBtn>
    </PopupChatbot>
  );
}
