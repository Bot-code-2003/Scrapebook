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
  title: "MyScrapbook - Digital Scrapbooks, Albums & Book Spaces for Gifts",
  description: "Create beautiful digital scrapbooks, photo albums, and digital book spaces. The perfect personalized gift for any occasion. Join MyScrapbook today.",
  keywords: "gifts, scrapebooks, digital album, digital book spaces, online scrapbook, virtual photo album, memory book, MyScrapbook, myscrapebook, personalized gifts, creative spaces, digital gifting",
  openGraph: {
    title: "MyScrapbook - Digital Albums & Creative Book Spaces",
    description: "Design and share interactive digital scrapbooks and albums. The ultimate platform for creative gifting and memory keeping.",
    type: "website",
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

