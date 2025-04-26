import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  text-align: center;
`
const Button = styled.button`
  margin-top: 20px;
`

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Container>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Button onClick={() => navigate('/')}>홈으로 가기</Button>
    </Container>
  )
}
