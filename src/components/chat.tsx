import { useRef } from "react";
import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import ChatHistory from "./chat-history";
import { useHistory, useQuestion, useUserId } from "~/hooks";
import { api } from "~/utils/api";
import { getHotkeyHandler } from "@mantine/hooks";

function Chat() {
  const { userId } = useUserId();
  const { question, setQuestion } = useQuestion();
  const { history, addToHistory, setHistory } = useHistory();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatApi = api.chat.prompt.useMutation({
    onSuccess: (text) => {
      addToHistory({ agent: "ai", text });
      setQuestion("");
      scrollToBottom();
    },
    onError: (error) => {
      console.error(error);
      notifications.show({ title: "Error", message: error.message, color: "red" });
    },
  });

  const handleSend = () => {
    if (!question) return;
    addToHistory({ agent: "human", text: question });
    chatApi.mutate({ userId, question, history });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-white p-8">
        <ChatHistory />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 p-8">
        <div className="flex justify-center">
          <Button variant="subtle" color="gray" onClick={() => setHistory([])}>
            Clear messages
          </Button>
        </div>
        <div className="flex gap-2">
          <TextInput
            type="text"
            className="flex-1"
            placeholder="Type your message..."
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            disabled={chatApi.isLoading}
            onKeyDown={getHotkeyHandler([["Enter", handleSend]])}
          />
          <Button variant="filled" color="blue" onClick={handleSend} loading={chatApi.isLoading}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}

export default Chat;
