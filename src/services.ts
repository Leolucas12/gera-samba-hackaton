import axios from 'axios';
import { Conversation, Template, InteractionConversation } from './types';

const { VITE_BASE_API } = import.meta.env;

type Id = {
    id: string
}

export const getTemplates = (): Promise<(Template)[]> => {
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


export const createTemplate = (props: Template): Promise<Template> => {
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


export const createConversation = (props: Conversation): Promise<Id> => {
    const url = `${VITE_BASE_API}/conversations/`;

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


export const interactionConversation = (conversation_id: string, message: string): Promise<InteractionConversation> => {
    const url = `${VITE_BASE_API}/conversations/${conversation_id}/interactions`;

    return axios
        .post(url, {
            message: message
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.data)
        .catch((error) => {
            console.error('Create template error: ', error);
            throw error;
        });
};
