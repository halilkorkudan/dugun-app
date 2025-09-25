import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { eventId } = useParams();
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

  if (loading) return <p>Yükleniyor...</p>;
  if (!eventData) return <h1>Düğün bulunamadı</h1>;

  const { names, date, theme } = eventData;

  const themeStyles = {
    classic: "bg-pink-50 text-pink-700",
    modern: "bg-blue-50 text-blue-700",
    romantic: "bg-red-50 text-red-700",
  };

  return (
    <div className={`min-h-screen p-6 ${themeStyles[theme] || ""}`}>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">{names} 🎉</h1>
        <h2 className="text-xl mb-2">Tarih: {date}</h2>
        <h3 className="text-lg mb-4">Tema: {theme}</h3>
        <p>Buraya galeri veya diğer düğün detayları gelecek...</p>
      </div>
    </div>
  );
}
