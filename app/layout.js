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
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";


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
  title: "MyScrapbook - Create Cute Digital Albums & Aesthetic Scrapbooks Online",
  description: "Create stunning aesthetic scrapbooks and cute digital albums with beautiful templates. Design personalized memory books, digital photo albums, and creative scrapbook gifts. Perfect for birthdays, anniversaries, and special moments.",
  keywords: "cute digital album, aesthetic scrapbook, digital scrapbook maker, online scrapbook creator, digital memory book, virtual photo album, personalized digital gift, scrapbook online, digital album maker, aesthetic photo album, cute memory book, digital scrapbooking, creative photo book, online memory book, digital gift book, scrapbook templates, photo collage book, digital keepsake, interactive photo album, custom scrapbook, digital photo book, aesthetic album, cute scrapbook ideas, online photo album, digital scrapbook templates, memory keeper, photo memory book, personalized album, digital scrapbook gift, creative memory book, MyScrapbook, myscrapebook",
  authors: [{ name: "MyScrapbook" }],
  creator: "MyScrapbook",
  publisher: "MyScrapbook",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MyScrapbook - Create Cute Digital Albums & Aesthetic Scrapbooks",
    description: "Design beautiful aesthetic scrapbooks and cute digital albums online. Create personalized memory books with stunning templates. Perfect for gifting special moments.",
    type: "website",
    siteName: "MyScrapbook",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyScrapbook - Create Cute Digital Albums & Aesthetic Scrapbooks",
    description: "Design beautiful aesthetic scrapbooks and cute digital albums online. Create personalized memory books with stunning templates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://myscrapebook.com",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

