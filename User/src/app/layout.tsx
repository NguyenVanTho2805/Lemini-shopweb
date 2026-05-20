import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import "@/styles/tokens.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import AuthModal from "@/components/ui/AuthModal";
import CartDrawer from "@/components/ui/CartDrawer";
import PageWrapper from "@/components/layout/PageWrapper";
import { ToastProvider } from "@/contexts/ToastContext";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import QuickViewModal from "@/components/ui/QuickViewModal";
import BackToTop from "@/components/ui/BackToTop";
import CookieConsent from "@/components/ui/CookieConsent";

const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const mulish = Mulish({ 
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Lemini - Từng mũi kim là một tình yêu",
  description: "Cửa hàng bán sản phẩm thêu tay handmade Việt Nam. Tranh thêu, vòng thêu, bộ kit DIY, quà tặng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${mulish.variable}`} style={{ background: '#2E1A4A' }}>
        <AuthProvider>
          <OrdersProvider>
            <WishlistProvider>
              <CartProvider>
                <ToastProvider>
                  <QuickViewProvider>
                    <PageWrapper>
                      {children}
                    </PageWrapper>
                    <AuthModal />
                    <CartDrawer />
                    <QuickViewModal />
                    <BackToTop />
                    <CookieConsent />
                  </QuickViewProvider>
                </ToastProvider>
              </CartProvider>
            </WishlistProvider>
          </OrdersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
