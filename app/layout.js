import { Space_Grotesk, Bricolage_Grotesque } from "next/font/google";
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

export const metadata = {
  title: "WrapIt - Don't Send Boring Gifts.",
  description: "Stop sending screenshots. Wrap your digital gifts in an interactive, mind-blowing experience.",
  keywords: "digital gifts, gift cards, subscriptions, gaming, neo-brutalism",
  openGraph: {
    title: "WrapIt - Make It Fun",
    description: "The cure for boring digital gifts.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${bricolage.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

