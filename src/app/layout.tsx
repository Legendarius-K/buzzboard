import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClientProvider } from "../../providers/query-client-provider";
import { Toaster } from "sonner";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "BuzzBoard",
    description: "Buzz away you little buzzling",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className=" h-screen">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased flex flex-col`}
            >
                <QueryClientProvider>
                    <Toaster />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
