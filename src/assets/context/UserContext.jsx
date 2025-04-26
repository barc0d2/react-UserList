import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// ✅ 더미 유저 데이터
const dummyUsers = [
  { id: '1', name: '김민수', age: 28, gender: 'male', isOnline: true },
  { id: '2', name: '이수진', age: 25, gender: 'female', isOnline: false },
  { id: '3', name: '박준형', age: 31, gender: 'male', isOnline: true },
  { id: '4', name: '최지은', age: 27, gender: 'female', isOnline: false },
]

export function UserProvider({ children }) {
  const [users, setUsers] = useState(dummyUsers)

  // ✅ 유저 추가
  // Date.now()를 사용할 시 사람마다 생성하는 시간이 다르기 때문에 중복 위험이 없음
  const addUser = (user) => {
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...user }])
  }

  // ✅ 유저 삭제
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter(user => user.id !== id))
  }

  // ✅ id로 유저 찾기
  const getUserById = (id) => {
    return users.find(user => user.id === id.toString()) || null
  }

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  )
}

// ✅ 외부에서 Context 사용하기 쉽게
export const useUsers = () => useContext(UserContext)
