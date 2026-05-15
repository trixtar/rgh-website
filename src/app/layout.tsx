import { League_Spartan, Fredericka_the_Great, Oswald } from 'next/font/google';
import './globals.css';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
});

const frederickaTheGreat = Fredericka_the_Great({
  variable: '--font-fredericka',
  subsets: ['latin'],
  weight: ['400'],
  fallback: ['serif'],
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={`${leagueSpartan.variable} ${frederickaTheGreat.variable} ${oswald.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className='min-h-screen flex flex-col overflow-x-hidden'>
        {children}
      </body>
    </html>
  )
}