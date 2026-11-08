import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/authContext';
import Navbar from '@/components/Navbar';

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
      <body className="bg-[#0b111a] text-slate-100 min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-[#080d14] border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 space-y-2">
              <p className="font-semibold text-slate-400">
                UNIVERSIDAD AZTLÁN • INGENIERÍA INDUSTRIAL • DÉCIMO CUATRIMESTRE
              </p>
              <p>
                Materia: Diseño de Plantas (Clave 1057) • 6 Créditos • Horas Frente a Docente: 14 • Horas Independientes: 82
              </p>
              <p className="text-[11px] text-slate-600">
                Coordinador del Curso: Dr. Luis Garibaldi • Desarrollado con tecnología de simulación vectorial CAD
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
