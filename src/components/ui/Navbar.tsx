import { Link } from "@/i18n/navigation";

export default function Navbar() {
  return (
    <nav className='p-4 flex justify-between items-center'>
      <Link href='/' className='font-semibold text-3xl font-compact'>Rita Gonzalez Hesaynes</Link>
    </nav>
  );
}