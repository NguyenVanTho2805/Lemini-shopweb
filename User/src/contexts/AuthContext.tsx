'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joinedAt: string;
}

interface StoredAccount {
  id: string;
  email: string;
  name: string;
  password: string;
  phone?: string;
  address?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  authModalOpen: boolean;
  authModalView: 'login' | 'register' | 'forgot';
  openAuthModal: (view?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithOAuth: (provider: 'google' | 'facebook') => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (current: string, next: string) => Promise<{ ok: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = 'lemini_user';
const ACCOUNTS_KEY = 'lemini_accounts';

const SEED_ACCOUNTS: StoredAccount[] = [
  {
    id: 'u1',
    email: 'demo@lemini.com',
    password: '123456',
    name: 'Nguyễn Thị Lan',
    phone: '0912345678',
    address: '12 Phố Huế, Hai Bà Trưng, Hà Nội',
    joinedAt: '2024-01-15',
  },
];

function loadAccounts(): StoredAccount[] {
  try {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    if (!saved) return SEED_ACCOUNTS;
    const parsed: StoredAccount[] = JSON.parse(saved);
    // Merge seed accounts (preserving password overrides) with extra registered accounts
    const merged = SEED_ACCOUNTS.map(seed => {
      const override = parsed.find(a => a.id === seed.id);
      return override ? { ...seed, ...override } : seed;
    });
    const extras = parsed.filter(a => !SEED_ACCOUNTS.find(s => s.id === a.id));
    return [...merged, ...extras];
  } catch {
    return SEED_ACCOUNTS;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<StoredAccount[]>(SEED_ACCOUNTS);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    setAccounts(loadAccounts());
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  const persistAccounts = (acc: StoredAccount[]) => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(acc));
  };

  const persistUser = (u: User | null) => {
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
  };

  const openAuthModal = (view: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 700));
    const found = accounts.find(a => a.email === email);
    if (!found || found.password !== password) {
      return { ok: false, error: 'Email hoặc mật khẩu không đúng.' };
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    persistUser(userData);
    setAuthModalOpen(false);
    return { ok: true };
  };

  const loginWithOAuth = async (provider: 'google' | 'facebook') => {
    await new Promise(r => setTimeout(r, 900));
    const email = `${provider}.user@lemini.com`;
    let account = accounts.find(a => a.email === email);
    if (!account) {
      account = {
        id: `u_${provider}_${Date.now()}`,
        email,
        name: provider === 'google' ? 'Người dùng Google' : 'Người dùng Facebook',
        password: '',
        joinedAt: new Date().toISOString().split('T')[0],
      };
      const updated = [...accounts, account];
      setAccounts(updated);
      persistAccounts(updated);
    }
    const { password: _, ...userData } = account;
    setUser(userData);
    persistUser(userData);
    setAuthModalOpen(false);
    return { ok: true };
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 700));
    if (accounts.find(a => a.email === email)) {
      return { ok: false, error: 'Email này đã được đăng ký.' };
    }
    const newAccount: StoredAccount = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      joinedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    persistAccounts(updated);
    const { password: _, ...userData } = newAccount;
    setUser(userData);
    persistUser(userData);
    setAuthModalOpen(false);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    persistUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    persistUser(updated);
    setAccounts(prev => {
      const next = prev.map(a => a.email === user.email ? { ...a, ...data } : a);
      persistAccounts(next);
      return next;
    });
  };

  const changePassword = async (current: string, next: string) => {
    await new Promise(r => setTimeout(r, 700));
    const account = accounts.find(a => a.email === user?.email);
    if (!account || account.password !== current) {
      return { ok: false, error: 'Mật khẩu hiện tại không đúng.' };
    }
    setAccounts(prev => {
      const updated = prev.map(a =>
        a.email === user!.email ? { ...a, password: next } : a
      );
      persistAccounts(updated);
      return updated;
    });
    return { ok: true };
  };

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn: !!user,
      authModalOpen, authModalView,
      openAuthModal, closeAuthModal,
      login, loginWithOAuth, register, logout, updateProfile, changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
