import React from 'react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Asset Imports
import heroImg from '../assets/images/hero.svg';
import star1 from '../assets/images/star 1.svg';
import star8 from '../assets/images/Star 8.svg';
import star2 from '../assets/images/star2.svg';
import bigStar from '../assets/images/bigstar.svg';
import fluffy from '../assets/images/fluffy.svg';
import layer1 from '../assets/images/Layer_1.svg';
import groupDecoration from '../assets/images/Group.svg';
import logo from '../assets/images/logo.svg';
import lastStar from '../assets/images/last star.svg';

// Icon Imports
import uploadIcon from '../assets/icons/upload.svg';
import hashIcon from '../assets/icons/hash.svg';
import storeIcon from '../assets/icons/store.svg';
import ownerKeyIcon from '../assets/icons/owner-key.svg';
import statusIcon from '../assets/icons/transaction.svg';
import qrIcon from '../assets/icons/Qr code.svg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#0B0B14] min-h-screen relative text-white">
      
      {/* GLOBAL BACKGROUND HEX GRID */}
      <div className="fixed inset-0 pointer-events-none -z-0">
        <img src={groupDecoration} className="w-full h-full object-cover opacity-[0.08]" alt="" />
      </div>

      {/* 1. REFINED HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 lg:px-8 z-10 w-full overflow-visible">
        
        {/* LARGE LAYER_1 STAR */}
        <img src={layer1} className="absolute -top-10 -left-20 w-[450px] opacity-20 pointer-events-none animate-pulse" alt="" />

        {/* Main Hero Wrapper to prevent cropping of decorative stars by clip-path */}
        <div className="relative w-full max-w-7xl">
          {/* Top Right Header Buttons - Outside Hero Card to avoid clip-path */}
          <div className="absolute top-6 right-12 hidden md:flex items-center gap-[15px] z-30">
             <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Login
             </Button>
             <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Register now
             </Button>
          </div>

          {/* Main Hero Card */}
          <div 
            className="w-full bg-[#11111B]/95 backdrop-blur-[60px] border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center gap-4 min-h-[640px]"
            style={{
              clipPath: 'polygon(0% 0%, 25% 0%, 30% 12%, 100% 12%, 100% 88%, 95% 100%, 0% 100%, 0% 10%)'
            }}
          >
            {/* Internal Header */}
            <div className="absolute top-6 left-12 flex items-center gap-3">
               <img src={logo} className="w-8 h-8" alt="ProofChain Logo" />
               <span className="text-xl font-header font-bold text-white tracking-widest uppercase">ProofChain</span>
            </div>

            {/* Left Content */}
            <div className="z-10 flex-1 pl-12 lg:pl-20 pr-8 text-left mt-24 lg:mt-32">
              <h1 className="text-[50px] font-header font-black tracking-tighter text-white mb-6 uppercase leading-[1.05]">
                Prove Ownership of <br /> Your Digital Work
              </h1>
              <p className="text-sm font-body text-slate-400 mb-12 max-w-sm leading-relaxed font-light">
                A decentralized platform to verify and protect your digital files using blockchain technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/create-license')}
                >
                  Create License
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/explore')}
                >
                  Explore Files
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative flex-1 flex justify-center lg:justify-end pr-12 lg:pr-24 py-12 lg:py-0">
              <div className="relative z-10 w-full max-w-[480px] aspect-square flex items-center justify-center">
                <img src={heroImg} alt="Hero Illustration" className="w-full h-full object-contain transform scale-125 lg:translate-y-8 animate-float-slow" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/4 bg-primary/40 blur-[90px] rounded-full -z-10" />
              </div>
            </div>
          </div>

          {/* Decorative Stars Overlay (Outside Clip-Path) */}
          <div className="absolute inset-0 pointer-events-none flex flex-col lg:flex-row z-20 overflow-visible">
            <div className="flex-1" />
            <div className="relative flex-1 pr-12 lg:pr-24 py-12 lg:py-0 flex justify-center lg:justify-end">
              <img src={star8} className="absolute -top-16 -right-5 w-24 h-24 opacity-100 animate-float-slow" style={{ filter: 'brightness(0) invert(1)' }} alt="" />
              <img src={star2} className="absolute bottom-10 left-10 w-24 h-24 opacity-100 animate-float" style={{ filter: 'brightness(0) invert(1)' }} alt="" />
              <img src={star1} className="absolute top-1/2 -right-10 w-20 h-20 opacity-100 animate-sparkle" style={{ filter: 'brightness(0) invert(1)' }} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Staggered Layout as requested) */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-header font-bold text-center text-white mb-20 uppercase tracking-[0.2em]">
            How it works
          </h2>
          {/* Horizontal Staggered Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
            <div className="flex justify-center md:justify-start">
               <WorkCard icon={uploadIcon} title="Create a license" desc="Create the license you want to attach your documents to." delay="0s" />
            </div>
            <div className="flex justify-center md:pt-32 scale-95 opacity-90 transition-all duration-500 hover:scale-100 hover:opacity-100">
               <WorkCard icon={hashIcon} title="Generate Hash" desc="We create a unique cryptographic fingerprint of your file." delay="0.2s" side="right" />
            </div>
            <div className="flex justify-center md:justify-end">
               <WorkCard icon={storeIcon} title="Store in Blockchain" desc="The fingerprint is permanently hashed onto the immutable ledger." delay="0.4s" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES SECTION (Centered + Fixed Icons + Distorted BigStar) */}
      <section className="py-32 px-4 relative overflow-visible z-10">
        
        {/* 351px Distorted BIG STAR (White, 60deg skew as requested) */}
        <img 
            src={bigStar} 
            className="absolute -left-24 top-1/2 -translate-y-1/2 w-[351px] h-[351px] opacity-60 pointer-events-none animate-sparkle" 
            style={{ 
                filter: 'brightness(0) invert(1)',
                transform: 'translateY(-50%) skewX(60deg)'
            }} 
            alt="" 
        />
        
        <div className="max-w-7xl mx-auto flex flex-col gap-16 overflow-visible items-center">
          
          <div 
            className="w-full bg-[#11111B]/80 backdrop-blur-2xl border border-white/20 py-8 pr-12 lg:pr-20 flex justify-end shadow-xl"
            style={{ clipPath: 'polygon(0% 15%, 5% 0%, 95% 0%, 100% 15%, 100% 85%, 95% 100%, 5% 100%, 0% 85%)' }}
          >
             <h2 className="text-3xl font-header font-bold text-white uppercase tracking-[0.4em]">
              Core Features
            </h2>
          </div>

          <div className="flex flex-col items-center gap-10 w-full max-w-4xl mx-auto">
            {[
              { icon: ownerKeyIcon, title: "Proof of Ownership", desc: "Indisputable proof that you are the creator and owner of the asset." },
              { icon: statusIcon, title: "Instant Verification", desc: "Verify any file's authenticity in seconds with our lookup tool." },
              { icon: qrIcon, title: "License purchasing", desc: "Buy licenses by sending requests to license owners." }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative bg-[#11111B]/70 backdrop-blur-[40px] border border-white/20 p-8 w-full max-w-2xl transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 shadow-xl"
                style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 20%, 100% 100%, 5% 100%, 0% 80%)' }}
              >
                <div className="flex items-center justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-header font-bold text-white mb-2 group-hover:text-primary transition-colors uppercase">{feature.title}</h3>
                    <p className="text-slate-400 font-body text-xs leading-relaxed max-w-md">{feature.desc}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0 border border-primary/20">
                    <img src={feature.icon} alt={feature.title} className="w-10 h-10 opacity-100" style={{ filter: 'brightness(0) saturate(100%) invert(31%) sepia(95%) saturate(7491%) hue-rotate(260deg) brightness(101%) contrast(108%)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-header font-bold text-center text-white mb-24 uppercase tracking-widest">
            Flexible Plans for Every Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* FREE PLAN */}
            <div className="bg-[#11111B]/80 backdrop-blur-[50px] border border-white/20 p-12 flex flex-col items-center group transition-all duration-500 hover:bg-[#11111B]/95 shadow-2xl"
                 style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%)' }}>
               <h3 className="text-2xl font-header font-bold text-white mb-4 tracking-[0.3em]">FREE</h3>
               <div className="text-4xl font-header font-black text-primary mb-12 tracking-tighter">0 ETH/year</div>
               <ul className="space-y-5 mb-12 w-full text-slate-400 text-sm font-body">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#6f26ff]" />Up to 5 files monthly</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" />Standard Verification</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-primary rounded-full" />Public Ledger</li>
               </ul>
               <Button variant="outline" fullWidth>Select Plan</Button>
            </div>
            {/* PRO PLAN */}
            <div className="bg-primary/20 backdrop-blur-[50px] border border-primary/60 p-12 flex flex-col items-center relative overflow-hidden transition-all duration-500 hover:bg-primary/40 shadow-2xl"
                 style={{ clipPath: 'polygon(0% 40px, 40px 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
               <div className="absolute top-0 right-0 p-2 bg-primary text-[10px] font-black uppercase tracking-widest text-white px-6 py-2 shadow-xl">Popular</div>
               <h3 className="text-2xl font-header font-bold text-white mb-4 tracking-[0.3em]">PRO</h3>
               <div className="text-4xl font-header font-black text-white mb-12 tracking-tighter">1000 ETH/year</div>
               <ul className="space-y-5 mb-12 w-full text-slate-200 text-sm font-body">
                  <li className="flex items-center gap-3 font-semibold"><div className="w-2 h-2 bg-white rounded-full shadow-white" />Unlimited protections</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full" />Priority Hash Generation</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full" />QR Licensing Rights</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-white rounded-full" />24/7 Support</li>
               </ul>
               <Button variant="primary" fullWidth className="hover:scale-105">Select Plan</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (Enhanced Glassmorphism + New Assets) */}
      <section className="py-32 px-8 relative z-10 overflow-visible mt-20">
        <div className="relative mx-auto max-w-6xl w-full">
           
          {/* FLUFFY at Top Right Corner - OUTSIDE clip-path */}
          <img src={fluffy} className="absolute -right-24 -top-24 w-[450px] opacity-100 pointer-events-none animate-pulse z-20" alt="" />
          
          {/* LAST STAR at Left Corner - OUTSIDE clip-path */}
          <img src={lastStar} className="absolute -bottom-20 -left-20 w-56 h-56 opacity-100 pointer-events-none animate-float z-20" alt="" />

          {/* The Glass Container with clip path */}
          <div 
            className="w-full bg-white/5 backdrop-blur-[80px] border border-white/30 p-24 flex flex-col items-center text-center shadow-[0_0_80px_rgba(0,0,0,0.6)] relative z-10"
            style={{ 
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 40px 100%, 0% calc(100% - 40px))',
            }}
          >
            <h2 className="text-6xl font-header font-black text-white mb-10 tracking-tighter leading-tight relative uppercase">
              Start Protecting <br /> Your Work Today
            </h2>
            <Button 
              variant="primary"
              size="lg"
              className="px-24 py-8 text-lg"
              onClick={() => navigate('/register')}
            >
              Register now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer star decoration */}
      <img src={star2} className="absolute bottom-20 right-10 w-32 h-32 opacity-30 pointer-events-none invert animate-float-slow" alt="" />

    </div>
  );
};

// Subcomponent for How it works cards
const WorkCard: React.FC<{ icon: string, title: string, desc: string, delay: string, side?: 'left' | 'right' }> = ({ icon, title, desc, delay, side = 'left' }) => {
  return (
    <div 
      className="group relative max-w-sm"
      style={{ animationDelay: delay }}
    >
      <div 
        className="bg-[#11111B]/80 backdrop-blur-[40px] border border-white/20 p-10 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 shadow-2xl"
        style={{
          clipPath: side === 'left' 
            ? 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 100%, 0% 100%)' 
            : 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)'
        }}
      >
        <div className="mb-8 inline-flex p-5 bg-primary/10 rounded-2xl group-hover:scale-125 transition-transform duration-500">
          <img src={icon} alt={title} className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-header font-bold text-white mb-4 uppercase tracking-wider">{title}</h3>
        <p className="text-sm font-body text-slate-400 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

export default LandingPage;
