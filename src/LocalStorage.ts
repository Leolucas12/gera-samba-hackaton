import { LocalStorageTemplate, Messages } from "./types";

export const createTemplateLocal = (props: LocalStorageTemplate) => {
  const templates = getTemplatesLocal();
  templates.push(props);
  const stringStored = JSON.stringify(templates);
  localStorage.setItem("gera-samba:templates", stringStored);
};

export const getTemplatesLocal = () => {
  const stringStored = localStorage.getItem("gera-samba:templates");
  if (stringStored) {
    return JSON.parse(stringStored);
  } else {
    localStorage.setItem("gera-samba:templates", JSON.stringify([]));
    return [];
  }
};

export const parseTemplate = (props: LocalStorageTemplate) => {
  return `Você é um Bot que atua no canal de whatsapp trabalhando para a empresa ${props.name}. ${props.name} é uma empresa de ${props.niche}. Comece a fazer o ${props.typeContext}. Mais informações sobre como deve ser a conversa: ${props.details}`;
};

export const setSessionKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getSessionKey = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const getMessageStorange = (key: string): Messages[] => {
  const messages = localStorage.getItem(key);
  if (messages) {
    return JSON.parse(messages);
  }
  return []
};
