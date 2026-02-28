import "./globals.css";
import ClientShell from "./ClientShell";

export const metadata = {
  title: "PubChampions",
  description: "PubChampions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}