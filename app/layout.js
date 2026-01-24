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
  title: "MyScrapebook | Interactive Digital Scrapbooks, Scratch Cards & Virtual Albums",
  description: "Create professional yet cute digital scrapbooks with interactive features. Build aesthetic memory books with scratch cards, secret envelopes, and polaroid galleries. The perfect virtual gift for birthdays, anniversaries, and visual storytelling.",
  keywords: "digital scrapbook, scratch cards online, interactive photo album, virtual polaroid book, digital memory book, cute scrapbook ideas, online gift maker, aesthetic digital album, MyScrapebook, digital envelopes, secret message cards, virtual scraping, love letter online, interactive scrapbook maker, digital gifts",
  authors: [{ name: "MyScrapebook" }],
  creator: "MyScrapebook",
  publisher: "MyScrapebook",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MyScrapebook | Interactive Digital Scrapbooks & Scratch Cards",
    description: "Design stunning digital scrapbooks with interactive scratch cards, envelopes, and polaroids. The cutest way to share memories online.",
    type: "website",
    siteName: "MyScrapebook",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyScrapebook | Interactive Digital Scrapbooks & Scratch Cards",
    description: "Create aesthetic, interactive scrapbooks with virtual scratch cards and polaroids. Start your story today.",
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

