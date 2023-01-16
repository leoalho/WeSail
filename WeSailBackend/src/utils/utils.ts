import { UserFields, NewUserEntry } from "../types"
import mongoose, { isValidObjectId} from "mongoose"
import bcrypt from 'bcrypt'

import config from './config'

export const toNewUser = (entry: UserFields) => {
    const password = parseString(entry.password)
    const salt = bcrypt.genSaltSync(config.SALTROUNDS);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newEntry: NewUserEntry = {
        username: parseString(entry.username),
        passwordHash: passwordHash,
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

export const parseObjectId = (name: unknown): mongoose.Types.ObjectId => {
    if (!name || !isObjectId(name)){
        throw new Error('Incorrect or missing value');
    }

    return name;
}

const isObjectId = (id: unknown): id is mongoose.Types.ObjectId => {
    return isValidObjectId(id)
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};