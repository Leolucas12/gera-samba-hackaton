export interface Template {
  id: string;
  content: string;
  variables: unknown;
}

export interface Conversation {
  prompt_id: string;
  variables: unknown;
  temperature: number;
}

export interface Interaction {
  message: string;
}
