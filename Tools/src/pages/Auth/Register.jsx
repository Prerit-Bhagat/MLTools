// import React, { useState } from "react";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("Registering...");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/register/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       setMessage(data.message);
//     } catch (err) {
//       setMessage("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           >
//             Register
//           </button>
//         </form>
//         {message && <p className="mt-3 text-center text-sm">{message}</p>}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const API_BASE = "https://mltools.onrender.com";
  // ("http://127.0.0.1:8000");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Registration failed");

      setMsg(data?.message || "Registered successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (e) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-6">
      <section className="w-full max-w-md">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-pretty">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">It’s quick and easy.</p>
        </header>

        <form
          onSubmit={onSubmit}
          className="bg-card border rounded-xl p-5 md:p-6 shadow-sm grid gap-4"
        >
          <div className="grid gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Prerit Bhagat"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="prerit@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              pattern="[0-9]{10,}"
              title="Enter a valid phone number"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              autoComplete="new-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
            aria-busy={loading}
          >
            {loading ? "Registering..." : "Create account"}
          </button>

          {(msg || err) && (
            <p
              className={`text-center text-sm ${
                err ? "text-red-600" : "text-green-600"
              }`}
            >
              {err || msg}
            </p>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a className="text-blue-600 hover:underline" href="/login">
              Log in
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
