import { LocalStorageTemplate } from "./types"


export const LocalStorage = () => {
   const createSession = (props: LocalStorageTemplate) => {
    let stringStored = JSON.stringify(props)
    localStorage.setItem(props.templateId ,stringStored);
    }

    const readSession = (props: LocalStorageTemplate) => {
    let stringStored = localStorage.getItem(props.templateId)
    if(stringStored){
       return JSON.parse(stringStored);
    }}
}