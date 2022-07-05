import React from 'react'
import { Flex, Text, } from '@chakra-ui/react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { styles } from '../constants/styles'

const CardTask = ({ note, handleDelete }: { note: string, handleDelete: () => void }) => {

    const [active, setActive] = React.useState(false)

    return (
        <Flex
            position="relative"
            background={styles.color.backgroundDark}
            borderRadius="4px"
            align="center"

            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            <Flex
                px="12px"
            >
                <AiOutlineClockCircle
                    fontSize={22}
                />
            </Flex>

            <Text
                py="13px"
                opacity={.7}
            >
                {note}
            </Text>

            {active &&
                <Flex
                    position="absolute"
                    top="1"
                    right="1"
                    cursor="pointer"

                    onClick={handleDelete}
                >
                    <FaTimes color="red" />
                </Flex>
            }
        </Flex>
    )
}

export default CardTask