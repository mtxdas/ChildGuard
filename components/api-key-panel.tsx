"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, CheckCircle, ExternalLink, X } from "lucide-react";

interface ApiKeyPanelProps {
  onSave: (key: string) => void;
  onClose: () => void;
  currentKey: string;
}

export function ApiKeyPanel({ onSave, onClose, currentKey }: ApiKeyPanelProps) {
  const [key, setKey] = useState(currentKey);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border-violet-500/30 bg-zinc-900 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Key className="h-5 w-5 text-violet-400" />
            ক্ষ্যাপার ব্রেইন সেটআপ (ফ্রি)
          </CardTitle>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-lg bg-zinc-800/60 p-3 text-sm text-zinc-300">
            <p className="font-semibold text-violet-300">📝 ফ্রি API Key নেওয়ার নিয়ম (২ মিনিট):</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-violet-400 underline"
                >
                  aistudio.google.com/apikey <ExternalLink className="h-3 w-3" />
                </a>{" "}
                — এ যাও
              </li>
              <li>গুগল অ্যাকাউন্ট দিয়ে লগইন করো</li>
              <li>&quot;Create API key&quot; বাটনে ক্লিক করো</li>
              <li>Key-টা কপি করে নিচে পেস্ট করো</li>
            </ol>
            <p className="text-xs text-zinc-500">
              🔒 Key শুধু তোমার ব্রাউজারে থাকবে, কোথাও পাঠানো হবে না। সম্পূর্ণ ফ্রি — কোনো কার্ড লাগবে না।
            </p>
          </div>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="AIza... এখানে পেস্ট করো"
            className="border-zinc-700 bg-zinc-800 text-zinc-100"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => key.trim() && onSave(key.trim())}
              disabled={!key.trim()}
              className="flex-1 bg-violet-600 hover:bg-violet-500"
            >
              <CheckCircle className="mr-2 h-4 w-4" /> সেভ করো
            </Button>
            <Button variant="outline" onClick={onClose} className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white">
              পরে করবো
            </Button>
          </div>
          <p className="text-xs text-zinc-500">
            💡 Key ছাড়াও ক্ষ্যাপা কাজ করবে (সাইট খোলা, সার্চ, সময় বলা) — কিন্তু বুদ্ধিমান আড্ডার জন্য key লাগবে।
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
