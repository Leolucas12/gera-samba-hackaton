import { LocalStorageTemplate } from "./types"

export const createSession = (props: LocalStorageTemplate) => {
   let stringStored = JSON.stringify(props)
   localStorage.setItem(props.templateId, stringStored);
}

export const readSession = (props: LocalStorageTemplate) => {
   let stringStored = localStorage.getItem(props.templateId)
   if (stringStored) {
      return JSON.parse(stringStored);
   }
}

export const parseSession = (props: LocalStorageTemplate) => {
   let data;
   let stringStored = localStorage.getItem(props.templateId)
   if (stringStored) {
      data = JSON.parse(stringStored);
      return `Você é um Bot que atua no canal de whatsapp trabalhando para loja ${data.name}.\n ${data.name} é uma loja de ${data.niche} \nO cliente que você está atendendo se chama {nome}, comece o ${data.typeContext}, ${data.details}`
   }
}


export const setSessionKey = (key: string, value: string) => {
   localStorage.setItem(key, value);
}


export const getSessionKey = (key: string): string | null => {
   return localStorage.getItem(key);
}
