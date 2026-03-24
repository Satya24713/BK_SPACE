import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import { 
  insertMurli, insertAbhyas, insertCourseDay,
  updateMurli, updateAbhyas, updateCourseDay,
  fetchMurlis, fetchAbhyas, fetchCourseDays
} from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function AdminUpload() {
  const { font } = useLanguage();
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'murli' | 'abhyas' | 'course'>('murli');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid PIN. (Try 1234)");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-bk-bg p-4 ${font}`}>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#D32F2F] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#D32F2F] text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-bk-text mb-2">Admin Portal</h2>
          <p className="text-gray-500 mb-8 text-sm">Enter the secret PIN to access the upload dashboard</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-5 py-4 rounded-xl font-mono text-center tracking-widest bg-gray-50 border border-gray-100 mb-6 focus:ring-2 focus:ring-[#D32F2F] outline-none"
            placeholder="••••"
          />
          <button type="submit" className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-medium shadow-md shadow-red-200 active:scale-[0.98] transition-all">Authenticate</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-bk-bg pb-24 ${font}`}>
      <Header title="Upload Content" />

      <main className="pt-24 px-4 max-w-2xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-2xl shadow-sm mb-6">
          <button onClick={() => setActiveTab('murli')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'murli' ? 'bg-[#D32F2F] text-white' : 'text-gray-500'}`}>Murli</button>
          <button onClick={() => setActiveTab('abhyas')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'abhyas' ? 'bg-[#D32F2F] text-white' : 'text-gray-500'}`}>Abhyas</button>
          <button onClick={() => setActiveTab('course')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'course' ? 'bg-[#D32F2F] text-white' : 'text-gray-500'}`}>Course</button>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          {activeTab === 'murli' && <MurliForm />}
          {activeTab === 'abhyas' && <AbhyasFormSubmit />}
          {activeTab === 'course' && <CourseForm />}
        </div>
      </main>
    </div>
  );
}

const MurliForm = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  
  const initialFormState = {
    date: new Date().toISOString().split('T')[0],
    type: 'Sakar',
    title_hindi: '',
    content_hindi: '',
    audio_url: '',
    youtube_id: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMurlis().then(setItems).catch(console.error);
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    if (id) {
      const selected = items.find(i => i.id === id);
      if (selected) {
        setFormData({
          date: selected.date || initialFormState.date,
          type: selected.type || 'Sakar',
          title_hindi: selected.title_hindi || '',
          content_hindi: selected.content_hindi || '',
          audio_url: selected.audio_url || '',
          youtube_id: selected.youtube_id || ''
        });
      }
    } else {
      setFormData(initialFormState);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedId) {
        await updateMurli(selectedId, formData as any);
        alert('Murli updated successfully!');
      } else {
        await insertMurli(formData as any);
        alert('Murli inserted successfully!');
      }
      fetchMurlis().then(setItems);
      setFormData(initialFormState);
      setSelectedId('');
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-bk-text mb-4">Add or Edit Daily Murli</h3>
      
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Select Action</label>
        <select 
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none font-medium text-[#D32F2F]"
          value={selectedId}
          onChange={handleSelect}
        >
          <option value="">✨ Create New Murli</option>
          {items.map(m => (
            <option key={m.id} value={m.id}>✎ Edit: {m.date} - {m.title_hindi}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
          <input type="date" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
          <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
            <option>Sakar</option>
            <option>Avyakt</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Title (Hindi)</label>
        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.title_hindi} onChange={e => setFormData({ ...formData, title_hindi: e.target.value })} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Content (Hindi)</label>
        <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none h-32" value={formData.content_hindi} onChange={e => setFormData({ ...formData, content_hindi: e.target.value })} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">YouTube ID (Optional)</label>
        <input type="text" placeholder="e.g. dQw4w9WgXcQ" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.youtube_id} onChange={e => setFormData({ ...formData, youtube_id: e.target.value })} />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-medium mt-4">
        {loading ? 'Processing...' : (selectedId ? 'Update Murli' : 'Publish Murli')}
      </button>
    </form>
  );
};

const AbhyasFormSubmit = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const initialFormState = {
    title: '',
    hindi_title: '',
    description: '',
    description_hindi: '',
    color_theme: 'bg-orange-500'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbhyas().then(setItems).catch(console.error);
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    if (id) {
      const selected = items.find(i => i.id === id);
      if (selected) {
        setFormData({
          title: selected.title || '',
          hindi_title: selected.hindi_title || '',
          description: selected.description || '',
          description_hindi: selected.description_hindi || '',
          color_theme: selected.color_theme || 'bg-orange-500'
        });
      }
    } else {
      setFormData(initialFormState);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedId) {
        await updateAbhyas(selectedId, formData as any);
        alert('Abhyas updated successfully!');
      } else {
        await insertAbhyas(formData as any);
        alert('Abhyas inserted successfully!');
      }
      fetchAbhyas().then(setItems);
      setFormData(initialFormState);
      setSelectedId('');
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-bk-text mb-4">Add or Edit Abhyas Form</h3>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Select Action</label>
        <select 
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none font-medium text-[#D32F2F]"
          value={selectedId}
          onChange={handleSelect}
        >
          <option value="">✨ Create New Abhyas</option>
          {items.map(m => (
            <option key={m.id} value={m.id}>✎ Edit: {m.hindi_title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Title (English)</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Title (Hindi)</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.hindi_title} onChange={e => setFormData({ ...formData, hindi_title: e.target.value })} required />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Description (English)</label>
        <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Description (Hindi)</label>
        <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none h-24" value={formData.description_hindi} onChange={e => setFormData({ ...formData, description_hindi: e.target.value })} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Color Theme (Tailwind Class)</label>
        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.color_theme} onChange={e => setFormData({ ...formData, color_theme: e.target.value })} required placeholder="e.g. bg-blue-500" />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-medium mt-4">
        {loading ? 'Processing...' : (selectedId ? 'Update Abhyas' : 'Publish Abhyas')}
      </button>
    </form>
  );
};

const CourseForm = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const initialFormState = {
    day: 1,
    title: '',
    title_hindi: '',
    theme_hindi: '',
    resources: '[]',
    reflection: '',
    reflection_hindi: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourseDays().then(setItems).catch(console.error);
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    if (id) {
      const selected = items.find(i => i.id === id);
      if (selected) {
        setFormData({
          day: selected.day || 1,
          title: selected.title || '',
          title_hindi: selected.title_hindi || '',
          theme_hindi: selected.theme_hindi || '',
          resources: selected.resources ? JSON.stringify(selected.resources) : '[]',
          reflection: selected.reflection || '',
          reflection_hindi: selected.reflection_hindi || ''
        });
      }
    } else {
      setFormData(initialFormState);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payloadResources;
      try {
        payloadResources = JSON.parse(formData.resources);
      } catch (err) {
        throw new Error("Invalid JSON in Resources field array.");
      }
      
      const payload = { ...formData, resources: payloadResources };
      
      if (selectedId) {
        await updateCourseDay(selectedId, payload as any);
        alert('Course Day updated successfully!');
      } else {
        await insertCourseDay(payload as any);
        alert('Course Day inserted!');
      }
      fetchCourseDays().then(setItems);
      setFormData(initialFormState);
      setSelectedId('');
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-bk-text mb-4">Add or Edit Course Day</h3>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Select Action</label>
        <select 
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none font-medium text-[#D32F2F]"
          value={selectedId}
          onChange={handleSelect}
        >
          <option value="">✨ Create New Course Day</option>
          {items.map(m => (
            <option key={m.id} value={m.id}>✎ Edit: Day {m.day} - {m.title_hindi}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Day Number</label>
          <input type="number" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.day} onChange={e => setFormData({ ...formData, day: parseInt(e.target.value) })} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Theme (Hindi summary)</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.theme_hindi} onChange={e => setFormData({ ...formData, theme_hindi: e.target.value })} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Title (English)</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Title (Hindi)</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none" value={formData.title_hindi} onChange={e => setFormData({ ...formData, title_hindi: e.target.value })} required />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Reflection (English)</label>
        <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none h-24" value={formData.reflection} onChange={e => setFormData({ ...formData, reflection: e.target.value })} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Reflection (Hindi)</label>
        <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none h-24" value={formData.reflection_hindi} onChange={e => setFormData({ ...formData, reflection_hindi: e.target.value })} required />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Resources Array (JSON Format)</label>
        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#D32F2F] outline-none font-mono text-sm" value={formData.resources} onChange={e => setFormData({ ...formData, resources: e.target.value })} required placeholder='["link1", "link2"]' />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-medium mt-4">
        {loading ? 'Processing...' : (selectedId ? 'Update Course Day' : 'Publish Course Day')}
      </button>
    </form>
  );
}
