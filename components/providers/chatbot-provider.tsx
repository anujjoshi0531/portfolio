"use client";

import { config } from "@/lib/constant";
import dynamic from "next/dynamic";
import "chatui/dist/chatui.css";
import { MessageCircleIcon } from "lucide-react";
import React from "react";

const PopupChatbot = dynamic(
  () => import("chatui").then((mod) => mod.PopupChatbot),
  { ssr: false }
);

export default function ChatbotProvider() {
  return (
    <PopupChatbot
      url={config.CHATBOT_URL}
      agent={config.CHATBOT_AGENT}
      model={config.CHATBOT_MODEL}
      position="bottom-right"
      header={{
        show: true,
        title: "Portfolio Assistant",
        subtitle: "Ask me anything",
        avatar: "/icon.webp",
        allowMaximize: true,
      }}
      footer={{
        show: true,
        subtitle: "Portfolio Guide",
      }}
      starter={{
        message: "👋 Hi! How can I help you?",
        suggestions: [
          "Tell me about your projects",
          "What are your core skills?",
          "Show me your work experience",
          "How can I contact you?",
        ],
      }}
      placeholder="Ask me about my portfolio..."
      stream={false}
      storageKey="portfolio-chat-session"
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
