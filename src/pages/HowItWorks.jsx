import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const steps = [
  {
    number: '01',
    title: 'Search & Discover',
    titleFr: 'Rechercher & Découvrir',
    description: 'Browse through thousands of items or search by category to find exactly what you need.',
    descriptionFr: 'Parcourez des milliers d\'objets ou recherchez par catégorie pour trouver exactement ce dont vous avez besoin.',
    icon: 'search',
    color: 'bg-blue-500'
  },
  {
    number: '02',
    title: 'Check Availability',
    titleFr: 'Vérifier la Disponibilité',
    description: 'Select your dates and view pricing. See owner ratings and reviews to make informed decisions.',
    descriptionFr: 'Sélectionnez vos dates et consultez les prix. Consultez les notes et avis pour prendre des décisions éclairées.',
    icon: 'calendar_month',
    color: 'bg-green-500'
  },
  {
    number: '03',
    title: 'Request & Confirm',
    titleFr: 'Demander & Confirmer',
    description: 'Send a rental request to the owner. Once accepted, you\'ll receive confirmation and pickup details.',
    descriptionFr: 'Envoyez une demande de location au propriétaire. Une fois acceptée, vous recevrez la confirmation et les détails de récupération.',
    icon: 'handshake',
    color: 'bg-purple-500'
  },
  {
    number: '04',
    title: 'Enjoy & Return',
    titleFr: 'Profiter & Retourner',
    description: 'Pick up the item, use it during your rental period, and return it in the same condition.',
    descriptionFr: 'Récupérez l\'objet, utilisez-le pendant votre période de location et retournez-le dans le même état.',
    icon: 'check_circle',
    color: 'bg-orange-500'
  }
];

export default function HowItWorks() {
  const { t, language } = useLanguage();

  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            {language === 'ar' ? 'كيف يعمل DZ-RentIt' : t('howItWorks')}
          </h1>
          <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'عملية بسيطة وآمنة لاستئجار أو تأجير أي شيء تحتاجه في 4 خطوات سهلة'
              : 'A simple and secure process to rent or lend anything you need in 4 easy steps'
            }
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (hidden on mobile, shown on desktop for flow) */}
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-transparent z-0" 
                     style={{ transform: index % 2 === 0 ? 'translateY(-50%)' : 'translateY(-50%) translateX(-100%)', left: index % 2 === 0 ? '100%' : 'auto', right: index % 2 === 1 ? '100%' : 'auto' }} 
                />
              )}
              
              <div className="bg-background-light dark:bg-secondary-dark rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${step.color} opacity-5 rounded-full -mr-16 -mt-16`} />
                
                {/* Number Badge */}
                <div className="flex items-start gap-6 mb-4">
                  <div className={`${step.color} w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg`}>
                    {step.number}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                      {language === 'ar' ? step.titleFr : step.title}
                    </h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                      {language === 'ar' ? step.descriptionFr : step.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-end mt-4">
                  <span className={`material-symbols-outlined text-6xl ${step.color.replace('bg-', 'text-')} opacity-20`}>
                    {step.icon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {language === 'ar' 
              ? 'انضم إلى آلاف المستخدمين الذين يستأجرون ويؤجرون على DZ-RentIt'
              : 'Join thousands of users who are renting and lending on DZ-RentIt'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="px-8 py-3 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {language === 'ar' ? 'تصفح العناصر' : 'Browse Items'}
            </Link>
            <Link to="/publish" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
              {language === 'ar' ? 'انشر عنصر' : 'List an Item'}
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
            </div>
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
              {language === 'ar' ? 'آمن ومضمون' : 'Safe & Secure'}
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              {language === 'ar' ? 'جميع المستخدمين تم التحقق منهم' : 'All users are verified'}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
            </div>
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
              {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              {language === 'ar' ? 'فريقنا جاهز للمساعدة' : 'Our team is here to help'}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">payments</span>
            </div>
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
              {language === 'ar' ? 'دفع آمن' : 'Secure Payments'}
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              {language === 'ar' ? 'معاملات محمية' : 'Protected transactions'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
