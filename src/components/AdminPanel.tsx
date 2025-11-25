import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Settings, Type, Image as ImageIcon, Save, LogOut, Layout, Zap } from 'lucide-react';
import { BlogPost, AdminConfig } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onUpdatePosts: (posts: BlogPost[]) => void;
  config: AdminConfig;
  onUpdateConfig: (config: AdminConfig) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  posts, 
  onUpdatePosts, 
  config, 
  onUpdateConfig,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [localPosts, setLocalPosts] = useState<BlogPost[]>(posts);

  // Sync when opening if needed, but here we keep local state for "Edit Mode"
  // Just a simple "Save" mechanism
  
  const handlePostChange = (id: string, field: keyof BlogPost, value: string) => {
    setLocalPosts(prev => prev.map(post => 
      post.id === id ? { ...post, [field]: value } : post
    ));
  };

  const handleSave = () => {
    onUpdatePosts(localPosts);
    // Optional: Show toast
    alert("Changes Saved to the Multiverse!");
  };

  const handleConfigChange = (field: keyof AdminConfig, value: any) => {
    onUpdateConfig({ ...config, [field]: value });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" onClick={onClose} />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[9999] shadow-2xl flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
             <div className="bg-black text-white p-2 rounded-md">
                <Layout size={20} />
             </div>
             <div>
                 <h2 className="text-lg font-bold text-gray-900">Admin Console</h2>
                 <p className="text-xs text-gray-500">Joules Blog Management</p>
             </div>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={handleSave}
                className="flex items-center gap-1 bg-comic-cyan border-2 border-black px-3 py-1 text-sm font-bold shadow-[2px_2px_0_#000] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
                <Save size={14} /> SAVE
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6">
          <button 
            onClick={() => setActiveTab('content')}
            className={`mr-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'content' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            <Type size={16} /> Content
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            <Settings size={16} /> Effects & Config
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Edit Posts</h3>
                 <span className="text-xs text-gray-400">{localPosts.length} items</span>
              </div>
              
              {localPosts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                  <div className="absolute top-2 right-2 opacity-20 text-4xl font-black text-gray-200 pointer-events-none">
                      #{post.id}
                  </div>
                  
                  <div className="grid gap-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Title</label>
                            <input 
                                type="text" 
                                value={post.title} 
                                onChange={(e) => handlePostChange(post.id, 'title', e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded focus:border-black outline-none bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Date</label>
                            <input 
                                type="text" 
                                value={post.date} 
                                onChange={(e) => handlePostChange(post.id, 'date', e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded focus:border-black outline-none bg-gray-50"
                            />
                        </div>
                    </div>
                    
                    {/* Excerpt */}
                    <div>
                      <label className="text-xs text-gray-500 font-bold mb-1 block">Excerpt (Card Preview)</label>
                      <textarea 
                        value={post.excerpt} 
                        onChange={(e) => handlePostChange(post.id, 'excerpt', e.target.value)}
                        rows={2}
                        className="w-full p-2 text-sm border border-gray-200 rounded focus:border-black outline-none resize-none bg-gray-50"
                      />
                    </div>

                    {/* Full Content */}
                    <div>
                      <label className="text-xs text-gray-500 font-bold mb-1 block">Full Content</label>
                      <textarea 
                        value={post.content || ''} 
                        onChange={(e) => handlePostChange(post.id, 'content', e.target.value)}
                        rows={6}
                        className="w-full p-2 text-sm border border-gray-200 rounded focus:border-black outline-none bg-gray-50 font-sans"
                        placeholder="Write the full story here..."
                      />
                    </div>

                    {/* Image */}
                    <div>
                      <label className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1">
                        <ImageIcon size={12} /> Image URL
                      </label>
                      <input 
                        type="text" 
                        value={post.image} 
                        onChange={(e) => handlePostChange(post.id, 'image', e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded focus:border-black outline-none font-mono text-gray-600 bg-gray-50"
                      />
                    </div>

                    {/* Visual Properties */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed">
                         <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Category</label>
                            <select 
                                value={post.category}
                                onChange={(e) => handlePostChange(post.id, 'category', e.target.value)}
                                className="w-full p-1 text-xs border border-gray-200 rounded"
                            >
                                <option value="VLOG">VLOG</option>
                                <option value="PHOTO">PHOTO</option>
                                <option value="THOUGHTS">THOUGHTS</option>
                                <option value="MUSIC">MUSIC</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Size</label>
                            <select 
                                value={post.size}
                                onChange={(e) => handlePostChange(post.id, 'size', e.target.value)}
                                className="w-full p-1 text-xs border border-gray-200 rounded"
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="tall">Tall</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Accent Color</label>
                            <select 
                                value={post.color}
                                onChange={(e) => handlePostChange(post.id, 'color', e.target.value)}
                                className="w-full p-1 text-xs border border-gray-200 rounded"
                            >
                                <option value="cyan">Cyan</option>
                                <option value="magenta">Magenta</option>
                                <option value="yellow">Yellow</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 font-bold mb-1 block flex items-center gap-1"><Zap size={10}/> Visual Effect</label>
                            <select 
                                value={post.effect || 'none'}
                                onChange={(e) => handlePostChange(post.id, 'effect', e.target.value)}
                                className="w-full p-1 text-xs border border-gray-200 rounded font-bold"
                            >
                                <option value="none">None</option>
                                <option value="pulse">Pulse</option>
                                <option value="shake">Shake</option>
                                <option value="glitch">Glitch</option>
                            </select>
                         </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              
              {/* General Settings */}
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Global Settings</h3>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Site Name</label>
                  <input 
                    type="text" 
                    value={config.siteTitle} 
                    onChange={(e) => handleConfigChange('siteTitle', e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded focus:border-black outline-none"
                  />
                </div>
              </div>

              {/* Effects Toggles */}
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Visual Effects</h3>
                <div className="space-y-4">
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Sound Effects</p>
                            <p className="text-xs text-gray-500">Show "BAM!", "POW!" on click</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={config.enableSoundEffects}
                                onChange={(e) => handleConfigChange('enableSoundEffects', e.target.checked)}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Animations</p>
                            <p className="text-xs text-gray-500">Global scroll & hover animations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={config.enableAnimations}
                                onChange={(e) => handleConfigChange('enableAnimations', e.target.checked)}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Glitch Effect</p>
                            <p className="text-xs text-gray-500">Text vibration and color split</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={config.enableGlitch}
                                onChange={(e) => handleConfigChange('enableGlitch', e.target.checked)}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};