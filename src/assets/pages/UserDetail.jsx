import { useParams, useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
`
const Button = styled.button`
  margin: 5px;
`

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getUserById, deleteUser } = useUsers()

  const user = getUserById(id) 

  if (!user) {
    return (
      <Container>
        <h2>유저를 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </Container>
    )
  }

  const handleDelete = () => {
    deleteUser(id)
    navigate('/')
  }

  return (
    <Container>
      <h1>{user.name} 상세정보</h1>
      <p>나이: {user.age}세</p>
      <p>성별: {user.gender === 'male' ? '남' : user.gender === 'female' ? '여' : ''}</p>
      <p>{user.isOnline ? '🟢 온라인' : '⚪ 오프라인'}</p>
      <Button onClick={() => navigate('/')}>목록으로</Button>
      <Button onClick={handleDelete}>유저 삭제</Button>
    </Container>
  )
}
