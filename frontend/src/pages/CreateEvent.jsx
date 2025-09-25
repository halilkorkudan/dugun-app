import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";


export default function CreateEvent() {
    const [names, setNames] = useState("");
    const [date, setDate] = useState("");
    const [theme, setTheme] = useState("classic");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventId = generateEventId(names, date);

        // Event verilerini localStorage veya backend'e kaydedebilirsin
        localStorage.setItem(eventId, JSON.stringify({ names, date, theme }));

        // Event sayfasına yönlendir
        navigate(`/event/${eventId}`);
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Düğününü Oluştur 🎉</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Çiftin adı (örn: Ali & Ayşe)"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 rounded"
                />
                <ThemeSelector selected={theme} onChange={setTheme} />
                <button
                    type="submit"
                    className="bg-pink-500 text-white rounded p-2 hover:bg-pink-600"
                >
                    Düğünü Oluştur
                </button>
            </form>
        </div>
    );
}

// Event ID üretme fonksiyonu
function generateEventId(names, date) {
    return names
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") + "-" + date;
}
