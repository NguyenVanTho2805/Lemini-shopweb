'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Heart, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NAV = [
  { href: '/account', label: 'Tổng quan', icon: LayoutDashboard, exact: true },
  { href: '/account/orders', label: 'Đơn hàng', icon: ShoppingBag },
  { href: '/account/wishlist', label: 'Yêu thích', icon: Heart },
  { href: '/account/profile', label: 'Hồ sơ', icon: User },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      openAuthModal('login');
      router.replace('/');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const initials = user!.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  return (
    <>
      <Header />
      <div className="account-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="breadcrumb-inner">
            <Link href="/">Trang chủ</Link>
            <ChevronRight size={13} />
            <span>Tài khoản</span>
          </div>
        </div>

        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            {/* User info */}
            <div className="user-card">
              <div className="avatar">{initials}</div>
              <div className="user-info">
                <p className="user-name">{user!.name}</p>
                <p className="user-email">{user!.email}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
              {NAV.map(item => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${active ? 'active' : ''}`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <button className="logout-btn" onClick={logout}>
              <LogOut size={16} />
              Đăng xuất
            </button>
          </aside>

          {/* Content */}
          <main className="account-content">
            {children}
          </main>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .account-page {
          min-height: 100vh;
          background: var(--color-bg-alt);
        }

        .breadcrumb-bar {
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          padding: 14px var(--section-pad-x);
        }

        .breadcrumb-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--color-text-muted);
        }

        :global(.breadcrumb-inner a) {
          color: var(--color-text-secondary);
          transition: color 0.2s;
        }

        :global(.breadcrumb-inner a:hover) { color: var(--color-primary); }
        .breadcrumb-inner span { color: var(--color-text); font-weight: 500; }

        .account-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 28px;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 32px var(--section-pad-x) 80px;
          align-items: start;
        }

        /* Sidebar */
        .account-sidebar {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 20px;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          color: #fff;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.4);
        }

        .user-info { min-width: 0; }

        .user-name {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-nav {
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-bottom: 1px solid var(--color-border);
        }

        :global(.sidebar-link) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: var(--radius-md);
          font-size: 14px;
          color: var(--color-text-secondary);
          transition: var(--transition-fast);
          font-weight: 500;
        }

        :global(.sidebar-link:hover) {
          background: var(--color-bg-alt);
          color: var(--color-primary);
        }

        :global(.sidebar-link.active) {
          background: var(--color-accent-muted);
          color: var(--color-accent);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 14px 20px;
          border: none;
          background: transparent;
          font-size: 14px;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color 0.2s;
          text-align: left;
          font-family: var(--font-body);
        }

        .logout-btn:hover { color: var(--color-sale); }

        /* Content */
        .account-content {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          min-height: 500px;
        }

        @media (max-width: 768px) {
          .account-layout {
            grid-template-columns: 1fr;
          }

          .account-sidebar {
            display: flex;
            flex-direction: row;
            overflow: hidden;
          }

          .user-card {
            flex-direction: column;
            padding: 16px;
            min-width: 120px;
          }

          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
            border-bottom: none;
            border-left: 1px solid var(--color-border);
            flex: 1;
          }

          .logout-btn { padding: 8px 12px; font-size: 12px; }
        }
      `}</style>
    </>
  );
}
