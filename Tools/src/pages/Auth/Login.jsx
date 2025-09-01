// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "@pages/Context/Auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await login(email, password);
//     if (success) {
//       navigate("/ml"); // 👈 redirect to ML page
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@pages/Context/Auth"; // adjust path

export default function LoginPage() {
  const { login } = useContext(AuthContext); // get login function
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate("/"); // redirect on success
    } else {
      setErr("Invalid email or password");
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-6">
      <section className="w-full max-w-md">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-pretty">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Log in with your email and password.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="bg-card border rounded-xl p-5 md:p-6 shadow-sm grid gap-4"
        >
          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {err && <p className="text-center text-sm text-red-600">{err}</p>}

          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <a className="text-blue-600 hover:underline" href="/register">
              Create an account
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
