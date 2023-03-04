import { useEffect } from 'react'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { useUserStore } from './store/UserStore';
import { useUsersStore } from './store/UsersStore';

function App() {
  const isAuth = useUserStore(store => store.isAuth);
  const logout = useUserStore(store => store.logout);
  const isLoading = useUserStore(store => store.isLoading);
  const checkAuth = useUserStore(store => store.checkAuth);
  const setLoading = useUserStore(store => store.setLoading);

  const usersStore = useUsersStore(store => store);


  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>Загрузка...</h1>}

     {!isLoading && (
      <>
       <h1>
        {isAuth ? "Пользователь авторизован" : "Пользователь не авторизован"}
        </h1>
        {isAuth && (
          <div style={
            {
              display: 'flex',
              flexDirection: 'column'
            }
          }>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => usersStore.getUsers()}>Get Users List</button>
            {!!usersStore.users.length && usersStore.users.map((user) => (
              <p key={user.id}>{user.email}</p>
            ))}
          </div>
        )}
      
     
 
      {!isAuth && (
        <div>
        <LoginForm/>
        </div>
      )}
      </>
     )}
    </div>
  )
}

export default App
