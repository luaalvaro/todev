import React from 'react'
import { Center, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import LogoSm from '../../assets/todev-logo-sm.svg'
import { GiExitDoor } from 'react-icons/gi'
import supabase from '../services/supabase'

const Header = () => {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        console.log(error)
    }

    return (
        <Flex
            height="70px"
            px="20px"
            borderBottom="1px solid rgba(255, 255, 255, 0.4)"
            justify="space-between"
            align="center"
        >
            <Image
                src={LogoSm}
                alt="Logo ToDev"
            />

            <Center
                width="32px"
                height="32px"
                border="1px solid rgba(255,255,255,.7)"
                borderRadius="4px"
                cursor="pointer"

                onClick={handleLogout}
            >
                <GiExitDoor
                    color="#fff"
                />
            </Center>
        </Flex>
    )
}

export default Header