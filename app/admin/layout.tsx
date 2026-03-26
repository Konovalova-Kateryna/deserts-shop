export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
}
