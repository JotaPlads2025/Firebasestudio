import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { TikTokIcon } from './ui/icons';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link href="#" className="text-sm hover:underline">
            Terminos y condiciones
          </Link>
          <a
            href="mailto:hola@plads.cl"
            className="text-sm hover:underline"
          >
            Contactanos
          </a>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm hidden sm:block">Nuestras redes sociales</p>
          <a
            href="https://www.instagram.com/pladsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.tiktok.com/pladsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
            aria-label="TikTok"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
