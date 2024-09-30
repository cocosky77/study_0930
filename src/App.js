import React from "react";
import { useState, useEffect } from "react";

function App() {
  // user 데이터를 저장할 상태 선언
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 데이터를 가져오는 비동기 함수
  const fetchUsers = async () => {
    try {
      // API 요청
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      // 데이터를 상태에 저장
      setUsers(data);
      setLoading(false); // 로딩이 끝났음을 알림
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
      setLoading(false); // 로딩이 끝났음을 알림
    }
  };

  // 컴포넌트가 처음 렌더링될 때만 데이터 가져오기
  useEffect(() => {
    fetchUsers(); // 데이터 가져오기 함수 호출
  }, []); // 빈 배열로 의존성 배열 설명 -> 컴포넌트 마운트 시 한 번만 실행

  return (
    <div style={{ padding: "20px" }}>
      <h1>사용자 목록</h1>

      {loading ? (
        <p>데이터를 불러오는 중입니다...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
