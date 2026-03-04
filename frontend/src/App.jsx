import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-900 text-slate-200 py-4 sm:py-6 px-3 sm:px-4 font-sans selection:bg-amber-500/40 selection:text-amber-100 overflow-hidden relative">
      {/* Animated background orbs - hidden on very small screens */}
      <div className="hidden sm:block fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-80 h-40 sm:h-80 bg-amber-600/5 rounded-full blur-3xl animate-pulse duration-[4s]"></div>
        <div className="absolute bottom-20 sm:bottom-32 right-5 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse duration-[6s] animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-72 h-40 sm:h-72 bg-blue-600/3 rounded-full blur-3xl animate-pulse duration-[5s] animation-delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;