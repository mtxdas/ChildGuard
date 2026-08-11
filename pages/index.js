import React, { useState } from 'react';

export default function Home() {
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alertMessage, setAlertMessage] = useState('');

  const triggerAction = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      paddingBottom: '80px',
      color: '#1e293b'
    }}>
      {/* Top Header */}
      <header style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '20px 16px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* ChildGuard Shield Logo */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" stroke="#38bdf8"/>
            </svg>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', letterSpacing: '0.5px' }}>ChildGuard</h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Parental Control & Safety</p>
            </div>
          </div>
          <button 
            onClick={() => triggerAction("অ্যালাউড নোটিফিকেশন চেক করা হচ্ছে...")}
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', cursor: 'pointer' }}
          >
            🔔
          </button>
        </div>

        {/* Protection Quick Status Card */}
        <div style={{
          marginTop: '20px',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #334155'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: isProtectionActive ? '#4ade80' : '#f87171' }}>
              ● {isProtectionActive ? 'সুরক্ষা সক্রিয় আছে' : 'সুরক্ষা বন্ধ রয়েছে'}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              {isProtectionActive ? 'ডিভাইস নিরাপদ রয়েছে' : 'অবিলম্বে সুরক্ষা চালু করুন'}
            </div>
          </div>
          <button 
            onClick={() => {
              setIsProtectionActive(!isProtectionActive);
              triggerAction(isProtectionActive ? "সুরক্ষা ডিঅ্যাক্টিভেট করা হয়েছে" : "সুরক্ষা অ্যাক্টিভেট করা হয়েছে");
            }}
            style={{
              backgroundColor: isProtectionActive ? '#ef4444' : '#22c55e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isProtectionActive ? 'বন্ধ করুন' : 'চালু করুন'}
          </button>
        </div>
      </header>

      {/* Dynamic Toast Alert */}
      {alertMessage && (
        <div style={{
          margin: '16px',
          padding: '12px 16px',
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '14px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(56,189,248,0.3)'
        }}>
          {alertMessage}
        </div>
      )}

      {/* Main Content Body */}
      <main style={{ padding: '16px' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#334155' }}>দ্রুত এক্সেস</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              
              {/* App Lock */}
              <div 
                onClick={() => triggerAction("অ্যাপ লক সেটিংস ওপেন হচ্ছে...")}
                style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>অ্যাপ লক</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>নির্দিষ্ট অ্যাপ লক রাখুন</div>
              </div>

              {/* Location Tracker */}
              <div 
                onClick={() => triggerAction("লাইভ লোকেশন ট্র্যাকিং চালু হচ্ছে...")}
                style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📍</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>লাইভ লোকেশন</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ডিভাইসের অবস্থান দেখুন</div>
              </div>

              {/* Web Filter */}
              <div 
                onClick={() => triggerAction("ওয়েব ফিল্টার সক্রিয় আছে")}
                style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌐</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>ওয়েব ফিল্টার</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ক্ষতিকর সাইট ব্লক করুন</div>
              </div>

              {/* Screen Time Limit */}
              <div 
                onClick={() => triggerAction("স্ক্রিন টাইম লিমিট নির্ধারণ করুন")}
                style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>স্ক্রিন টাইম</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ব্যবহারের সময়সীমা দিন</div>
              </div>

            </div>

            {/* System Status Section */}
            <div style={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#334155' }}>সিস্টেম স্ট্যাটাস</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>ব্যাটারি ব্যাকআপ</span>
                <span style={{ fontWeight: '600', color: '#16a34a' }}>৮৫% (ভালো)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>সর্বশেষ সিঙ্ক</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>এখনই</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>আচরণ ও ক্রিয়াকলাপের লগ</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                🔒 <strong>YouTube</strong> অ্যাপ ১০ মিনিটের জন্য লক করা হয়েছিল।
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                🌐 একটি ক্ষতিকারক ওয়েবসাইট স্বয়ংক্রিয়ভাবে ব্লক করা হয়েছে।
              </li>
              <li style={{ padding: '10px 0', fontSize: '13px' }}>
                📍 লোকেশন আপডেট সফলভাবে সিঙ্ক হয়েছে।
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>অ্যাপ সেটিংস</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => triggerAction("পিন পরিবর্তন পেজে নিয়ে যাওয়া হচ্ছে...")} style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                🔑 পিন কোড পরিবর্তন করুন
              </button>
              <button onClick={() => triggerAction("নোটিফিকেশন সেটিং সেভ হয়েছে")} style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                🔔 নোটিফিকেশন অ্যালার্ট কনফিগার করুন
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyAround: 'space-around',
        padding: '10px 0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '18px' }}>🛡️</span>
          ড্যাশবোর্ড
        </button>
        <button 
          onClick={() => setActiveTab('logs')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'logs' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '18px' }}>📋</span>
          অ্যাক্টিভিটি
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'settings' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '18px' }}>⚙️</span>
          সেটিংস
        </button>
      </nav>
    </div>
  );
}

