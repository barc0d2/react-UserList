import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUsers } from '../context/UserContext'

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`

const Input = styled.input`
  width: 70%;
  height: 30px;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #aaa;
`

const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const Select = styled.select`
  width: 72%;
  height: 35px;
  border-radius: 5px;
  padding: 0 10px;
  border: 1px solid #aaa;
`

const Tag = styled.div`
  width: 73%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: 5px;
`

const Button = styled.button`
  width: 72%;
  padding: 10px;
  border-radius: 5px;
  background-color: #a9a3f5;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #8880e6;
  }
`

const ToggleWrapper = styled.div`
  width: 73%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const ToggleButton = styled.button`
  width: 48%;
  padding: 8px;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#a9a3f5' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  font-weight: bold;
  border: 2px solid #a9a3f5;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#8880e6' : '#f0f0ff')};
  }
`

export default function UserRegistration() {
  const navigate = useNavigate()
  const { addUser } = useUsers()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    isOnline: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOnlineSelect = (status) => {
    setFormData(prev => ({
      ...prev,
      isOnline: status
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.age || isNaN(formData.age)) {
      alert('이름과 나이를 정확히 입력해주세요!')
      return
    }

    addUser({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      isOnline: formData.isOnline,
    })

    alert(`${formData.name}님 환영합니다!`)
    navigate('/')
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>회원가입</h2>

        <Label htmlFor="name">
          <Tag>이름</Tag>
          <Input name="name" placeholder="이름을 입력해주세요" value={formData.name} onChange={handleChange} />
        </Label>

        <Label htmlFor="age">
          <Tag>나이</Tag>
          <Input name="age" type="number" placeholder="나이를 입력해주세요" value={formData.age} onChange={handleChange} />
        </Label>

        <Label htmlFor="gender">
          <Tag>성별</Tag>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">선택</option>
            <option value="male">남</option>
            <option value="female">여</option>
          </Select>
        </Label>

        <Tag>온라인 상태</Tag>
        <ToggleWrapper>
          <ToggleButton type="button" active={formData.isOnline} onClick={() => handleOnlineSelect(true)}>
            온라인
          </ToggleButton>
          <ToggleButton type="button" active={!formData.isOnline} onClick={() => handleOnlineSelect(false)}>
            오프라인
          </ToggleButton>
        </ToggleWrapper>

        <Button type="submit">등록하기</Button>
      </Form>
    </Container>
  )
}
