import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  romanticTheme,
  classicTheme,
  darkTheme,
  vibrantTheme,
} from "../themes";
import Skelet from "../components/skelet";

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
    romantic: romanticTheme,
    classic: classicTheme,
    dark: darkTheme,
    vibrant: vibrantTheme,
  };

  const currentTheme = themeStyles[theme] || classicTheme;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${currentTheme.background}`}>
      {/* Skelet yapısı */}
      <Skelet theme={currentTheme} />
    </div>
  );
}
