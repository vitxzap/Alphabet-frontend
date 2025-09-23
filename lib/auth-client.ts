import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3050",
    basePath: "/api/auth"
})

export type Session = typeof authClient.$Infer.Session