const {
    VITE_BASE_API
} = import.meta.env

export const getTemplates = async () => {
    const url = `${VITE_BASE_API}/prompt-templates/`
    
    fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.error("Get templates: ", error);
    })

}


export const createTemplate = () => { }


export const createConversation = () => { }


export const createInteractionConversation = () => { }

