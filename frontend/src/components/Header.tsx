import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-country">
        <h1>Checkpoint : frontend</h1>
        <Link href="/">Countries</Link>
      </div>
    </header>
  );
}
