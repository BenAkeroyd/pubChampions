import "./globals.css";
import ClientShell from "./ClientShell";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "PubChampions",
  description: "PubChampions",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <ClientShell>{children}</ClientShell>
        </AuthProvider>
      </body>
    </html>
  );
}