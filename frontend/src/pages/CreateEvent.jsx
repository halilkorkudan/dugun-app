import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";

export default function CreateEvent() {
    const [names, setNames] = useState("");
    const [date, setDate] = useState("");
    const [mail, setMail] = useState("");
    const [theme, setTheme] = useState("classic");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventId = generateEventId(names, date);

        // Backend API çağrısı
        try {
            const res = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId, names, mail, date, theme }),
            });

            if (!res.ok) throw new Error("Event kaydı başarısız!");

            // Event sayfasına yönlendir
            navigate(`/event/${eventId}`);
        } catch (err) {
            console.error(err);
            alert("Event oluşturulamadı, tekrar deneyin.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Düğününü oluşturalım <br /> merhaba🎉</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="text"
                    required={true}
                    placeholder="Çiftin adı (örn: Ali & Ayşe)"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    className="border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                    type="text"
                    required={true}
                    placeholder="Mail Adresiniz"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                    type="date"
                    required={true}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <ThemeSelector selected={theme} onChange={setTheme} />
                <button
                    type="submit"
                    className="bg-pink-500 text-white rounded p-3 hover:bg-pink-600 transition-all"
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
