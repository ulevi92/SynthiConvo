export type ChatLog = {
  id: number;
  message: string;
};

// stop === natural strop, length === maximum of token specified in the request was reached,
// content_filter === content flagged as violation of openAI rules, function_call === modal called a function
type FinishReason = "stop" | "length" | "content_filter" | "function_call";

export type ChatMessage = {
  content: string | null;
  role: "function" | "system" | "user" | "assistant";
};

type Usage = {
  total_tokens: number;
};

export type ChatChoices = {
  finishReason: FinishReason;
  index: number;
  message: ChatMessage;
};

export interface AIChat {
  id: string;
  choice: ChatChoices[];
  usage: Usage;
}
