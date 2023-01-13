import { UserFields, NewUserEntry } from "../types"

export const toNewUser = (entry: UserFields) => {
    const newEntry: NewUserEntry = {
        username: parseString(entry.username),
        passwordHash: parseString(entry.passwordHash),
        email: parseString(entry.email)
    }
    return newEntry
}

export const parseString = (name: unknown): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing value');
    }

    return name;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};