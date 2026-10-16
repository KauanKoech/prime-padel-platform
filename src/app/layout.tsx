import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arena } from "../content/arena";
import "./globals.css";

export const metadata: Metadata = {
  title: arena.name,
  description: `Conheça as quadras da ${arena.name} em ${arena.city}, confira os valores e experimente o agendamento demonstrativo.`,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
