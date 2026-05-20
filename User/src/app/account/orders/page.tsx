'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Truck, CheckCircle, XCircle, Package, ChevronDown, ChevronUp, AlertTriangle, ShoppingBag, Star } from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { Order } from '@/lib/orders';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { type Product, mockProducts } from '@/lib/data';

type FilterStatus = 'all' | Order['status'];

const STATUSES: { value: FilterStatus; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'all',       label: 'Tất cả',         icon: Package,     color: 'var(--color-text-muted)' },
  { value: 'pending',   label: 'Chờ xác nhận',   icon: Clock,       color: 'var(--color-hot)' },
  { value: 'shipping',  label: 'Đang giao',       icon: Truck,       color: '#3B82F6' },
  { value: 'completed', label: 'Hoàn thành',      icon: CheckCircle, color: '#22C55E' },
  { value: 'cancelled', label: 'Đã hủy',          icon: XCircle,     color: 'var(--color-sale)' },
];

export default function OrdersPage() {
  const { orders, loading, cancelOrder } = useOrders();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [rebuying, setRebuying] = useState<string | null>(null);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const getStatus = (s: Order['status']) => STATUSES.find(x => x.value === s)!;
  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const handleCancel = async (id: string) => {
    const result = await cancelOrder(id);
    setConfirmCancel(null);
    if (result.ok) {
      showToast('Đơn hàng đã được hủy thành công.', 'success');
    } else {
      showToast(result.error ?? 'Hủy đơn hàng thất bại.', 'error');
    }
  };

  const handleRebuy = (order: Order) => {
    order.items.forEach(item => {
      const source = mockProducts.find(p => p.id === item.productId);
      const p: Product = {
        id: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        slug: source?.slug ?? item.productId,
        category: source?.category ?? '',
      };
      addToCart(p);
    });
    setRebuying(order.id);
    showToast('Đã thêm lại vào giỏ hàng', 'success');
    setTimeout(() => setRebuying(null), 2000);
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1 className="page-title">Đơn hàng của tôi</h1>
        <p className="page-sub">{orders.length} đơn hàng</p>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {STATUSES.map(s => (
          <button
            key={s.value}
            className={`filter-tab ${filter === s.value ? 'active' : ''}`}
            onClick={() => setFilter(s.value)}
            style={{ '--tab-color': s.color } as React.CSSProperties}
          >
            <s.icon size={14} />
            {s.label}
            <span className="tab-count">
              {s.value === 'all' ? orders.length : orders.filter(o => o.status === s.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="orders-list">
        {loading ? (
          <div className="empty">
            <div className="loader" />
            <p>Đang tải đơn hàng...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <Package size={48} strokeWidth={1} />
            <p>Không có đơn hàng nào</p>
          </div>
        ) : (
          filtered.map(order => {
            const s = getStatus(order.status);
            const Icon = s.icon;
            const open = expanded === order.id;

            return (
              <div key={order.id} className="order-card">
                {/* Summary row */}
                <button className="order-summary" onClick={() => toggle(order.id)}>
                  <div className="order-left">
                    <p className="order-code">{order.code}</p>
                    <p className="order-date">{new Date(order.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="order-center">
                    <span className="order-item-count">{order.items.length} sản phẩm</span>
                    <span className="order-total-sm">{formatPrice(order.total)}</span>
                  </div>
                  <div className="order-right">
                    <span className="status-badge" style={{ '--badge-color': s.color } as React.CSSProperties}>
                      <Icon size={12} />
                      {s.label}
                    </span>
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Detail */}
                {open && (
                  <div className="order-detail">
                    {/* Status progress */}
                    {order.status !== 'cancelled' && (
                      <div className="progress-wrap">
                        {(['pending', 'shipping', 'completed'] as const).map((st, idx) => {
                          const labels = { pending: 'Chờ xác nhận', shipping: 'Đang giao hàng', completed: 'Hoàn thành' };
                          const stepStatus = STATUSES.find(x => x.value === st)!;
                          const StepIcon = stepStatus.icon;
                          const steps = ['pending', 'shipping', 'completed'];
                          const currentIdx = steps.indexOf(order.status);
                          const isActive = idx <= currentIdx;
                          const isCurrent = steps[currentIdx] === st;
                          return (
                            <div key={st} className="progress-step">
                              {idx > 0 && (
                                <div className={`progress-line ${idx <= currentIdx ? 'filled' : ''}`} />
                              )}
                              <div className={`step-dot ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                                <StepIcon size={13} />
                              </div>
                              <p className={`step-label ${isCurrent ? 'current-label' : ''}`}>{labels[st]}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="detail-items">
                      {order.items.map(item => {
                        const productSlug = mockProducts.find(p => p.id === item.productId)?.slug;
                        return (
                        <div key={item.productId} className="d-item">
                          <img src={item.image} alt={item.name} className="d-img" />
                          <div className="d-info">
                            <p className="d-name">{item.name}</p>
                            <p className="d-qty">Số lượng: {item.quantity}</p>
                            {order.status === 'completed' && productSlug && (
                              <Link
                                href={`/products/${productSlug}#reviews`}
                                className="review-link"
                              >
                                <Star size={10} fill="currentColor" />
                                Viết đánh giá
                              </Link>
                            )}
                          </div>
                          <p className="d-price">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                        );
                      })}
                    </div>

                    <div className="detail-footer">
                      <div className="detail-row">
                        <span>Địa chỉ giao</span>
                        <span>{order.address}</span>
                      </div>
                      {order.trackingNumber && (
                        <div className="detail-row">
                          <span>Mã vận đơn</span>
                          <span className="tracking-row">
                            <span className="tracking-carrier">{order.carrier}</span>
                            <span className="tracking-code">{order.trackingNumber}</span>
                            <a
                              href={`https://ghn.vn/tra-cuu-don-hang?code=${order.trackingNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tracking-link"
                            >
                              Theo dõi →
                            </a>
                          </span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span>Phí vận chuyển</span>
                        <span>{order.shippingFee > 0 ? formatPrice(order.shippingFee) : 'Miễn phí'}</span>
                      </div>
                      <div className="detail-row total-row">
                        <span>Tổng cộng</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Cancel confirmation inline */}
                    {confirmCancel === order.id && (
                      <div className="cancel-confirm">
                        <AlertTriangle size={16} />
                        <span>Bạn chắc chắn muốn hủy đơn này?</span>
                        <button className="confirm-yes" onClick={() => handleCancel(order.id)}>Hủy đơn</button>
                        <button className="confirm-no" onClick={() => setConfirmCancel(null)}>Giữ lại</button>
                      </div>
                    )}

                    <div className="detail-actions">
                      {order.status === 'completed' && (
                        <button
                          className={`action-btn action-btn--primary ${rebuying === order.id ? 'rebuying' : ''}`}
                          onClick={() => handleRebuy(order)}
                          disabled={rebuying === order.id}
                        >
                          <ShoppingBag size={13} />
                          {rebuying === order.id ? 'Đã thêm vào giỏ!' : 'Mua lại'}
                        </button>
                      )}
                      {order.status === 'pending' && confirmCancel !== order.id && (
                        <button
                          className="action-btn action-btn--danger"
                          onClick={() => setConfirmCancel(order.id)}
                        >
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .orders-page { padding: 0; }

        .page-header {
          padding: 28px 32px 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .page-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 500;
          color: var(--color-primary);
        }

        .page-sub {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .filter-tabs {
          display: flex;
          gap: 4px;
          padding: 16px 32px;
          border-bottom: 1px solid var(--color-border);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .filter-tabs::-webkit-scrollbar { display: none; }

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: transparent;
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--color-text-secondary);
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
        }

        .filter-tab:hover {
          border-color: var(--tab-color);
          color: var(--tab-color);
        }

        .filter-tab.active {
          background: color-mix(in srgb, var(--tab-color) 12%, transparent);
          border-color: var(--tab-color);
          color: var(--tab-color);
          font-weight: 600;
        }

        .tab-count {
          background: var(--color-bg-alt);
          padding: 1px 6px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
        }

        .orders-list {
          padding: 20px 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty {
          text-align: center;
          padding: 60px 0;
          color: var(--color-text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .loader {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .order-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .order-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: background 0.15s;
          font-family: var(--font-body);
        }

        .order-summary:hover { background: var(--color-bg-alt); }

        .order-left { flex: 1; min-width: 0; }

        .order-code {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text);
        }

        .order-date {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .order-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .order-item-count {
          font-size: 12px;
          color: var(--color-text-muted);
        }

        .order-total-sm {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary);
          font-family: var(--font-display);
        }

        .order-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          color: var(--color-text-muted);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: color-mix(in srgb, var(--badge-color) 12%, transparent);
          color: var(--badge-color);
          border: 1px solid color-mix(in srgb, var(--badge-color) 25%, transparent);
        }

        .order-detail {
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-alt);
        }

        /* Progress tracker */
        .progress-wrap {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          padding: 20px 32px 16px;
          border-bottom: 1px solid var(--color-border);
          background: #fff;
          position: relative;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          position: relative;
        }

        .progress-line {
          position: absolute;
          top: 16px;
          right: 50%;
          width: 100%;
          height: 2px;
          background: #e8e8e8;
          z-index: 0;
        }

        .progress-line.filled {
          background: #2E1A4A;
        }

        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #e8e8e8;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bbb;
          position: relative;
          z-index: 1;
          transition: all 0.3s;
        }

        .step-dot.active {
          border-color: #2E1A4A;
          background: #f0ebff;
          color: #2E1A4A;
        }

        .step-dot.current {
          border-color: #2E1A4A;
          background: #2E1A4A;
          color: #fff;
          box-shadow: 0 0 0 4px rgba(46,26,74,0.15);
        }

        .step-label {
          font-size: 11px;
          color: var(--color-text-muted);
          text-align: center;
          line-height: 1.3;
        }

        .current-label {
          color: #2E1A4A;
          font-weight: 700;
        }

        .detail-items {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1px solid var(--color-border);
        }

        .d-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .d-img {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          flex-shrink: 0;
        }

        .d-info { flex: 1; }

        .d-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text);
        }

        .d-qty {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        :global(.review-link) {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        :global(.review-link:hover) { opacity: 0.7; }

        .d-price {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-primary);
        }

        .detail-footer {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--color-border);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--color-text-secondary);
        }

        .total-row {
          font-weight: 700;
          color: var(--color-primary);
          font-size: 15px;
          padding-top: 8px;
          border-top: 1px dashed var(--color-border);
        }

        .tracking-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tracking-carrier {
          font-size: 10px;
          font-weight: 700;
          background: #3B82F6;
          color: #fff;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .tracking-code {
          font-family: monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: 0.03em;
        }

        :global(.tracking-link) {
          font-size: 12px;
          font-weight: 600;
          color: #3B82F6;
          text-decoration: none;
          transition: opacity 0.15s;
        }

        :global(.tracking-link:hover) { opacity: 0.7; }

        /* Cancel confirmation */
        .cancel-confirm {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(196, 75, 122, 0.06);
          border-bottom: 1px solid var(--color-border);
          font-size: 13px;
          color: var(--color-sale);
          flex-wrap: wrap;
        }

        .confirm-yes {
          padding: 5px 14px;
          border-radius: var(--radius-full);
          background: var(--color-sale);
          color: #fff;
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body);
          transition: opacity 0.2s;
        }

        .confirm-yes:hover { opacity: 0.85; }

        .confirm-no {
          padding: 5px 14px;
          border-radius: var(--radius-full);
          background: transparent;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body);
          transition: var(--transition-fast);
        }

        .confirm-no:hover { border-color: var(--color-accent); color: var(--color-accent); }

        .detail-actions {
          display: flex;
          gap: 10px;
          padding: 14px 20px;
          justify-content: flex-end;
        }

        .action-btn {
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-body);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text-secondary);
          transition: var(--transition-fast);
        }

        .action-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }

        .action-btn--primary {
          background: var(--color-primary);
          color: #fff;
          border-color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-btn--primary:hover { background: var(--color-primary-light); color: #fff; }

        .action-btn--primary.rebuying {
          background: #2d7a4a;
          border-color: #2d7a4a;
          cursor: default;
        }

        .action-btn--danger {
          color: var(--color-sale);
          border-color: var(--color-sale);
          background: transparent;
        }

        .action-btn--danger:hover { background: var(--color-sale); color: #fff; }

        @media (max-width: 600px) {
          .page-header, .filter-tabs, .orders-list { padding-left: 16px; padding-right: 16px; }
          .order-center { display: none; }
          .cancel-confirm { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}
