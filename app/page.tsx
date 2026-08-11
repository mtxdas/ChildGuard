"use client";

import { Shield, Lock, Activity, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "সুরক্ষিত মনিটরিং",
    desc: "শিশুর অনলাইন কার্যকলাপ এবং নিরাপত্তা নিশ্চিত করতে রিয়েল-টাইম ট্র্যাকিং।"
  },
  {
    icon: Lock,
    title: "এক্সেস কন্ট্রোল",
    desc: "ক্ষতিকর ওয়েবসাইট এবং অ্যাপস থেকে সন্তানকে দূরে রাখতে কাস্টম ফিল্টারিং।"
  },
  {
    icon: Activity,
    title: "অ্যাক্টিভিটি রিপোর্ট",
    desc: "দৈনিক এবং সাপ্তাহিক ব্যবহারের স্পষ্ট বিশ্লেষণ ও নোটিফিকেশন।"
  },
  {
    icon: Eye,
    title: "স্মার্ট গার্ডিয়ান ভিউ",
    desc: "সহজ ও সুবিধাজনক ড্যাশবোর্ড থেকে সবকিছু তদারকি করার সুবিধা।"
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-block rounded-full bg-blue-500/10 p-4 border border-blue-500/20">
          <Shield className="h-12 w-12 text-blue-400 mx-auto" />
        </div>
        <h1 className="mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
          ChildGuard
        </h1>
        <p className="mb-2 text-lg text-zinc-300">
          আপনার সন্তানের ডিজিটাল জীবনের নির্ভরযোগ্য নিরাপত্তা ব্যবস্থা
        </p>
        <p className="mb-10 text-sm text-zinc-500">
          সুরক্ষিত 🎯 • নির্ভরযোগ্য 🛡️ • সহজ ব্যবস্থাপনা 📱
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-blue-500/20 bg-zinc-900/60 p-5 text-left backdrop-blur-sm"
            >
              <f.icon className="mb-3 h-6 w-6 text-blue-400" />
              <h3 className="mb-1 font-semibold text-zinc-100">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-zinc-900/60 p-6 text-left">
          <h2 className="mb-3 font-bold text-blue-300">🚀 ব্যবহারের নিয়মাবলী</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-300">
            <li>ChildGuard অ্যাপ বা ড্যাশবোর্ডে লগইন করুন।</li>
            <li>চাইল্ড ডিভাইস ডিভাইসটি পেয়ার (Pair) করতে অনুমতি নিশ্চিত করুন।</li>
            <li>ফিল্টার ও সিকিউরিটি অপশন থেকে প্রয়োজনমতো সেটিংস চালু করুন।</li>
            <li>রিয়েল-টাইম ড্যাশবোর্ড থেকে বাচ্চার অনলাইন সেফটি মনিটর করুন।</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
