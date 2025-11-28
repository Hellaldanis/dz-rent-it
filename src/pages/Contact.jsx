import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => { window.scrollTo(0,0); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé (demo). Nous vous répondrons bientôt.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">{t('contactUs')}</h1>
        <form onSubmit={handleSubmit} className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 space-y-4">
          <label className="block">
            <span className="text-sm text-text-light dark:text-text-dark">Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full rounded-lg border border-secondary-light dark:border-secondary-dark px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark" required />
          </label>

          <label className="block">
            <span className="text-sm text-text-light dark:text-text-dark">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 block w-full rounded-lg border border-secondary-light dark:border-secondary-dark px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark" required />
          </label>

          <label className="block">
            <span className="text-sm text-text-light dark:text-text-dark">Message</span>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="5" className="mt-1 block w-full rounded-lg border border-secondary-light dark:border-secondary-dark px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark" required />
          </label>

          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg">Send Message</button>
            <button type="button" onClick={() => setForm({ name: '', email: '', message: '' })} className="px-5 py-2 border rounded-lg">Reset</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
