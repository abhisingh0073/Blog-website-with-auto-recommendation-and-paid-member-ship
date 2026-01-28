import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EditProfileModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleAddSocial = () => {
    setFormData({
      ...formData,
      socials: [...formData.socials, { platform: "", url: "" }]
    });
  };

  const handleRemoveSocial = (index) => {
    const newSocials = formData.socials.filter((_, i) => i !== index);
    setFormData({ ...formData, socials: newSocials });
  };

  const updateSocial = (index, field, value) => {
    const newSocials = [...formData.socials];
    newSocials[index][field] = value;
    setFormData({ ...formData, socials: newSocials });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#212121] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Name Section */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
              placeholder="Your name"
            />
          </div>

          {/* Bio Section */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Bio / About</label>
            <textarea 
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition resize-none"
              placeholder="Tell the world about yourself..."
            />
          </div>

          {/* Social Media Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-slate-400">Social Links</label>
              <button 
                onClick={handleAddSocial}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-2 transition"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Link
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.socials.map((social, index) => (
                <div key={index} className="flex gap-3 items-center animate-in fade-in slide-in-from-right-2 duration-200">
                  <input 
                    placeholder="Platform (e.g. Twitter)"
                    className="flex-[0.4] bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
                    value={social.platform}
                    onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                  />
                  <input 
                    placeholder="URL (https://...)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm"
                    value={social.url}
                    onChange={(e) => updateSocial(index, 'url', e.target.value)}
                  />
                  <button 
                    onClick={() => handleRemoveSocial(index)}
                    className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#1a1a1a]">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl hover:bg-white/5 transition font-medium">
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-8 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}