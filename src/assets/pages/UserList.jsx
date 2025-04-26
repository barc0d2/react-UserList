import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUsers } from '../context/UserContext'
import Container from '../components/Container'
import Button from '../components/Button'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  text-align: left;
  margin: 0;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
`

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`

const UserCard = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eee;
  }
`

export default function UserList() {
  const { users } = useUsers()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Container>
      <Header>
        <Title>유저 목록</Title>
        <Button onClick={() => navigate('/user')}>유저 등록</Button>
      </Header>

      <SearchInput
        type="text"
        placeholder="이름 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <UserGrid>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
              <h3>{user.name}</h3>
              <p>{user.age}세 / {user.gender === 'male' ? '남' : user.gender === 'female' ? '여' : ''}</p>
              <p>{user.isOnline ? '🟢 온라인' : '⚪ 오프라인'}</p>
            </UserCard>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </UserGrid>
    </Container>
  )
}
