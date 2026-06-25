"use client";

import { useState, useEffect } from "react";
import { Lock, Save, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import type { Room } from "@/data/rooms";
import { formatPrice } from "@/data/rooms";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authenticated) {
      fetch("/api/rooms")
        .then((r) => r.json())
        .then(setRooms);
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "nicemason2024") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const updateRoom = (id: string, field: keyof Room, value: string | number) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, rooms }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Save failed. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0d2b4e] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-white font-black text-3xl tracking-widest uppercase">Nice Mason</p>
            <p className="text-[#c49a6c] text-xs tracking-[4px] uppercase font-medium mt-1">
              Admin Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-sm p-8 shadow-2xl">
            <div className="flex items-center justify-center w-14 h-14 bg-[#0d2b4e] rounded-sm mx-auto mb-6">
              <Lock size={24} className="text-[#c49a6c]" />
            </div>
            <h1 className="text-[#0d2b4e] font-black text-2xl text-center mb-6">
              Admin Login
            </h1>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#0d2b4e] pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#0d2b4e] hover:bg-[#1a4a7a] text-white font-bold py-3 rounded-sm tracking-widest uppercase text-sm transition-colors"
            >
              Login
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs hover:text-[#0d2b4e] transition-colors"
            >
              <ArrowLeft size={12} />
              Back to website
            </a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="bg-[#0d2b4e] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-black text-lg tracking-widest uppercase">Nice Mason</p>
          <p className="text-[#c49a6c] text-[10px] tracking-[4px] uppercase">Admin Portal</p>
        </div>
        <div className="flex items-center gap-4">
          {saved && (
            <span className="flex items-center gap-1.5 text-green-400 text-sm font-semibold">
              <CheckCircle size={14} />
              Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#c49a6c] hover:bg-[#a0673a] disabled:opacity-50 text-white px-5 py-2 rounded-sm text-sm font-bold tracking-widest uppercase transition-colors"
          >
            <Save size={14} />
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <a
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Website
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-[#0d2b4e] font-black text-3xl mb-2">Room Management</h1>
          <p className="text-gray-500 text-sm">
            Edit room names, prices, and descriptions below. Click <strong>Save Changes</strong> when done.
            Changes update <code className="bg-gray-100 px-1 rounded text-xs">data/rooms.json</code> on the server.
          </p>
        </div>

        <div className="space-y-6">
          {rooms.map((room, i) => (
            <div key={room.id} className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 bg-[#0d2b4e] rounded-sm flex items-center justify-center text-white font-black text-sm">
                  {i + 1}
                </span>
                <span className="text-[#c49a6c] text-xs font-bold tracking-[3px] uppercase">
                  {room.id}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d2b4e] text-[#0d2b4e] font-semibold"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                    Price per Night (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">₦</span>
                    <input
                      type="number"
                      value={room.price}
                      onChange={(e) => updateRoom(room.id, "price", parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-200 rounded-sm pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#0d2b4e] text-[#0d2b4e] font-bold"
                    />
                  </div>
                  <p className="text-[#c49a6c] text-xs mt-1 font-semibold">
                    {formatPrice(room.price)}/night
                  </p>
                </div>

                {/* Formatted preview */}
                <div className="flex items-end">
                  <div className="w-full bg-[#0d2b4e] rounded-sm px-4 py-2.5 text-center">
                    <p className="text-white/50 text-xs">Display Price</p>
                    <p className="text-[#c49a6c] font-black text-xl">{formatPrice(room.price)}</p>
                    <p className="text-white/30 text-xs">/night</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Description
                </label>
                <textarea
                  value={room.description}
                  onChange={(e) => updateRoom(room.id, "description", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d2b4e] text-gray-600 resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#0d2b4e] hover:bg-[#1a4a7a] disabled:opacity-50 text-white px-8 py-3.5 rounded-sm font-bold tracking-widest uppercase transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>

        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-sm">
          <p className="text-amber-800 text-sm font-semibold mb-1">Manual file editing</p>
          <p className="text-amber-700 text-xs leading-relaxed">
            You can also edit <code className="bg-amber-100 px-1 rounded">data/rooms.json</code> directly
            in a text editor. After editing, restart the server (<code className="bg-amber-100 px-1 rounded">npm run dev</code>)
            for the changes to reflect. The admin form above syncs to the same file.
          </p>
        </div>
      </main>
    </div>
  );
}
