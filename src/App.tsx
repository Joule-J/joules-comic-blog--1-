import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ComicPanel } from './components/ComicPanel';
import { Footer } from './components/Footer';
import { SoundEffectLayer } from './components/SoundEffectLayer';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { PostModal } from './components/PostModal';
import { CommentsModal } from './components/CommentsModal';
import { VideosPage } from './components/VideosPage';
import { AboutPage } from './components/AboutPage';
import { BlogPost, AdminConfig, Comment, View, UserProfile, AuthMode } from './types';

// Initial Data
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'THE LEAP OF FAITH',
    excerpt: 'Sometimes you just have to jump and hope the physics engine works in your favor.',
    content: `It was raining. Not the normal rain, but that neon-soaked drizzle that makes everything look like a movie set. I stood on the edge of the Chrysler Building, looking down at the grid.
    
    My suit was glitching again. The haptic feedback on the left web-shooter was stuck on "vibrate," which is incredibly annoying when you're trying to be stealthy. But that's the gig, right?
    
    Taking the leap isn't about the fall. It's about trusting that you'll catch yourself. Or that the web-fluid formula you mixed in your bathroom sink actually holds up.`,
    image: 'https://picsum.photos/800/600?random=1',
    category: 'THOUGHTS',
    date: 'OCT 24',
    size: 'large',
    color: 'cyan',
    effect: 'pulse'
  },
  {
    id: '2',
    title: 'METRO VIBES',
    excerpt: 'Subway photography session. Low light, high grain.',
    content: 'There is a specific rhythm to the subway tracks at 2 AM. Click-clack, screech. Click-clack, screech. I tried to capture the motion blur of the passing trains. The grain on these shots came out perfect.',
    image: 'https://picsum.photos/600/800?random=2',
    category: 'PHOTO',
    date: 'OCT 22',
    size: 'tall',
    color: 'magenta',
    effect: 'none'
  },
  {
    id: '3',
    title: 'NEW SUIT DESIGN',
    excerpt: 'Sketching out some ideas. Needs more neon.',
    content: 'Why does everyone go for spandex? I need pockets. Cargo pants utility with aerodynamic properties. And definitely more neon strips for visibility... or just to look cool.',
    image: 'https://picsum.photos/800/800?random=3',
    category: 'VLOG',
    date: 'OCT 20',
    size: 'small',
    color: 'yellow',
    effect: 'none'
  },
  {
    id: '4',
    title: 'ROOFTOP CHILL',
    excerpt: 'Best pizza spot is 40 stories up.',
    content: 'Joe\'s Pizza is great, but have you ever eaten a slice while dangling upside down from a gargoyle? The blood rushing to your head really enhances the flavor of the pepperoni.',
    image: 'https://picsum.photos/800/600?random=4',
    category: 'THOUGHTS',
    date: 'OCT 18',
    size: 'medium',
    color: 'cyan',
    effect: 'none'
  },
  {
    id: '5',
    title: 'VILLAIN WATCH',
    excerpt: 'Saw something weird at the docks. Staying alert.',
    content: 'Purple smoke. Green lights. Usually a bad sign. I\'m keeping an eye on Pier 42. Might be nothing, might be a dimensional rift. Just a typical Tuesday.',
    image: 'https://picsum.photos/800/600?random=5',
    category: 'THOUGHTS',
    date: 'OCT 15',
    size: 'medium',
    color: 'magenta',
    effect: 'glitch'
  },
  {
    id: '6',
    title: 'BEATS TO SWING TO',
    excerpt: 'My current playlist for traversing the city.',
    content: '1. "Elevate" \n 2. "Sunflower" \n 3. "What\'s Up Danger" \n\n You need the right BPM to time your swings.',
    image: 'https://picsum.photos/600/600?random=6',
    category: 'MUSIC',
    date: 'OCT 12',
    size: 'small',
    color: 'yellow',
    effect: 'none'
  },
];

const INITIAL_COMMENTS: Comment[] = [
    { id: 1, user: 'MilesM', text: 'Bro that suit design is fire!', avatarColor: 'bg-red-500' },
    { id: 2, user: 'GwenS', text: 'Be careful on those rooftops.', avatarColor: 'bg-pink-500' },
    { id: 3, user: 'PeterBPorker', text: 'Needs more cartoon physics.', avatarColor: 'bg-blue-500' },
];

const INITIAL_CONFIG: AdminConfig = {
  enableSoundEffects: true,
  enableAnimations: true,
  enableGlitch: true,
  siteTitle: 'JOULES BLOG'
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [config, setConfig] = useState<AdminConfig>(INITIAL_CONFIG);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<View>('HOME');

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('USER');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Modal State
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showComments, setShowComments] = useState(false);

  // Trigger User Login
  const openUserLogin = () => {
    setAuthMode('USER');
    setShowLoginModal(true);
  };

  // Trigger Admin Login
  const openAdminLogin = () => {
    if (isAdminLoggedIn) {
        setShowAdminPanel(true);
    } else {
        setAuthMode('ADMIN');
        setShowLoginModal(true);
    }
  };

  const handleAuthSuccess = (profile: UserProfile | null, isAdmin: boolean) => {
    if (isAdmin) {
      setIsAdminLoggedIn(true);
      setShowAdminPanel(true);
    } else {
      setCurrentUser(profile);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdminPanel(false);
  };

  const handleAddComment = (text: string) => {
      const newComment: Comment = {
          id: Date.now(),
          user: currentUser ? currentUser.username : 'Guest_User',
          text,
          avatarColor: currentUser ? currentUser.avatarColor : 'bg-gray-400'
      };
      setComments([newComment, ...comments]);
  };

  return (
    <div className="min-h-screen bg-halftone font-sans text-slate-900 selection:bg-comic-cyan selection:text-black flex flex-col">
      <SoundEffectLayer enabled={config.enableSoundEffects} />
      
      <Header 
        onLoginClick={openUserLogin} 
        setView={setCurrentView}
        currentView={currentView}
        user={currentUser}
      />
      
      {/* Admin Floating Trigger (if logged in but panel closed) */}
      {isAdminLoggedIn && !showAdminPanel && (
        <button 
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Settings size={24} />
        </button>
      )}

      {/* --- MODALS --- */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleAuthSuccess}
        mode={authMode}
      />

      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)}
        posts={posts}
        onUpdatePosts={setPosts}
        config={config}
        onUpdateConfig={setConfig}
        onLogout={handleLogout}
      />

      <PostModal 
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onOpenComments={() => setShowComments(true)}
      />

      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={comments}
        onAddComment={handleAddComment}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow">
        
        {/* VIEW: HOME */}
        {currentView === 'HOME' && (
            <>
                <Hero />
                <section id="feed" className="container mx-auto px-4 py-20 relative">
                    {/* Section Title */}
                    <div className="mb-12 flex items-center gap-4">
                        <h2 className="font-comic text-6xl text-white drop-shadow-[4px_4px_0_#d946ef] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                            LATEST DROPS
                        </h2>
                        <div className="flex-1 h-2 bg-comic-yellow border-2 border-black shadow-comic"></div>
                    </div>

                    {/* Comic Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-6 p-4 bg-comic-dark/50 border-4 border-black backdrop-blur-sm shadow-[12px_12px_0_#000]">
                        {posts.slice(0, 4).map((post, index) => (
                            <ComicPanel 
                                key={post.id} 
                                post={post} 
                                index={index} 
                                onReadMore={setSelectedPost}
                                onComment={() => { setSelectedPost(post); setShowComments(true); }}
                            />
                        ))}
                    </div>
                     <div className="mt-16 text-center">
                        <button 
                            onClick={() => setCurrentView('BLOGS')}
                            className="group relative px-10 py-4 bg-white font-comic text-2xl border-4 border-black shadow-[8px_8px_0_#22d3ee] hover:shadow-[4px_4px_0_#22d3ee] hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            <span className="relative z-10 group-hover:animate-pulse">VIEW ALL ISSUES</span>
                            <div className="absolute inset-0 bg-halftone opacity-10"></div>
                        </button>
                    </div>
                </section>
                {/* Sidebar / About Strip */}
                <section className="bg-comic-yellow border-y-8 border-black py-16 transform -skew-y-2 my-10">
                    <div className="container mx-auto px-4 transform skew-y-2 flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/3">
                            <div className="bg-white p-6 border-4 border-black shadow-comic transform rotate-2">
                                <h3 className="font-comic text-4xl mb-4">WHO AM I?</h3>
                                <p className="font-marker text-lg">Just your friendly neighborhood developer building webs(ites) and dodging bugs.</p>
                                <button onClick={() => setCurrentView('ABOUT')} className="mt-4 text-sm font-bold underline">READ FULL BIO</button>
                            </div>
                        </div>
                        <div className="md:w-2/3 flex gap-4 overflow-hidden">
                            {config.enableAnimations ? (
                                <div className="font-comic text-9xl text-black/10 whitespace-nowrap animate-pulse select-none">
                                    CREATIVE BOLD FAST LOUD
                                </div>
                            ) : (
                                <div className="font-comic text-9xl text-black/10 whitespace-nowrap select-none">
                                    CREATIVE BOLD FAST LOUD
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </>
        )}

        {/* VIEW: BLOGS (ALL) */}
        {currentView === 'BLOGS' && (
             <section className="container mx-auto px-4 py-20 min-h-[80vh]">
                <h2 className="font-comic text-6xl text-white drop-shadow-[4px_4px_0_#facc15] stroke-black mb-10" style={{ WebkitTextStroke: '2px black' }}>
                    ALL ISSUES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-6 p-4 bg-comic-dark/50 border-4 border-black backdrop-blur-sm shadow-[12px_12px_0_#000]">
                    {posts.map((post, index) => (
                        <ComicPanel 
                            key={post.id} 
                            post={post} 
                            index={index} 
                            onReadMore={setSelectedPost}
                            onComment={() => { setSelectedPost(post); setShowComments(true); }}
                        />
                    ))}
                </div>
            </section>
        )}

        {/* VIEW: VIDEOS */}
        {currentView === 'VIDEOS' && <VideosPage />}

        {/* VIEW: ABOUT */}
        {currentView === 'ABOUT' && <AboutPage />}

      </main>

      <Footer 
        onLoginClick={openUserLogin} 
        isLoggedIn={isAdminLoggedIn}
        onAdminClick={openAdminLogin}
      />
    </div>
  );
};

export default App;