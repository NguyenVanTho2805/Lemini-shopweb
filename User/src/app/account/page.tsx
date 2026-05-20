'use client';

import Link from 'next/link';
import { Package, Heart, ArrowRight, ShoppingBag, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Order } from '@/lib/orders';
import { useOrders } from '@/contexts/OrdersContext';
import { formatPrice } from '@/lib/utils';

const STATUS_MAP: Record<Order['status'], { label: string; color: string; icon: React.ElementType }> = {
  pending:   { label: 'Chờ xác nhận', color: 'var(--color-hot)',  icon: Clock },
  shipping:  { label: 'Đang giao',    color: '#3B82F6',            icon: Truck },
  completed: { label: 'Hoàn thành',   color: '#22C55E',            icon: CheckCircle },
  cancelled: { label: 'Đã hủy',       color: 'var(--color-sale)',  icon: XCircle },
};

export default function AccountDashboard() {
  const { user } = useAuth();
  const { count: wishCount } = useWishlist();
  const { orders } = useOrders();

  const recentOrders = orders.slice(0, 2);
  const completedCount = orders.filter(o => o.status === 'completed').length;

  const initials = user!.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();
  const joinYear = new Date(user!.joinedAt).getFullYear();

  return (
    <div className="dashboard">
      {/* Hero welcome */}
      <div className="welcome-banner">
        <div className="welcome-avatar">{initials}</div>
        <div className="welcome-text">
          <h1 className="welcome-name">Xin chào, {user!.name.split(' ').pop()}! 👋</h1>
          <p className="welcome-sub">Thành viên từ năm {joinYear}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon--order">
            <Package size={22} />
          </div>
          <div className="stat-body">
            <p className="stat-value">{orders.length}</p>
            <p className="stat-label">Đơn hàng</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--done">
            <CheckCircle size={22} />
          </div>
          <div className="stat-body">
            <p className="stat-value">{completedCount}</p>
            <p className="stat-label">Hoàn thành</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--heart">
            <Heart size={22} />
          </div>
          <div className="stat-body">
            <p className="stat-value">{wishCount}</p>
            <p className="stat-label">Yêu thích</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--spend">
            <ShoppingBag size={22} />
          </div>
          <div className="stat-body">
            <p className="stat-value">
              {formatPrice(orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0))}
            </p>
            <p className="stat-label">Đã mua</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Đơn hàng gần đây</h2>
          <Link href="/account/orders" className="section-link">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>

        <div className="orders-list">
          {recentOrders.map(order => {
            const s = STATUS_MAP[order.status];
            const Icon = s.icon;
            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-meta">
                    <p className="order-code">{order.code}</p>
                    <p className="order-date">{new Date(order.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <span className="status-badge" style={{ '--badge-color': s.color } as React.CSSProperties}>
                    <Icon size={13} />
                    {s.label}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.productId} className="order-item">
                      <img src={item.image} alt={item.name} className="item-img" />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">x{item.quantity}</p>
                      </div>
                      <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total-label">Tổng cộng:</span>
                  <span className="order-total">{formatPrice(order.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .dashboard { padding: 0; }

        .welcome-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px 32px 28px;
          border-bottom: 1px solid var(--color-border);
          background: linear-gradient(135deg, var(--color-accent-muted) 0%, var(--color-bg-alt) 100%);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .welcome-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: #fff;
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #fff;
          box-shadow: var(--shadow-md);
          flex-shrink: 0;
        }

        .welcome-name {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 4px;
        }

        .welcome-sub {
          font-size: 13px;
          color: var(--color-text-muted);
        }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-bottom: 1px solid var(--color-border);
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 20px;
          border-right: 1px solid var(--color-border);
        }

        .stat-card:last-child { border-right: none; }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon--order  { background: #EEF2FF; color: #6366F1; }
        .stat-icon--done   { background: #F0FDF4; color: #22C55E; }
        .stat-icon--heart  { background: #FFF1F2; color: #F43F5E; }
        .stat-icon--spend  { background: var(--color-accent-muted); color: var(--color-accent); }

        .stat-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--color-text);
        }

        .stat-label {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        /* Section */
        .section {
          padding: 28px 32px 32px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          color: var(--color-primary);
        }

        :global(.section-link) {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent);
          transition: opacity 0.2s;
        }

        :global(.section-link:hover) { opacity: 0.7; }

        /* Orders */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .order-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .order-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: var(--color-bg-alt);
          border-bottom: 1px solid var(--color-border);
        }

        .order-code {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text);
        }

        .order-date {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          background: color-mix(in srgb, var(--badge-color) 12%, transparent);
          color: var(--badge-color);
          border: 1px solid color-mix(in srgb, var(--badge-color) 25%, transparent);
        }

        .order-items {
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .order-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-img {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          flex-shrink: 0;
          background: var(--color-bg-alt);
        }

        .item-info { flex: 1; }

        .item-name {
          font-size: 13px;
          color: var(--color-text);
          font-weight: 500;
        }

        .item-qty {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .item-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary);
        }

        .order-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 12px 18px;
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-alt);
        }

        .order-total-label {
          font-size: 13px;
          color: var(--color-text-muted);
        }

        .order-total {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary);
          font-family: var(--font-display);
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-card:nth-child(2) { border-right: none; }
          .welcome-banner { padding: 20px; }
          .section { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
