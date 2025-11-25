
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Full blog content
    image: string;
    category: 'VLOG' | 'PHOTO' | 'THOUGHTS' | 'MUSIC';
    date: string;
    size: 'small' | 'medium' | 'large' | 'tall';
    color: 'cyan' | 'magenta' | 'yellow';
    effect?: 'none' | 'pulse' | 'shake' | 'glitch';
}

export interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    views: string;
}

export interface Comment {
    id: number;
    user: string;
    text: string;
    avatarColor: string;
}

export interface NavItem {
    label: string;
    view: View;
}

export type View = 'HOME' | 'BLOGS' | 'VIDEOS' | 'ABOUT';

export interface SoundEffect {
    id: number;
    x: number;
    y: number;
    text: string;
    rotation: number;
}

export interface AdminConfig {
    enableSoundEffects: boolean;
    enableAnimations: boolean;
    enableGlitch: boolean;
    siteTitle: string;
}

export interface UserProfile {
    username: string;
    email?: string;
    avatarColor: string;
}

export type AuthMode = 'USER' | 'ADMIN';
