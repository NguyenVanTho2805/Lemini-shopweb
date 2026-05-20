'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockBlogPosts, blogCategories } from '@/lib/blogData';
import { Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filtered = activeCategory === 'Tất cả'
    ? mockBlogPosts
    : mockBlogPosts.filter(p => p.category === activeCategory);

  const featured = mockBlogPosts[mockBlogPosts.length - 1];

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #2E1A4A 0%, #5B3691 100%)',
          padding: '64px 24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
            Góc sáng tạo
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500, color: '#fff', marginBottom: 16 }}>
            Blog Lemini
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Hướng dẫn thêu tay, cảm hứng sáng tạo và câu chuyện đằng sau mỗi đường kim mũi chỉ.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 56 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={featured.image} alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 280 }} />
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: '#2E1A4A', color: '#fff',
                  fontSize: 11, fontWeight: 700, padding: '4px 12px',
                  borderRadius: 999, letterSpacing: '0.05em',
                }}>Nổi bật</span>
              </div>
              <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#9B72CF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {featured.category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: '#1a1a1a', lineHeight: 1.35 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#aaa' }}>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <Clock size={12} />
                  <span>{featured.readTime} phút đọc</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {['Tất cả', ...blogCategories].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 18px',
                border: `1.5px solid ${activeCategory === cat ? '#2E1A4A' : '#e8e8e8'}`,
                borderRadius: 999, fontSize: 13,
                background: activeCategory === cat ? '#2E1A4A' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#555',
                fontWeight: activeCategory === cat ? 700 : 400,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              }}>{cat}</button>
            ))}
          </div>

          {/* Post grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 28,
          }}>
            {filtered.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  border: '1px solid #f0f0f0', borderRadius: 12, overflow: 'hidden',
                  background: '#fff', transition: 'transform 0.22s, box-shadow 0.22s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'; el.style.borderColor = '#ede8f5'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = '#f0f0f0'; }}
                >
                  <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                    <img src={post.image} alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#9B72CF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 11, color: '#ccc' }}>·</span>
                      <span style={{ fontSize: 11, color: '#aaa', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={11} /> {post.readTime} phút
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 8 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#777', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: '#9B72CF', background: '#f5f0ff', padding: '2px 8px', borderRadius: 4 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
