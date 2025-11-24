import { useParams } from 'react-router-dom';
import Header from '../components/Header';

export default function ItemDetail() {
  const { id } = useParams();

  // Mock data - dans une vraie app, on ferait un fetch avec l'id
  const item = {
    id: id,
    title: "High-Quality Professional Camera",
    description: "Professional-grade camera perfect for photography enthusiasts and professionals. Includes lens, tripod, carrying case, and all necessary accessories.",
    price: 85,
    location: "Algiers, Algeria",
    owner: {
      name: "Ahmed Benali",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC45IZEopj1c7Sv4duCahD6HWeQrrsaeIvRdIxcjyVU883D_aiGdjrHcoYWRzvmbw0OD4WuCN75gblnMUtqRdbdvoWTBO-0t3qkW3nEvKH_0w52q5dGz66j9A1YPq3xVPw6pBEa3iUO0YyVhGsjlVq5AeeURlHtFCDjy6hsIWL1I2Tq0ra1FBv0gfXwvYYyrAUnKPJZ9DrRU79AlIgsF9-k69q22kUGhwvCNHt1tqXwtl8Kn_lfQVg_tZW2MJZMApUdYRECGBI45z6D"
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HtuWaNVfNfn2484Fkukx-ArX3ZRk7om4gGiPZdMwWKDmIgejljz5pMawx6gm4HOLe27zpcR16f1yU0JwUOh9NCUC2cBUrBK4Ldj100Xz5Dhq3e5flbNHbVASfz-iGjOUJiDvV-l8nO_nO2bS7PtdTCCWt7DK01_qU0bBlAWBktPyfaAkOHBJzP1Cvg1R-qQxCHw18MwCJzR3i5aJDWMmdnZzOl6ejIyEngHOdNw16gxRWco0GHtUEdH0fRrka6fpGznScIGgRqHA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzEuPKamw9prGcV0OX94hF70ROG3uzShcR2Y0LKDDU1QzMLfattBAdP4aDc2EGR8W0lDW-wwvMZuEcuy_c6P8P7kh7oVIWSTxsVixCCmzGzhp8hTyT39KFYybUV2hhfhRoWaUBkuxsM38Pm5hSN21du5DYo75-xdB9fsdQdnv0i1THHJYmJmPcOyoMPBobd7HL1qrUJUpmS1a9yr0ImG99Ycyp8j4iPJHqx8l7fqA2e5PY-3q4W6-2XrOiCsH6U5_tIqu26CBUiewn",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7h_nvcBRl8c_HGz2XgB5eY4NHeKmWnGSPpiVvc_jcMaxovXpw8BNMXy6K8OGXoEdq46x7Oh6wOvLbcugxO4nf672BrR414vC8oR52RS8f0DWEEN-nQK5eZZBgnmTAS7E7pJsfSqPykoDTA8h7J3jA4ADu-55SjO56-F04PGqXmy-pCQSYDI9MpISZdmTa-__IrLnll3hAvcH8fZ_DTKne2Z9CI1veZH9joi1LNGlbyfEtDzWxz_35Jlh9obSoMF8uf0aTDZPTE9j2",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDy-l5toBkWti97DTmEftbV5cv3PTIyUroMg3AslXaKuO88eycDLbxbj0KYd6mSuqo2X3xKWbh3mM8K9AkoVf_bMwA1kPMUHG_g2gMiD1UydzrDbgt_OfpK-ZGfpC0tSBKTbMy4zF-qHXL6Mu2DSdtvOYmyEK5KMutw5QcpAnKDzAeG9p40eovq9gb3d6rC2DPep7IF_yK_JzpJHwwUNnxA8cvhfCTUYDEESGYw_WRg16bNa3ZRCuQs_zih-yxmJpoJFtbzAB9Q1ZYu"
    ],
    features: [
      "42MP Full-Frame Sensor",
      "8K Video Recording",
      "Dual Card Slots",
      "In-Body Image Stabilization",
      "Weather Sealed Body"
    ]
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      
      <main className="flex-1 px-4 md:px-10 py-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <h1 className="text-text-light dark:text-text-dark text-3xl md:text-4xl font-black leading-tight tracking-tight">
            {item.title}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Images */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div 
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-xl min-h-80 aspect-video"
                style={{ backgroundImage: `url("${item.images[0]}")` }}
              />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
                {item.images.slice(1).map((img, idx) => (
                  <div 
                    key={idx}
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url("${img}")` }}
                  />
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-xl bg-background-light dark:bg-secondary-dark p-6 shadow-lg">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-4xl font-bold text-primary">${item.price}</p>
                    <p className="text-text-muted-light dark:text-text-muted-dark">per day</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">location_on</span>
                    <span className="text-text-light dark:text-text-dark">{item.location}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">Start Date</span>
                      <input 
                        type="date" 
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">End Date</span>
                      <input 
                        type="date" 
                        className="form-input rounded-lg border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark"
                      />
                    </label>
                  </div>

                  <button className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                    Request to Rent
                  </button>

                  <button className="w-full py-3 px-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">chat</span>
                      Message Owner
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Description</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {item.description}
              </p>

              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Features</h2>
              <ul className="space-y-2">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-text-light dark:text-text-dark">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Owner Info */}
            <div className="lg:col-span-1">
              <div className="rounded-xl bg-background-light dark:bg-secondary-dark p-6 shadow-sm">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Owner</h2>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${item.owner.avatar}")` }}
                  />
                  <div>
                    <p className="font-bold text-text-light dark:text-text-dark">{item.owner.name}</p>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Member since 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
