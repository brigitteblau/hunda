import Footer from "@/components/footer";
import { AuthModalProvider } from "@/app/login/auth-modal-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthModalProvider>
      {children}
      <Footer />
    </AuthModalProvider>
  );
}
