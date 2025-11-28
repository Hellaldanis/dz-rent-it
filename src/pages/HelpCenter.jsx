import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function HelpCenter() {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">{t('helpCenter')}</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark">Besoin d'aide ? Consultez nos ressources ou contactez l'équipe via la page de contact.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Account Issues</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-2">Troubleshooting et FAQ pour les problèmes de compte.</p>
          </div>
          <div className="bg-background-light dark:bg-secondary-dark rounded-xl p-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Safety & Trust</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mt-2">Conseils pour louer et prêter en toute sécurité.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
