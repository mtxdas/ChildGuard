'use client';
import React, { useState } from 'react';

export default function Home() {
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (title, content) => {
    setActiveModal({ title, content });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      paddingBottom: '90px',
      color: '#1e293b',
      userSelect: 'none'
    }}>
      {/* Top Header */}
      <header style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '20px 16px',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" stroke="#38bdf8"/>
            </svg>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>ChildGuard</h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Parental Control & Safety</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => openModal("নোটিফিকেশন", "বর্তমানে কোনো নতুন নিরাপত্তা নোটিফিকেশন নেই।")}
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', cursor: 'pointer' }}
          >
            🔔
          </button>
        </div>

        {/* Protection Status Card */}
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
            type="button"
            onClick={() => setIsProtectionActive(!isProtectionActive)}
            style={{
              backgroundColor: isProtectionActive ? '#ef4444' : '#22c55e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isProtectionActive ? 'বন্ধ করুন' : 'চালু করুন'}
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main style={{ padding: '16px' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', color: '#334155' }}>দ্রুত এক্সেস</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              
              {/* App Lock Card */}
              <button 
                type="button"
                onClick={() => openModal("অ্যাপ লক", "লক করার জন্য অ্যাপস নির্বাচন করুন:\n• Facebook\n• YouTube\n• TikTok")}
                style={{ textAlign: 'left', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔒</div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>অ্যাপ লক</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>নির্দিষ্ট অ্যাপ লক রাখুন</div>
              </button>

              {/* Location Tracker */}
              <button 
                type="button"
                onClick={() => openModal("লাইভ লোকেশন", "সর্বশেষ পাওয়া লোকেশন:\nঢাকা, বাংলাদেশ\n(সঠিকতা: ৯৫%)")}
                style={{ textAlign: 'left', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📍</div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>লাইভ লোকেশন</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ডিভাইসের অবস্থান দেখুন</div>
              </button>

              {/* Web Filter */}
              <button 
                type="button"
                onClick={() => openModal("ওয়েব ফিল্টার", "ওয়েব ফিল্টারিং সক্রিয় আছে। অনাকাঙ্ক্ষিত সাইটগুলো ব্লক রাখা হয়েছে।")}
                style={{ textAlign: 'left', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌐</div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>ওয়েব ফিল্টার</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ক্ষতিকর সাইট ব্লক করুন</div>
              </button>

              {/* Screen Time Limit */}
              <button 
                type="button"
                onClick={() => openModal("স্ক্রিন টাইম", "আজকের ব্যবহার: ২ ঘন্টা ১৫ মিনিট\nদৈনিক সীমা: ৪ ঘন্টা")}
                style={{ textAlign: 'left', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>স্ক্রিন টাইম</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>ব্যবহারের সময়সীমা দিন</div>
              </button>

            </div>

            {/* System Status Section */}
            <div style={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#334155' }}>সিস্টেম স্ট্যাটাস</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>ব্যাটারি ব্যাকআপ</span>
                <span style={{ fontWeight: '600', color: '#16a34a' }}>৮৫% (ভালো)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>সর্বশেষ সিঙ্ক</span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>এখনই</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', color: '#0f172a' }}>অ্যাক্টিভিটি হিস্ট্রি</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '13px' }}>
                🔒 <strong>YouTube</strong> অ্যাপ ১০ মিনিটের জন্য লক করা হয়েছিল।
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '13px' }}>
                🌐 একটি ক্ষতিকারক ওয়েবসাইট স্বয়ংক্রিয়ভাবে ব্লক করা হয়েছে।
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '13px' }}>
                📍 লাইভ লোকেশন আপডেট সফলভাবে সম্পন্ন হয়েছে।
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', color: '#0f172a' }}>অ্যাপ সেটিংস</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button" 
                onClick={() => openModal("পিন কোড", "নতুন ৪ সংখ্যার পিন টাইপ করুন:")} 
                style={{ padding: '14px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                🔑 পিন কোড পরিবর্তন করুন
              </button>
              <button 
                type="button" 
                onClick={() => openModal("নোটিফিকেশন", "নোটিফিকেশন অ্যালার্ট অন করা হলো।")} 
                style={{ padding: '14px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                🔔 নোটিফিকেশন সেটিংস
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Modal Popup */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            width: '100%',
            maxWidth: '320px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0f172a' }}>{activeModal.title}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#475569', whiteSpace: 'pre-line', lineHeight: '1.5' }}>
              {activeModal.content}
            </p>
            <button 
              type="button"
              onClick={closeModal}
              style={{
                width: '100%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 8px 0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        zIndex: 900
      }}>
        <button 
          type="button"
          onClick={() => setActiveTab('dashboard')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>🛡️</span>
          ড্যাশবোর্ড
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('logs')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'logs' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>📋</span>
          অ্যাক্টিভিটি
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('settings')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'settings' ? '#0284c7' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>⚙️</span>
          সেটিংস
        </button>
      </nav>
    </div>
  );
}
