import { toast } from "sonner";

// Define user roles
export type UserRole = 'admin' | 'user' | 'guest';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context value
export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Mock JWT utilities (in a real app, these would use a proper JWT implementation)
const generateMockToken = (user: User): string => {
  // In a real app, this would be an actual JWT
  const payload = btoa(JSON.stringify({ user, exp: Date.now() + 3600000 }));
  return `mock.${payload}.token`;
};

const parseToken = (token: string): { user: User; exp: number } | null => {
  try {
    if (!token || !token.includes('.')) return null;
    
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
};

const isTokenValid = (token: string): boolean => {
  const parsed = parseToken(token);
  if (!parsed) return false;
  return parsed.exp > Date.now();
};

// Mock users data (in a real app, this would come from an API/database)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@secure.app',
    name: 'Admin User',
    role: 'admin',
    avatar: '/avatar-admin.jpg',
  },
  {
    id: '2',
    email: 'user@secure.app',
    name: 'Regular User',
    role: 'user',
    avatar: '/avatar-user.jpg',
  },
];

// Local storage keys
const TOKEN_KEY = 'security_app_token';

// Auth functions
export const login = async (email: string, password: string): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user
  const user = mockUsers.find(u => u.email === email);
  
  // Simulate authentication logic
  if (!user || password !== 'secure123') {
    toast.error('Invalid credentials');
    throw new Error('Invalid credentials');
  }
  
  // Generate and store token
  const token = generateMockToken(user);
  localStorage.setItem(TOKEN_KEY, token);
  
  return user;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token || !isTokenValid(token)) {
    logout(); // Clear invalid token
    return null;
  }
  
  const parsed = parseToken(token);
  return parsed?.user || null;
};

// Permission checking
export const hasPermission = (user: User | null, requiredRole: UserRole): boolean => {
  if (!user) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    'admin': 3,
    'user': 2,
    'guest': 1
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
};
