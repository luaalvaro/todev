import { Flex, Link as A } from '@chakra-ui/react'
import { styles } from '../../constants/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AuthHeader = () => {

    const router = useRouter()

    return (
        <Flex
            width="100%"
            height="70px"
            justify="center"
            align="center"
            gridGap="30px"
            borderBottom="1px solid rgba(255, 255, 255, 0.4)"
        >
            <Link
                href="/login"
            >
                <A
                    opacity={router.pathname === "/login" ? 1 : .7}
                >
                    Entrar
                </A>
            </Link>

            <Link href="/cadastro">
                <A
                    opacity={router.pathname === "/cadastro" ? 1 : .7}
                >
                    Cadastre-se
                </A>
            </Link>
        </Flex>
    )
}

export default AuthHeader