import { notifications } from "@mantine/notifications";

import { api } from "~/utils/api";
import { useHistory, useQuestion, useUserId } from "~/hooks";

export const useChatApi = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const { userId } = useUserId();
  const { history, addToHistory } = useHistory();
  const { question, setQuestion } = useQuestion();

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

  return { chatApi, handleSend };
};
