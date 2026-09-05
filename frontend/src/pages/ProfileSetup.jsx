import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Droplet, Phone, AlertTriangle, Pill, HeartPulse, Stethoscope, Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  // Form State matching your MongoDB Schema
  const [formData, setFormData] = useState({
    bloodGroup: '',
    emergencyContact: { name: '', relation: '', phone: '' },
    allergies: [],
    medications: [],
    conditions: [],
    surgeries: []
  });

  // Fetch existing data if they are returning to edit
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data.profile && res.data.profile.emergencyId) {
          // Merge existing DB data into our form state
          setFormData(prev => ({ ...prev, ...res.data.profile }));
        }
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  // Dynamic Array Handlers
  const addArrayItem = (field, defaultObj) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultObj] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayChange = (field, index, key, value) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic Validation
    if (!formData.bloodGroup || !formData.emergencyContact.name || !formData.emergencyContact.phone) {
      setError("Blood Group and Emergency Contact are strictly required.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // We explicitly tell the backend the next step is the questionnaire
      const payload = { ...formData, onboardingStep: 'questionnaire' };

      await axios.post(`${API_URL}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsLoading(false);
      navigate('/questionnaire'); // Send them to the next step
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Failed to save profile.");
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-red-500" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in">
      <div className="mb-8 text-center sm:text-left pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's build your Emergency Profile</h1>
        <p className="text-gray-500 text-lg">Add your important medical information so it can help first responders.</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600">
          Step 1 of 3: Basic Medical Info
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold text-center border border-red-100">{error}</div>}

      <form onSubmit={handleSaveAndContinue} className="space-y-6">
        
        {/* Section A: Basic Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Droplet className="text-red-500" /> Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Blood Group <span className="text-red-500">*</span></label>
              <select 
                value={formData.bloodGroup} 
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">Select Blood Group...</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mt-6 mb-3 flex items-center gap-2"><Phone className="text-green-500 w-5 h-5"/> Emergency Contact <span className="text-red-500">*</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Contact Name" value={formData.emergencyContact.name} onChange={(e) => setFormData({...formData, emergencyContact: {...formData.emergencyContact, name: e.target.value}})} className="p-3 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500" />
            <input type="text" placeholder="Relation (e.g., Father)" value={formData.emergencyContact.relation} onChange={(e) => setFormData({...formData, emergencyContact: {...formData.emergencyContact, relation: e.target.value}})} className="p-3 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500" />
            <input type="tel" placeholder="Phone Number" value={formData.emergencyContact.phone} onChange={(e) => setFormData({...formData, emergencyContact: {...formData.emergencyContact, phone: e.target.value}})} className="p-3 border border-gray-300 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        {/* Section B: Allergies */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><AlertTriangle className="text-orange-500" /> Allergies</h2>
            <button type="button" onClick={() => addArrayItem('allergies', { name: '', severity: 'Moderate', reaction: '' })} className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1"><Plus className="w-4 h-4"/> Add Allergy</button>
          </div>
          {formData.allergies.length === 0 ? (
            <p className="text-gray-500 text-sm">No allergies added.</p>
          ) : (
            formData.allergies.map((allergy, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 mb-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <input type="text" placeholder="Allergy (e.g., Peanuts)" value={allergy.name} onChange={(e) => handleArrayChange('allergies', index, 'name', e.target.value)} className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
                <select value={allergy.severity} onChange={(e) => handleArrayChange('allergies', index, 'severity', e.target.value)} className="p-2 border rounded-lg outline-none">
                  <option value="Mild">Mild</option><option value="Moderate">Moderate</option><option value="Severe">Severe</option>
                </select>
                <input type="text" placeholder="Reaction" value={allergy.reaction} onChange={(e) => handleArrayChange('allergies', index, 'reaction', e.target.value)} className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
                <button type="button" onClick={() => removeArrayItem('allergies', index)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg"><Trash2 className="w-5 h-5"/></button>
              </div>
            ))
          )}
        </div>

        {/* Section C: Medications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Pill className="text-blue-500" /> Current Medications</h2>
            <button type="button" onClick={() => addArrayItem('medications', { name: '', details: '' })} className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1"><Plus className="w-4 h-4"/> Add Medication</button>
          </div>
          {formData.medications.length === 0 ? <p className="text-gray-500 text-sm">No medications added.</p> : formData.medications.map((med, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 mb-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <input type="text" placeholder="Medicine Name" value={med.name} onChange={(e) => handleArrayChange('medications', index, 'name', e.target.value)} className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              <input type="text" placeholder="Dosage/Details (e.g., 2 puffs as needed)" value={med.details} onChange={(e) => handleArrayChange('medications', index, 'details', e.target.value)} className="flex-2 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              <button type="button" onClick={() => removeArrayItem('medications', index)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg"><Trash2 className="w-5 h-5"/></button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isLoading} className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center gap-2">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Save & Continue <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>

      </form>
    </div>
  );
}