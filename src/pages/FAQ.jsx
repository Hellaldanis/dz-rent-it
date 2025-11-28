import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const faqs = [
  { q: 'How do I book an item?', a: 'Select dates on the item page and send a request to the owner.' },
  { q: 'What if the item is damaged?', a: 'Report to the owner immediately; follow the platform dispute process.' },
  { q: 'How are payments handled?', a: 'Payments are processed through the platform (mocked in demo).'},
];

export default function FAQ() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">{t('faq')}</h1>
        <div className="space-y-4">
          {faqs.map((f,i) => (
            <div key={i} className="bg-background-light dark:bg-secondary-dark rounded-xl p-4">
              <h3 className="font-semibold text-text-light dark:text-text-dark">{f.q}</h3>
              <p className="text-text-muted-light dark:text-text-muted-dark mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
