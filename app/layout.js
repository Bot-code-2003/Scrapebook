import { 
  Space_Grotesk, 
  Bricolage_Grotesque,
  Playfair_Display,
  Dancing_Script,
  Caveat,
  Poppins,
  Quicksand,
  Pacifico,
  Satisfy,
  Great_Vibes,
  Cormorant_Garamond,
  Lora,
  Montserrat,
  Sacramento,
  Comfortaa
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AudioProvider } from "@/context/AudioContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "myscrapbook | Cute Digital Scrapbooks & Kawaii Memory Books Online",
  description: "Create adorable, aesthetic digital scrapbooks with interactive features like scratch cards, secret envelopes, and polaroid galleries. The cutest way to make personalized gifts for birthdays, anniversaries, Valentine's Day, and long-distance relationships. Free kawaii scrapbook maker!",
  keywords: [
    // Core product keywords
    "digital scrapbook", "online scrapbook maker", "virtual scrapbook", "digital memory book",
    "interactive photo album", "digital photo book", "online memory album", "virtual photo album",
    
    // Cute/Kawaii aesthetic keywords
    "cute scrapbook", "kawaii scrapbook", "aesthetic scrapbook", "pretty digital album",
    "cute memory book", "adorable photo book", "pastel scrapbook", "soft aesthetic album",
    "kawaii gift ideas", "cute online gift", "aesthetic gift", "pretty memory book",
    
    // Gift occasion keywords  
    "birthday gift ideas", "anniversary gift", "valentine gift online", "romantic gift",
    "long distance relationship gift", "ldr gift ideas", "gift for girlfriend", "gift for boyfriend",
    "personalized gift", "custom photo gift", "sentimental gift", "meaningful gift ideas",
    "friendship gift", "best friend gift", "thank you gift", "graduation gift",
    
    // Interactive features
    "scratch cards online", "digital envelopes", "secret message cards", "interactive gift",
    "virtual polaroid book", "flip book online", "3d flip book", "page turning animation",
    
    // Emotional/descriptive
    "handmade digital gift", "heartfelt gift", "romantic scrapbook", "love letter online",
    "memory keeper", "photo memories", "cherish memories", "keepsake album",
    
    // Alternative searches
    "canva alternative scrapbook", "free scrapbook maker", "easy photo book creator",
    "diy digital scrapbook", "no download scrapbook", "browser scrapbook maker",
    "myscrapbook", "my scrapbook online", "scrapbook app"
  ].join(", "),
  authors: [{ name: "myscrapbook", url: "https://myscrapbook.thestorybits.com" }],
  creator: "myscrapbook",
  publisher: "myscrapbook",
  category: "Design",
  classification: "Gift & Memory App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "myscrapbook | Create Cute Digital Scrapbooks & Kawaii Gifts",
    description: "The cutest way to make digital scrapbooks! Create aesthetic memory books with scratch cards, secret envelopes & polaroids. Perfect for birthdays, anniversaries & LDR gifts. Free & easy! 💕",
    type: "website",
    siteName: "myscrapbook",
    locale: "en_US",
    url: "https://myscrapbook.thestorybits.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "myscrapbook - Create cute digital scrapbooks",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "myscrapbook | Cute Digital Scrapbooks & Kawaii Memory Books",
    description: "Create adorable digital scrapbooks with scratch cards & polaroids. The prettiest way to share memories! 💕",
    images: ["/og-image.png"],
    creator: "@myscrapbookapp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://myscrapbook.thestorybits.com",
  },
  // verification: {
  //   google: "ADD_YOUR_SEARCH_CONSOLE_CODE_HERE",
  // },
  icons: {
    icon: '/heart-favicon.ico',
    shortcut: '/heart-favicon.ico',
    apple: '/heart-favicon.ico',
  },
  other: {
    "theme-color": "#FFFBF7",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "myscrapbook",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`
        ${spaceGrotesk.variable} 
        ${bricolage.variable} 
        ${playfair.variable}
        ${dancing.variable}
        ${caveat.variable}
        ${poppins.variable}
        ${quicksand.variable}
        ${pacifico.variable}
        ${satisfy.variable}
        ${greatVibes.variable}
        ${cormorant.variable}
        ${lora.variable}
        ${montserrat.variable}
        ${sacramento.variable}
        ${comfortaa.variable}
        font-sans antialiased
      `}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "272467631091-l5msn1iovv10vmqjnjumtvbpem29s31i.apps.googleusercontent.com"}>
          <AuthProvider>
            <AudioProvider>
              {children}
            </AudioProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GLKTTKC6WR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GLKTTKC6WR');
          `}
        </Script>
      </body>
    </html>
  );
}

