import "./globals.css";

export const metadata = {
  title: "AR Nails",
  description: "Beautiful, glamorous nails you'll love!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Great Vibes for headings/logo, Poppins for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
