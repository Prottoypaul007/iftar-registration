import { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    alternative_contact: '',
    gender: '',
    address: '',
    current_institute: '',
    payment_method: 'offline',
    transaction_id: '',
  });
  
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }

      setStatus({ loading: false, error: null, success: true });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  if (status.success) {
    return (
      <div className="max-w-lg mx-auto mt-12 p-12 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/40 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/5 group-hover:to-amber-600/5 rounded-2xl transition-all duration-500"></div>        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/25 rounded-full blur-3xl"></div>
        <div className="text-7xl mb-6 relative z-10 animate-bounce">🌙</div>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 mb-4 relative z-10 leading-tight bangla-text">জাজাকাল্লাহ খাইরান!</h2>
        <p className="text-slate-300 mb-2 relative z-10 text-base md:text-lg leading-relaxed bangla-text">আপনার রেজিস্ট্রেশন সফল হয়েছে</p>
        <p className="text-slate-400 mb-8 relative z-10 text-sm md:text-base">A confirmation email has been sent to <span className="font-bold text-amber-400">{formData.email}</span></p>
        <button 
          onClick={() => window.location.reload()} 
          className="relative z-10 px-10 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
        >
          Register Another Person
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 relative">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/8 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl pointer-events-none animate-pulse animation-delay-2000"></div>

      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden relative z-10">
          <div className="py-12 px-8 md:px-10 text-center border-b border-slate-700/50 relative bg-gradient-to-b from-slate-800/50 to-transparent">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 mb-4 drop-shadow-lg tracking-tight leading-tight bangla-text">
            ইফতার মাহফিল
          </h2>          <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.3em] font-semibold">
            SSC Batch 2021 • Keshabpur
          </p>
          <p className="text-slate-500 text-xs mt-3 bangla-text">রমজানের এই পবিত্র মাসে আমরা একসাথে</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          
          {status.error && (
            <div className="p-5 bg-red-950/40 border border-red-500/40 rounded-xl backdrop-blur-sm flex items-start gap-4 animate-in fade-in slide-in-from-top duration-300">
              <span className="text-2xl flex-shrink-0 mt-0.5">⚠️</span>
              <p className="text-red-200 text-sm font-medium leading-relaxed">{status.error}</p>
            </div>
          )}

          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">📝 Full Name</label>
              <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="name" placeholder="Enter your full name" onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">✉️ Email Address</label>
              <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="email" type="email" placeholder="example@mail.com" onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2: Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">📱 Primary Phone</label>
              <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="phone_number" placeholder="01XXXXXXXXX" onChange={handleChange} required />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">💬 Alternative Contact</label>
              <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="alternative_contact" placeholder="WhatsApp (Optional)" onChange={handleChange} />
            </div>
          </div>

          {/* Row 3: Gender and Institute */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">👤 Gender</label>
              <select className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 outline-none transition-all duration-200 appearance-none hover:border-slate-600 cursor-pointer" name="gender" onChange={handleChange} required value={formData.gender}>
                <option value="" disabled className="bg-slate-800">Select Gender</option>
                <option value="Male" className="bg-slate-800">Male (ছেলে)</option>
                <option value="Female" className="bg-slate-800">Female (মেয়ে)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">🏢 Institute / Workplace</label>
              <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="current_institute" placeholder="e.g. Dhaka University" onChange={handleChange} required />
            </div>
          </div>

          {/* Row 4: Address */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">📍 Present Address</label>
            <input className="w-full px-5 py-3.5 bg-slate-900/60 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-600" name="address" placeholder="Where do you live currently?" onChange={handleChange} required />
          </div>

          {/* Payment Section */}
          <div className="pt-8 mt-8 border-t border-slate-700/50">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/40 border border-amber-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <span className="text-3xl">💳</span> 
                <span>Payment Details</span> 
                <span className="text-amber-400 bg-amber-500/15 px-4 py-1.5 rounded-full text-sm font-bold ml-auto border border-amber-500/30">300 BDT</span>
              </h3>
              
              <div className="space-y-3 mb-6">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-1 inline-block">Select Payment Method</label>
                <select className="w-full px-5 py-3.5 bg-slate-900/60 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-slate-100 outline-none transition-all duration-200 appearance-none hover:border-amber-500/50 cursor-pointer" name="payment_method" onChange={handleChange} value={formData.payment_method} required>
                  <option value="offline" className="bg-slate-800">💰 Offline (Hand Cash to Organizers)</option>
                  <option value="online" className="bg-slate-800">📲 Online (bKash/Nagad)</option>
                </select>
              </div>

              {formData.payment_method === 'online' && (
                <div className="mt-6 p-6 bg-gradient-to-br from-amber-900/25 to-amber-800/15 border border-amber-500/40 rounded-2xl space-y-6 animate-[slideDown_0.3s_ease-in-out]">
                  <div className="bg-slate-900/40 rounded-xl p-5 border border-amber-500/20">
                    <p className="text-sm text-amber-200/80 font-medium mb-2">Send 300 BDT via bKash to:</p>
                    <p className="text-3xl font-bold text-amber-300 tracking-wider font-mono">
                      {formData.gender === 'Female' 
                        ? "01711067354" 
                        : formData.gender === 'Male' 
                          ? "01721522982" 
                          : "Select gender above 👆"}
                    </p>
                    {formData.gender && <p className="text-xs text-amber-200/50 mt-2">🔐 Personal Account</p>}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-widest">Transaction ID</label>
                    <input 
                      className="w-full px-5 py-3.5 bg-slate-900/80 border border-amber-500/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 text-amber-100 placeholder-amber-700/50 outline-none transition-all uppercase tracking-widest font-mono text-sm"
                      name="transaction_id" 
                      placeholder="e.g. 9FX4A8V2" 
                      onChange={handleChange} 
                      required={formData.payment_method === 'online'} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={status.loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 text-lg font-bold rounded-xl shadow-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-6 tracking-wide uppercase"
          >
            {status.loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Processing...
              </span>
            ) : (
              '✓ Complete Registration'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
