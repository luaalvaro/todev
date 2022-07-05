import React from 'react'
import supabase from '../../services/supabase'
import { useRouter } from 'next/router'
import { Session } from '@supabase/supabase-js'

interface IProps {
    children: React.ReactNode
}

const AuthProvider = ({ children }: IProps) => {

    const router = useRouter()
    const [session, setSession] = React.useState<Session | null>(null)

    React.useEffect(() => {
        const currentSession = supabase.auth.session()
        setSession(currentSession)

        if (!currentSession)
            router.push('/login')

        console.log(currentSession)

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)

            if (!session)
                router.push('/login')
        })
    }, [])

    return (
        <div>
            {session && children}
        </div>
    )
}

export default AuthProvider