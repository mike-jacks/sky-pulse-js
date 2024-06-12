import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal"

export default function LoginMain({ handleLogin }: { handleLogin: () => void }) {
  return (
    <div className="flex flex-col items-center text-center justify-center place-items-center bg-slate-500 p-12 rounded-2xl gap-10">
      <p className="text-2xl font-semibold">Welcome to SkyPulse</p>
      <LoginModal handleLogin={handleLogin} />
      <RegisterModal />
    </div>
  );
}
