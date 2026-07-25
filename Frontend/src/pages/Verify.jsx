import { useState } from "react";
import { Input } from "../components/Input";

function Verify() {
  const [token, settoken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add verification submit logic here
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Verify Your Account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the verification code sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            setFunction={settoken}
            type="text"
            value={token}
            placeholder="Enter verification code"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700"
          >
            Verify Code
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-slate-500">
          <p>Didn’t receive a code?</p>
          <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
