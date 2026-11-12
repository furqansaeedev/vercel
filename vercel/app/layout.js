import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'Register → Login → Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}