import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-[0_0_32px_rgba(15,23,42,0.9)]">
        <h1 className="text-2xl font-bold text-cyan-400 mb-2">Register</h1>
        <p className="text-sm text-slate-300 mb-6">
          Account creation will be added later. For now, use the live demo to
          explore Kalyan AI Discovery.
        </p>
        <button
          type="button"
          onClick={() => navigate("/discovery")}
          className="w-full rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_24px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition-colors"
        >
          Go to Discovery
        </button>
      </div>
    </div>
  );
}
