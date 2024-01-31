import GoggleProvider from 'next-auth/providers/google'

export const AuthConfig = {
    providers: [
        GoggleProvider({
            clientId: '',
            clientSecret: '',
       }) 
    ]
}