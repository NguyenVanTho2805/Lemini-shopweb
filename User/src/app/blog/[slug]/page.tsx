'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockBlogPosts } from '@/lib/blogData';
import { Clock, ArrowLeft, Tag } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = mockBlogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  const related = mockBlogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  const others = related.length < 2
    ? [...related, ...mockBlogPosts.filter(p => p.id !== post.id && !related.find(r => r.id === p.id)).slice(0, 2 - related.length)]
    : related;

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {post.category}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 500, color: '#fff', marginTop: 8, lineHeight: 1.3 }}>
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 24px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 13, color: '#aaa', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Trang chủ</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{post.title}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 64px' }}>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #f0f0f0', flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #2E1A4A, #9B72CF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
              L
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{post.author}</p>
              <p style={{ fontSize: 12, color: '#aaa' }}>
                {new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#aaa' }}>
              <Clock size={13} />
              {post.readTime} phút đọc
            </div>
          </div>

          {/* Excerpt */}
          <p style={{ fontSize: 17, color: '#444', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 32, paddingLeft: 20, borderLeft: '3px solid #C4A8E8' }}>
            {post.excerpt}
          </p>

          {/* Body */}
          <div style={{ fontSize: 15, color: '#333', lineHeight: 1.9 }}>
            {paragraphs.map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: '#2E1A4A', margin: '32px 0 16px' }}>{para.slice(3)}</h2>;
              }
              if (para.startsWith('### ')) {
                return <h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', margin: '24px 0 10px' }}>{para.slice(4)}</h3>;
              }
              const lines = para.split('\n').map((line, j) => {
                if (line.startsWith('- ')) {
                  return <li key={j} style={{ marginBottom: 6, paddingLeft: 4 }}>{renderInline(line.slice(2))}</li>;
                }
                return null;
              });
              const hasList = lines.some(l => l !== null);
              if (hasList) {
                return <ul key={i} style={{ paddingLeft: 20, margin: '12px 0 20px', listStyleType: 'disc' }}>{lines}</ul>;
              }
              return <p key={i} style={{ marginBottom: 20 }}>{renderInline(para)}</p>;
            })}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
            <Tag size={14} color="#aaa" />
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: '#9B72CF', background: '#f5f0ff', padding: '4px 12px', borderRadius: 999 }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Back */}
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 32, fontSize: 14, color: '#666', textDecoration: 'none',
            transition: 'color 0.15s',
          }}>
            <ArrowLeft size={16} />
            Quay lại Blog
          </Link>
        </div>

        {/* Related */}
        {others.length > 0 && (
          <div style={{ borderTop: '1px solid #f0f0f0', background: '#fafafa', padding: '48px 24px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: '#2E1A4A', marginBottom: 28 }}>
                Bài viết liên quan
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {others.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ border: '1px solid #eee', borderRadius: 10, overflow: 'hidden', background: '#fff', transition: 'transform 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                    >
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#9B72CF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.category}</span>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginTop: 6, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {p.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|_.*?_)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
