import { LocalStorageTemplate } from "./types";

export const createSession = (props: LocalStorageTemplate) => {
  const stringStored = JSON.stringify(props);
  localStorage.setItem("current-template", stringStored);
};

export const readSession = () => {
  const stringStored = localStorage.getItem("current-template");
  if (stringStored) {
    return JSON.parse(stringStored);
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
