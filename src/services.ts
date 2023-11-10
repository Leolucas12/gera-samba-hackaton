const {
    VITE_BASE_API
} = import.meta.env


export const getTemplates = () => {
    const url = `${VITE_BASE_API}/prompt-templates/`;

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            mode: "no-cors",
        }).then(response => {
            resolve(response.json())
        }).catch(error => {
            console.error("Get templates: ", error);
            reject(error);
        })
    })

}


export type createTemplateProps = {
    content: string
    variables: Record<string, string>
}
export const createTemplate = (props: createTemplateProps) => {
    const url = `${VITE_BASE_API}/prompt-templates/`;

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props)
        }).then(response => {
            resolve(response.json())
        }).catch(error => {
            console.error("Get templates: ", error);
            reject(error);
        })
    })
}


export const createConversation = () => { }


export const createInteractionConversation = () => { }

