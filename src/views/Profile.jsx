import { useState, useEffect } from 'react';
import { request } from '../utils/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await request('/user/profile'); 
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await request('/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure? This will delete all your data!")) {
      try {
        await request('/user/profile', { method: 'DELETE' });
        window.location.href = "/login";
      } catch (err) {
        alert("Error deleting account: " + err.message);
      }
    }
  };

  if (loading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="min-h-screen pl-64 pt-20 bg-slate-50">
      <Sidebar />
      <Header pageTitle="Account Settings" />
      
      <main className="p-8 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          
          <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
          <input 
            value={profile.username} 
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            className="w-full p-3 border border-slate-200 rounded-xl mb-4" 
          />
          
          <label className="block text-sm font-bold text-slate-600 mb-2">Email</label>
          <input 
            value={profile.email} 
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="w-full p-3 border border-slate-200 rounded-xl mb-6" 
          />
          
          <button onClick={handleUpdate} className="bg-[#2A5C72] text-white px-6 py-2 rounded-xl font-semibold">Save Changes</button>
          <button onClick={handleDelete} className="ml-4 text-red-500 font-bold text-sm">Delete Account</button>
        </div>
      </main>
    </div>
  );
}