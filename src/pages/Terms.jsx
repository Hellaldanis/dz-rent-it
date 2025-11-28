import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { t, language } = useLanguage();

  useEffect(() => { window.scrollTo(0,0); }, []);

  const sections = [
    {
      title: language === 'ar' ? '1. قبول الشروط' : '1. Acceptance of Terms',
      content: language === 'ar' 
        ? 'باستخدام منصة DZ-RentIt، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
        : 'By using the DZ-RentIt platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.'
    },
    {
      title: language === 'ar' ? '2. دور المنصة' : '2. Platform Role',
      content: language === 'ar'
        ? 'DZ-RentIt هي منصة وسيطة تربط بين المالكين والمستأجرين. نحن لا نمتلك أو نتحكم أو نفحص العناصر المدرجة على المنصة. DZ-RentIt ليست مسؤولة عن جودة أو حالة أو سلامة أو قانونية أو دقة أي عنصر.'
        : 'DZ-RentIt is an intermediary platform connecting owners and renters. We do not own, control, or inspect items listed on the platform. DZ-RentIt is not responsible for the quality, condition, safety, legality, or accuracy of any item.'
    },
    {
      title: language === 'ar' ? '3. مسؤولية المستخدم' : '3. User Responsibility',
      content: language === 'ar'
        ? 'المستخدمون مسؤولون بالكامل عن جميع المعاملات والتفاعلات والاتفاقيات التي تتم من خلال المنصة. يجب على المالكين التأكد من أن العناصر آمنة وقانونية وفي حالة عمل جيدة. يجب على المستأجرين فحص العناصر قبل الاستخدام والإبلاغ عن أي مشاكل على الفور.'
        : 'Users are fully responsible for all transactions, interactions, and agreements made through the platform. Owners must ensure items are safe, legal, and in working condition. Renters must inspect items before use and report any issues immediately.'
    },
    {
      title: language === 'ar' ? '4. إخلاء المسؤولية' : '4. Limitation of Liability',
      content: language === 'ar'
        ? 'DZ-RentIt غير مسؤولة عن: (أ) أي أضرار أو خسائر أو إصابات ناتجة عن استخدام العناصر المستأجرة؛ (ب) النزاعات بين المالكين والمستأجرين؛ (ج) فقدان أو سرقة أو تلف العناصر؛ (د) الدفعات الفاشلة أو الاحتيالية؛ (هـ) عدم دقة المعلومات المقدمة من المستخدمين.'
        : 'DZ-RentIt is not liable for: (a) any damages, losses, or injuries resulting from the use of rented items; (b) disputes between owners and renters; (c) loss, theft, or damage to items; (d) failed or fraudulent payments; (e) inaccuracy of information provided by users.'
    },
    {
      title: language === 'ar' ? '5. التأمين والحماية' : '5. Insurance & Protection',
      content: language === 'ar'
        ? 'DZ-RentIt لا توفر تأمينًا على العناصر المدرجة. يُنصح المالكون والمستأجرون بشدة بالحصول على تأمينهم الخاص. يجب على المستخدمين التحقق من شروط التأمين الخاصة بهم قبل إدراج أو استئجار العناصر.'
        : 'DZ-RentIt does not provide insurance for listed items. Owners and renters are strongly advised to obtain their own insurance. Users should verify their insurance terms before listing or renting items.'
    },
    {
      title: language === 'ar' ? '6. الأسعار والدفع' : '6. Pricing & Payment',
      content: language === 'ar'
        ? 'يحدد المالكون أسعارهم الخاصة. تتم المعاملات المالية بين المالكين والمستأجرين مباشرة. DZ-RentIt قد تفرض رسوم خدمة. جميع الأسعار نهائية ما لم يتم الاتفاق على خلاف ذلك بين الأطراف.'
        : 'Owners set their own prices. Financial transactions occur directly between owners and renters. DZ-RentIt may charge a service fee. All prices are final unless otherwise agreed between parties.'
    },
    {
      title: language === 'ar' ? '7. الإلغاء والاسترداد' : '7. Cancellation & Refunds',
      content: language === 'ar'
        ? 'سياسات الإلغاء والاسترداد يحددها كل مالك على حدة. يجب على المستخدمين مراجعة سياسة الإلغاء قبل تأكيد الحجز. DZ-RentIt ليست مسؤولة عن النزاعات المتعلقة بالاستردادات.'
        : 'Cancellation and refund policies are determined by each owner individually. Users must review the cancellation policy before confirming a booking. DZ-RentIt is not responsible for refund disputes.'
    },
    {
      title: language === 'ar' ? '8. سلوك المستخدم' : '8. User Conduct',
      content: language === 'ar'
        ? 'يجب على المستخدمين: (أ) تقديم معلومات دقيقة وصادقة؛ (ب) احترام العناصر المستأجرة؛ (ج) الالتزام بجميع القوانين المحلية؛ (د) التواصل باحترام. يُحظر: السلوك الاحتيالي، التحرش، إساءة استخدام العناصر، الأنشطة غير القانونية.'
        : 'Users must: (a) provide accurate and honest information; (b) respect rented items; (c) comply with all local laws; (d) communicate respectfully. Prohibited: fraudulent behavior, harassment, item misuse, illegal activities.'
    },
    {
      title: language === 'ar' ? '9. التحقق من الحساب' : '9. Account Verification',
      content: language === 'ar'
        ? 'قد يُطلب من المستخدمين التحقق من هويتهم. تحتفظ DZ-RentIt بالحق في تعليق أو إنهاء الحسابات التي تنتهك شروطنا أو تظهر نشاطًا مشبوهًا.'
        : 'Users may be required to verify their identity. DZ-RentIt reserves the right to suspend or terminate accounts that violate our terms or show suspicious activity.'
    },
    {
      title: language === 'ar' ? '10. الملكية الفكرية' : '10. Intellectual Property',
      content: language === 'ar'
        ? 'يحتفظ المستخدمون بملكية المحتوى الذي ينشرونه. من خلال النشر على DZ-RentIt، فإنك تمنح المنصة ترخيصًا غير حصري لاستخدام وعرض المحتوى الخاص بك للأغراض التشغيلية.'
        : 'Users retain ownership of content they post. By posting on DZ-RentIt, you grant the platform a non-exclusive license to use and display your content for operational purposes.'
    },
    {
      title: language === 'ar' ? '11. حل النزاعات' : '11. Dispute Resolution',
      content: language === 'ar'
        ? 'يجب على المستخدمين محاولة حل النزاعات مباشرة. قد توفر DZ-RentIt الوساطة ولكنها ليست ملزمة بذلك. تخضع أي إجراءات قانونية لقوانين ومحاكم الجزائر.'
        : 'Users must attempt to resolve disputes directly. DZ-RentIt may provide mediation but is not obligated to do so. Any legal proceedings are subject to Algerian laws and courts.'
    },
    {
      title: language === 'ar' ? '12. تعديلات الشروط' : '12. Modifications to Terms',
      content: language === 'ar'
        ? 'تحتفظ DZ-RentIt بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات الجوهرية. الاستمرار في استخدام المنصة بعد التغييرات يشكل قبولًا.'
        : 'DZ-RentIt reserves the right to modify these terms at any time. Users will be notified of material changes. Continued use of the platform after changes constitutes acceptance.'
    },
    {
      title: language === 'ar' ? '13. الإنهاء' : '13. Termination',
      content: language === 'ar'
        ? 'يمكن للمستخدمين إنهاء حساباتهم في أي وقت. تحتفظ DZ-RentIt بالحق في إنهاء الحسابات التي تنتهك هذه الشروط دون إشعار مسبق.'
        : 'Users may terminate their accounts at any time. DZ-RentIt reserves the right to terminate accounts that violate these terms without prior notice.'
    },
    {
      title: language === 'ar' ? '14. معلومات الاتصال' : '14. Contact Information',
      content: language === 'ar'
        ? 'للأسئلة حول هذه الشروط، يرجى الاتصال بنا من خلال صفحة الاتصال الخاصة بنا أو عبر البريد الإلكتروني: support@dz-rentit.com'
        : 'For questions about these terms, please contact us through our contact page or email: support@dz-rentit.com'
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-10 py-12 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            {language === 'ar' ? 'الشروط والأحكام' : t('termsConditions')}
          </h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            {language === 'ar' 
              ? 'آخر تحديث: 28 نوفمبر 2025'
              : 'Last Updated: November 28, 2025'
            }
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 flex-shrink-0">warning</span>
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
                {language === 'ar' ? 'إشعار مهم' : 'Important Notice'}
              </h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                {language === 'ar'
                  ? 'DZ-RentIt هي منصة وسيطة فقط. نحن لسنا مسؤولين عن العناصر المدرجة، أو حالتها، أو المعاملات بين المستخدمين. جميع الاتفاقيات تتم مباشرة بين المالكين والمستأجرين.'
                  : 'DZ-RentIt is an intermediary platform only. We are not responsible for listed items, their condition, or transactions between users. All agreements are made directly between owners and renters.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index} className="bg-background-light dark:bg-secondary-dark rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">
                {section.title}
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Agreement Section */}
        <div className="mt-12 p-6 bg-primary/10 dark:bg-primary/20 rounded-xl border-2 border-primary/30">
          <p className="text-text-light dark:text-text-dark text-center">
            {language === 'ar'
              ? 'باستخدام DZ-RentIt، فإنك تقر بأنك قد قرأت وفهمت ووافقت على هذه الشروط والأحكام.'
              : 'By using DZ-RentIt, you acknowledge that you have read, understood, and agree to these Terms and Conditions.'
            }
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
