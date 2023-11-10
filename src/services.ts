import axios from 'axios';

const { VITE_BASE_API } = import.meta.env;


export type CreateTemplateProps = {
    id?: string;
    content: string;
    variables: Record<string, string>;
};

export type CreateConversationProps = {
    prompt_id: string;
    variables: Record<string, string>;
    temperature: number;
};

export const getTemplates = (): Promise<CreateTemplateProps[]> => {
    const url = `${VITE_BASE_API}/prompt-templates/`;

    return axios
        .get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Get templates: ', error);
            throw error;
        });
};


export const createTemplate = (props: CreateTemplateProps): Promise<CreateTemplateProps> => {
    const url = `${VITE_BASE_API}/prompt-templates/`;

    return axios
        .post(url, props, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            
            return response.data
        })
        .catch((error) => {
            console.error('Create template error: ', error);
            throw error;
        });
};

export const createConversation = (props: CreateConversationProps): Promise<string> => {
    const url = `${VITE_BASE_API}/conversations/`;

    return axios
        .post(url, props, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Create template error: ', error);
            throw error;
        });
};

export const createInteractionConversation = (conversation_id: string, message: string) => {
    const url = `${VITE_BASE_API}/conversations/${conversation_id}/interactions`;

    return axios
        .post(url, {
            message: message
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Create template error: ', error);
            throw error;
        });
};
