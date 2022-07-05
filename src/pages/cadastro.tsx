import React from 'react'
import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Link as A,
  Center,
} from '@chakra-ui/react'
import { styles } from '../constants/styles'
import Image from 'next/image'
import AuthHeader from '../components/auth/AuthHeader'
import Logo from '../../assets/todev-logo-xl.svg'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import supabase from '../services/supabase'

const Cadastro = () => {

  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async (values) => {
      console.log(values)
      const { email, password, confirmPassword } = values

      if (!email || !password || !confirmPassword)
        return alert('Todos os campos são obrigatórios')

      if (password !== confirmPassword)
        return alert('As senhas não coincidem')

      if (password.length < 8)
        return alert('A senha precisa ter pelo menos 8 caracteres')

      try {
        setLoading(true)

        const { user, error } = await supabase
          .auth
          .signUp({
            email: email,
            password: password
          })

        if (error)
          throw error

        console.log(user)
        return router.push('/')

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  });

  return (
    <Box
      minHeight="100vh"
      background={styles.color.background}

      fontFamily="Open Sans"
      fontSize={14}
      fontWeight={600}
      color={styles.color.textPrimary}
    >
      <AuthHeader />

      <Center
        paddingTop="24px"
        paddingBottom="48px"
        flexDirection="column"
        gridGap="18px"
      >
        <Image
          src={Logo}
          width={167}
          height={57}
          alt="ToDev"
        />

        <Text
          opacity={.7}
          letterSpacing={.9}
        >
          Cadastre-se gratuitamente
        </Text>
      </Center>

      <form onSubmit={formik.handleSubmit}>
        <Flex
          px="12px"
          direction="column"
          gridGap="24px"
        >
          <FormControl >
            <Input
              id="email"
              name="email"
              placeholder="Email"
              background={styles.color.backgroundDark}
              border="none"
              borderRadius="4px"
              height="50px"
              fontFamily="Open Sans"
              fontSize={14}
              fontWeight={600}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              background={styles.color.backgroundDark}
              border="none"
              borderRadius="4px"
              height="50px"
              fontFamily="Open Sans"
              fontSize={14}
              fontWeight={600}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <FormControl>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              background={styles.color.backgroundDark}
              border="none"
              borderRadius="4px"
              height="50px"
              fontFamily="Open Sans"
              fontSize={14}
              fontWeight={600}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </FormControl>
          <Button
            type="submit"
            background={styles.color.primary}
            fontFamily="Open Sans"
            fontSize={14}
            fontWeight={600}
            height="55px"

            isLoading={loading}

            _hover={{
              background: styles.color.primaryHover
            }}
          >
            Cadastre-se
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default Cadastro