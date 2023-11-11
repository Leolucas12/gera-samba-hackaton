export interface Interaction {
  message: string;
}

export interface LocalStorageTemplate {
  name: string;
  niche: string;
  typeContext: string;
  details: string;
  template_name: string;
  id?: string;
}

export type Template = {
  id?: string
  content: string;
  variables: Record<string, string>;
};

export type Conversation = {
  id?: string
  prompt_id: string;
  variables: Record<string, string>;
  temperature: number;
};

export type InteractionConversation = {
  message: string
}

export type Messages = {
  from: string;
  message: string
}
