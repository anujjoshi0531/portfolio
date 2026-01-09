"use client";

import { config } from "@/lib/constant";
import dynamic from "next/dynamic";

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
        title: "Assistant",
        subtitle: "Ask me anything",
        avatar: "https://github.com/shadcn.png",
        allowMaximize: true
      }}
      placeholder="Ask me about my portfolio..."
      stream={false}
    />
  );
}
