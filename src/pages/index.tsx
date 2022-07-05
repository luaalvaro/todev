import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { styles } from '../constants/styles'
import Header from '../components/Header'
import AuthProvider from '../components/auth/AuthProvider'
import supabase from '../services/supabase'
import CardTask from '../components/CardTask'

interface Task {
  created_at: string;
  finished: boolean;
  id: string;
  note: string;
  user_id: string;
}

const Home = () => {

  const [loading, setLoading] = React.useState(false)
  const [newTask, setNewTask] = React.useState("")
  const [tasks, setTasks] = React.useState<Task[]>([])

  const fetchTasks = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from<Task>('tasks')
        .select('*')

      if (error)
        throw error

      setTasks(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (newTask === "") return

    const user = supabase.auth.user()
    if (!user) return

    try {
      const { data, error } = await supabase
        .from<Task>('tasks')
        .insert({
          note: newTask,
          user_id: user.id
        })
        .single()

      if (error)
        throw error

      setNewTask("")
      setTasks(old => [...old, data])
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id: string) => {

    try {
      const { error } = await supabase
        .from<Task>('tasks')
        .delete()
        .eq('id', id)

      if (error)
        throw error

      setTasks(old => old.filter(item => item.id !== id))
    } catch (error) {
      console.log(error)
    }

  }

  React.useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <AuthProvider>
      <Box
        minHeight="100vh"
        background={styles.color.background}
        fontFamily="Open Sans"
        fontSize={14}
        fontWeight={600}
        color={styles.color.textPrimary}
      >
        <Header />
        <Flex
          padding="12px 24px"
          direction="column"
        >
          <Text
            fontSize="18px"
            fontWeight={700}
            mb="10px"
          >
            Lista Principal
          </Text>

          <Flex
            direction="column"
            gridGap="15px"
          >
            {tasks?.length ? tasks.map(item => (
              <CardTask
                key={item.id}
                note={item.note}
                handleDelete={() => handleDelete(item.id)}
              />
            )) :
              <Text
                opacity={.7}
              >
                Sem tarefas por aqui :/
              </Text>
            }
          </Flex>
        </Flex>

        <Flex
          position="fixed"
          left="0"
          right="0"
          bottom="20px"
          px="20px"
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='#fff'
              fontSize='26px'
            >
              +
            </InputLeftElement>
            <Input
              placeholder='Adicionar uma tarefa'
              border="none"
              background={styles.color.backgroundDark}
              height="45px"
              value={newTask}
              onChange={({ target }) => setNewTask(target.value)}

              onKeyDown={({ key }) => key === "Enter" && handleSubmit()}
            />
          </InputGroup>
        </Flex>
      </Box>
    </AuthProvider>
  )
}

export default Home