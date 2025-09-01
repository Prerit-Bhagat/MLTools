// import React, { useState, useContext } from "react";
// import { AuthContext } from "@pages/Context/Auth";

// const ForgotPassword = () => {
//   const { forgotPassword } = useContext(AuthContext);
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await forgotPassword(email);
//     alert(res.data.message);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//       />
//       <button type="submit">Send Reset Link</button>
//     </form>
//   );
// };

// export default ForgotPassword;
"use client";

import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const API_BASE = "https://mltools.onrender.com";
  // "http://127.0.0.1:8000";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch(`${API_BASE}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Request failed");

      setMsg(
        data?.message || "If that email exists, a reset link has been sent."
      );
      setEmail("");
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
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a reset link.
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
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
            aria-busy={loading}
          >
            {loading ? "Sending..." : "Send reset link"}
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
            Remembered your password?{" "}
            <a className="text-blue-600 hover:underline" href="/login">
              Back to login
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
