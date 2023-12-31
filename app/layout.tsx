import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import { Footer } from "@/components/footer/Footer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "@/theme";
import { AuthSessionProvider } from "@/context/auth/AuthSessionProvider";
import { SocketProvider, UiProvider } from "@/context";
import { NavbarMain, SideMenu } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get your mind up",
  description: "Improve your mental health thanks to our tips and actions to take",
};

export default function RootLayout({children} : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          <AuthSessionProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <nav>
                  <NavbarMain />
                </nav>
                <SideMenu />
                <main className="flex flex-col items-center gap-4 min-h-screen p-4 pt-24">
                  {children}
                </main>
                <Footer />
              </ThemeProvider>
            </UiProvider>
          </AuthSessionProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
