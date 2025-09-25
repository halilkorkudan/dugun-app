export default function ThemeSelector({ selected, onChange }) {
    const themes = [
        { id: "classic", name: "Klasik" },
        { id: "romantic", name: "Romantik" },
        { id: "modern", name: "Modern" },
    ];

    return (
        <div>
            <h2 className="font-semibold mb-2">Tema Seç</h2>
            <div className="flex gap-4">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        type="button" // <-- burası önemli
                        onClick={() => onChange(t.id)}
                        className={`p-2 rounded border ${
                            selected === t.id ? "border-pink-500" : "border-gray-300"
                        }`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
