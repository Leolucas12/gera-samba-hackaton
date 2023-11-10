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

export interface LocalStorageTemplate {
  name: string;
  niche: string;
  typeContext: string;
  templateId: string;
  details: string;
}