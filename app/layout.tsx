import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/authContext';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'Diseño de Plantas Industriales con AutoCAD | Universidad Aztlán',
  description: 'Portal educativo oficial de la materia Diseño de Plantas (Clave 1057). Aprendizaje de AutoCAD básico a avanzado con normativas NOM, ISO, ASME y prácticas virtuales interactivas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#0A0A0A] text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            <AuthGuard>
              {children}
            </AuthGuard>
          </main>
          <footer className="bg-[#050505] border-t border-[#222222] py-8 text-center text-xs text-neutral-500">
            <div className="w-full px-4 sm:px-6 lg:px-10 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E51020]"></span>
                <span className="font-semibold text-neutral-300">
                  UNIVERSIDAD AZTLÁN • INGENIERÍA INDUSTRIAL • DÉCIMO CUATRIMESTRE
                </span>
              </div>
              <p>
                Materia: Diseño de Plantas (Clave 1057) • 6 Créditos • Horas Frente a Docente: 14 • Horas Independientes: 82
              </p>
              <p className="text-[11px] text-neutral-600">
                Coordinador del Curso: Dr. Luis Garibaldi • Desarrollado con tecnología de simulación vectorial AutoCAD
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
