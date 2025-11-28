import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">{t('aboutUs')}</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
          DZ-RentIt est une plateforme de location qui met en relation des propriétaires d'objets et des personnes souhaitant les louer. Notre mission est de faciliter l'accès aux équipements de qualité, en toute confiance.
        </p>

        <section className="mt-8 bg-background-light dark:bg-secondary-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Notre histoire</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Lancée en 2024, DZ-RentIt a été créée pour aider les particuliers et les professionnels à partager leurs équipements et gagner un revenu supplémentaire.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
