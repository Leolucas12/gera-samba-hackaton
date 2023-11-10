import axios from 'axios';

const { VITE_BASE_API } = import.meta.env;


export type CreateTemplateProps = {
    id?: string;
    content: string;
    variables: Record<string, string>;
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
        .then((response) => response.data)
        .catch((error) => {
            console.error('Create template error: ', error);
            throw error;
        });
};

export const createConversation = () => {
    // Implement as needed using Axios
};

export const createInteractionConversation = () => {
    // Implement as needed using Axios
};
