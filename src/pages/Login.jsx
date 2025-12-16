import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login("staff@demo.com", "1234");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Login</button>
    </form>
  );
}

export default Login;
