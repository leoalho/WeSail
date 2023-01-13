export type UserFields = {username: unknown, passwordHash: unknown, email: unknown}

export type NewUserEntry = {username: string, passwordHash: string, email: string}

export type UpdateUser = {
    username: string | undefined,
    passwordHash: string | undefined,
    email: string | undefined,
    friend: string | undefined
}