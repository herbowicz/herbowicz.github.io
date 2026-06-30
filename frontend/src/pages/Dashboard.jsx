import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar } from "../components/ui/calendar";
import { useAuth } from "../contexts/AuthContext";
import { useLang } from "../contexts/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate("/", { replace: true });
  }, [loading, user, navigate]);

  const loadBookings = async () => {
    try {
      const { data } = await axios.get(`${API}/bookings`, { withCredentials: true });
      setBookings(data);
    } catch {}
  };

  useEffect(() => {
    if (user) loadBookings();
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    if (!date || !time || !topic.trim()) return;
    setStatus("sending");
    try {
      const dateStr = date.toISOString().slice(0, 10);
      await axios.post(
        `${API}/bookings`,
        { date: dateStr, time, topic, notes },
        { withCredentials: true }
      );
      setStatus("success");
      setTopic("");
      setNotes("");
      setTime("");
      setDate(undefined);
      await loadBookings();
    } catch {
      setStatus("error");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <p className="font-serif italic text-2xl text-stone-700">…</p>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="caption text-stone-500">{t.booking.eyebrow}</p>
        <h1 className="font-serif font-light text-4xl md:text-6xl tracking-tighter mt-3 leading-[1.05]">
          {t.booking.welcome} <span className="italic">{user.name}</span>.
        </h1>
        <p className="mt-6 text-stone-700 max-w-xl text-base md:text-lg leading-relaxed">
          {t.booking.body}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
          <form onSubmit={submit} className="lg:col-span-7 space-y-10" data-testid="booking-form">
            <div>
              <p className="caption text-stone-500 mb-4">{t.booking.dateLabel}</p>
              <div className="inline-block border border-stone-900/10 bg-white/50">
                <Calendar
                  data-testid="booking-calendar"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return d < today || d.getDay() === 0 || d.getDay() === 6;
                  }}
                  className="font-sans"
                />
              </div>
            </div>

            <div>
              <p className="caption text-stone-500 mb-4">{t.booking.timeLabel}</p>
              <div className="grid grid-cols-4 gap-2 max-w-md">
                {SLOTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setTime(s)}
                    data-testid={`time-slot-${s}`}
                    className={`py-3 caption border transition-colors ${
                      time === s
                        ? "bg-stone-900 text-[#FAF9F6] border-stone-900"
                        : "border-stone-900/20 hover:border-stone-900"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="caption text-stone-500 block mb-2">{t.booking.topic}</label>
              <input
                data-testid="booking-topic"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.booking.topicPh}
                className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-400"
              />
            </div>
            <div>
              <label className="caption text-stone-500 block mb-2">{t.booking.notes}</label>
              <textarea
                data-testid="booking-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.booking.notesPh}
                className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors resize-none placeholder:text-stone-400"
              />
            </div>

            {status === "success" && (
              <p data-testid="booking-success" className="font-serif italic text-stone-700 text-lg">
                {t.booking.success}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !date || !time || !topic.trim()}
              data-testid="booking-submit-btn"
              className="bg-stone-900 text-[#FAF9F6] px-10 py-4 caption hover:bg-stone-700 transition-colors disabled:opacity-40"
            >
              {status === "sending" ? t.booking.submitting : t.booking.submit}
            </button>
          </form>

          <aside className="lg:col-span-5 lg:pl-10 lg:border-l border-stone-900/10">
            <p className="caption text-stone-500">{t.booking.upcoming}</p>
            {bookings.length === 0 ? (
              <p className="font-serif italic text-stone-500 mt-6 text-lg">{t.booking.empty}</p>
            ) : (
              <ul className="mt-6 space-y-6" data-testid="bookings-list">
                {bookings.map((b) => (
                  <li key={b.id} className="border-b border-stone-900/10 pb-6">
                    <p className="font-serif text-2xl tracking-tight">
                      {b.date} <span className="text-stone-400">·</span> {b.time}
                    </p>
                    <p className="text-stone-700 mt-2">{b.topic}</p>
                    <p className="caption text-stone-400 mt-2">
                      {t.booking.status}: {b.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
