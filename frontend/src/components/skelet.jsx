import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventPage from "../pages/EventPage";
import {
  Heart,
  Sparkles,
  Crown,
  Diamond,
  Music,
  User,
  Upload,
  Camera,
  X,
} from "lucide-react";

export default function Skelet({ theme }) {
  const { eventId } = useParams();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!res.ok) throw new Error("Event bulunamadı");
        const data = await res.json();
        setEventData(data);
      } catch (err) {
        console.error(err);
        setEventData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const names = eventData?.names || [];

  if (loading) return <p>Yükleniyor...</p>;
  if (!eventData) return <p>Etkinlik bulunamadı</p>;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${theme.background}`}>
      {/* Dekoratif ikonlar */}
      <div className="absolute top-10 left-10 opacity-20">
        <Crown className="w-16 h-16" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Diamond className="w-12 h-12" />
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-15">
        <Music className="w-8 h-8" />
      </div>

      {!isLoggedIn ? (
        <div className={`rounded-2xl shadow-lg w-full max-w-md p-8 relative z-10 ${theme.card}`}>
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow">
                <Heart className="w-12 h-12" />
              </div>
              <div className="absolute -top-2 -right-2 rounded-full p-1">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h1 className={`text-2xl font-bold mb-3 ${theme.primary}`}>
              {names} <br />
              Düğününe Hoşgeldiniz!
            </h1>
            <p className={theme.secondary}>Mutlu anılarınızı bizimle paylaşın ✨</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme.primary}`}>
                Adınız
              </label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Adınızı girin"
                  className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setIsLoggedIn(true)}
              disabled={!userName.trim()}
              className={`w-full py-3 rounded-lg font-bold disabled:opacity-50 ${theme.button}`}
            >
              Devam Et
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto px-4 py-6 relative z-10">
          {/* Header */}
          <div className={`rounded-xl shadow p-6 mb-8 ${theme.card}`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-bold ${theme.primary}`}>
                Hoşgeldin, {userName}!
              </h1>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-2 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className={`rounded-xl shadow p-8 mb-8 text-center ${theme.card}`}>
            <div className="mb-6">
              <Camera className="w-10 h-10 mx-auto mb-2" />
              <h3 className={`text-xl font-bold ${theme.primary}`}>Fotoğraf & Video Yükle</h3>
              <p className={`${theme.secondary} text-sm`}>
                Anılarınızı bizimle paylaşın.
              </p>
            </div>

            <label className={`inline-flex items-center px-6 py-3 rounded-lg cursor-pointer ${theme.button}`}>
              <Upload className="w-5 h-5 mr-2" />
              <span>Dosya Seç</span>
              <input type="file" multiple className="hidden" />
            </label>
          </div>

          {/* Yüklenen Fotoğraflar Alanı */}
          <div className={`rounded-xl shadow p-8 text-center ${theme.card}`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.primary}`}>
              Yüklenen Anılar
            </h2>
            <p className={theme.secondary}>Henüz bir dosya yüklenmedi.</p>
          </div>
        </div>
      )}
    </div>
  );
}
