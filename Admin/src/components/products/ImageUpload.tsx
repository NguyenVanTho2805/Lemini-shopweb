"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
}

export default function ImageUpload({ images, onChange, max = 5 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: FileList) => {
    const remaining = max - images.length;
    const toProcess = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, remaining);
    if (toProcess.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(
        toProcess.map(async file => {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          if (!res.ok) {
            // Fallback to base64 if upload fails
            return new Promise<string>(resolve => {
              const reader = new FileReader();
              reader.onload = e => resolve(e.target?.result as string);
              reader.readAsDataURL(file);
            });
          }
          const { url } = await res.json();
          return url as string;
        })
      );
      onChange([...images, ...urls]);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => onChange(images.filter((_, i) => i !== idx));

  const setMain = (idx: number) => {
    if (idx === 0) return;
    const reordered = [...images];
    const [moved] = reordered.splice(idx, 1);
    reordered.unshift(moved);
    onChange(reordered);
  };

  return (
    <div>
      {/* Thumbnails */}
      {images.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
              <img
                src={img}
                alt={`Ảnh ${idx + 1}`}
                style={{
                  width: 80, height: 80, objectFit: "cover", borderRadius: 8, display: "block",
                  border: idx === 0 ? "2px solid var(--color-primary)" : "1px solid var(--border-color)",
                }}
              />
              {idx === 0 && (
                <span style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "rgba(5,150,105,0.85)", color: "#fff",
                  borderRadius: "0 0 6px 6px", padding: "2px 4px",
                  fontSize: 9, fontWeight: 700, textAlign: "center", letterSpacing: "0.05em",
                }}>
                  ẢNH CHÍNH
                </span>
              )}
              <div
                style={{
                  position: "absolute", inset: 0, borderRadius: 8,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  opacity: 0, transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
              >
                {idx !== 0 && (
                  <button type="button" onClick={() => setMain(idx)} title="Đặt làm ảnh chính"
                    style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                    ⭐
                  </button>
                )}
                <button type="button" onClick={() => removeImage(idx)} title="Xóa ảnh"
                  style={{ width: 24, height: 24, borderRadius: 4, background: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
          {uploading && (
            <div style={{
              width: 80, height: 80, borderRadius: 8, border: "1px dashed var(--border-color)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              background: "var(--bg-input)",
            }}>
              <Loader2 size={20} color="var(--color-primary)" style={{ animation: "spin 1s linear infinite" }} />
            </div>
          )}
        </div>
      )}

      {/* Drop zone */}
      {images.length < max && !uploading && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); uploadFiles(e.dataTransfer.files); }}
          style={{
            border: `2px dashed ${dragging ? "var(--color-primary)" : "var(--border-color)"}`,
            borderRadius: 10, padding: "24px 16px", textAlign: "center", cursor: "pointer",
            background: dragging ? "var(--color-primary-light)" : "var(--bg-input)",
            transition: "all 0.15s",
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
            {images.length === 0 ? <ImageIcon size={20} color="var(--color-primary)" /> : <Upload size={20} color="var(--color-primary)" />}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
            {images.length === 0 ? "Tải ảnh sản phẩm lên" : "Thêm ảnh"}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Kéo & thả hoặc <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>chọn file</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
            JPG, PNG, WebP · Tối đa {max} ảnh · Ảnh đầu tiên là ảnh chính
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={e => {
          if (e.target.files) uploadFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
