import { useParams } from "react-router-dom";

export default function EventPage() {
    const { eventId } = useParams();
    const eventData = JSON.parse(localStorage.getItem(eventId));

    if (!eventData) return <h1>Düğün bulunamadı</h1>;

    const { names, date, theme } = eventData;

    return (
        <div>
            <h1>Düğün Sayfası: {eventId}</h1>
            <h2>Çift: {names}</h2>
            <h3>Tarih: {date}</h3>
            <p>Tema: {theme}</p>
        </div>
    );
}
