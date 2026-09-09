import React, { useState, useEffect } from 'react';
import { RSVPFormData, Guest } from '../types';
import { GUEST_LIST } from '../constants';
import { Send, CheckCircle, Sparkles, Search, User, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const RSVP: React.FC = () => {
  const { t } = useLanguage();
  
  const [step, setStep] = useState<'lookup' | 'form' | 'success' | 'already_rsvpd'>('lookup');
  const [lookupName, setLookupName] = useState({ firstName: '', lastName: '' });
  const [error, setError] = useState<string | null>(null);
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null);

  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: '',
    lastName: '',
    email: '',
    attending: 'yes',
    guests: 1,
    dietaryRestrictions: ''
  });

  // Clear error when typing
  useEffect(() => {
    if (error) setError(null);
  }, [lookupName.firstName, lookupName.lastName]);

  const handleLookupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLookupName(prev => ({ ...prev, [name]: value }));
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple case-insensitive match
    const guest = GUEST_LIST.find(
      g => g.firstName.toLowerCase().trim() === lookupName.firstName.toLowerCase().trim() && 
           g.lastName.toLowerCase().trim() === lookupName.lastName.toLowerCase().trim()
    );

    if (guest) {
      if (guest.hasRSVPd) {
        setStep('already_rsvpd');
      } else {
        setFoundGuest(guest);
        setFormData(prev => ({
          ...prev,
          firstName: guest.firstName,
          lastName: guest.lastName
        }));
        setStep('form');
      }
    } else {
      setError(t('rsvp_error_not_found'));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('RSVP Submitted:', formData, 'For Guest ID:', foundGuest?.id);
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-wedding-pattern pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wedding-marigold/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wedding-rani/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-sm p-12 shadow-2xl text-center rounded-2xl border-t-8 border-wedding-rani animate-fade-in-up relative z-10">
          <div className="w-20 h-20 bg-wedding-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={48} className="text-wedding-green" />
          </div>
          <h2 className="font-serif text-4xl text-wedding-charcoal mb-4">{t('rsvp_thanks')}</h2>
          <p className="text-gray-600 font-light mb-8">
            {t('rsvp_thanks_msg')}
          </p>
          <Link 
            to="/"
            className="text-wedding-rani font-bold underline hover:text-pink-700 transition-colors text-sm uppercase tracking-widest"
          >
            {t('rsvp_back_home')}
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'already_rsvpd') {
    return (
        <div className="min-h-screen bg-wedding-pattern pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wedding-marigold/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wedding-rani/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-sm p-12 shadow-2xl text-center rounded-2xl border-t-8 border-wedding-gold animate-fade-in-up relative z-10">
          <div className="w-20 h-20 bg-wedding-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={48} className="text-wedding-charcoal" />
          </div>
          <h2 className="font-serif text-3xl text-wedding-charcoal mb-4">{t('rsvp_already_registered')}</h2>
          <p className="text-gray-600 font-light mb-8">
            {t('rsvp_already_registered_msg')}
          </p>
          <button 
            onClick={() => { setStep('lookup'); setLookupName({firstName:'', lastName:''}); setError(null); }}
            className="text-wedding-charcoal font-bold underline hover:text-wedding-rani transition-colors text-sm uppercase tracking-widest"
          >
            {t('rsvp_another')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-pattern pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wedding-marigold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wedding-rani/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 relative z-10">
        <div className="bg-wedding-rani p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <Sparkles className="absolute top-4 right-4 text-wedding-gold opacity-50" size={32} />
          <div className="relative z-10">
            <p className="uppercase tracking-[0.2em] text-sm font-bold mb-2 text-wedding-gold">{t('rsvp_respond_by')}</p>
            <h2 className="font-serif text-4xl font-bold">December 15, 2026</h2>
          </div>
        </div>
        
        {step === 'lookup' && (
             <form onSubmit={handleLookupSubmit} className="p-8 md:p-12 space-y-8 bg-white/95 backdrop-blur-sm animate-fade-in-up">
                <div className="text-center mb-6">
                    <h3 className="font-serif text-3xl text-wedding-charcoal">{t('rsvp_lookup_title')}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                    <label htmlFor="lookupFirst" className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_first_name')}</label>
                    <input
                        type="text"
                        id="lookupFirst"
                        name="firstName"
                        required
                        value={lookupName.firstName}
                        onChange={handleLookupChange}
                        className="w-full border-b-2 border-gray-200 py-2 focus:border-wedding-rani outline-none transition-colors bg-transparent font-serif text-lg"
                        placeholder="First"
                    />
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="lookupLast" className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_last_name')}</label>
                    <input
                        type="text"
                        id="lookupLast"
                        name="lastName"
                        required
                        value={lookupName.lastName}
                        onChange={handleLookupChange}
                        className="w-full border-b-2 border-gray-200 py-2 focus:border-wedding-rani outline-none transition-colors bg-transparent font-serif text-lg"
                        placeholder="Last"
                    />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="pt-4">
                    <button
                    type="submit"
                    className="w-full bg-wedding-charcoal text-white py-4 font-sans uppercase tracking-widest text-sm hover:bg-black transition-colors flex items-center justify-center gap-2 rounded-full shadow-lg"
                    >
                    {t('rsvp_lookup_btn')} <Search size={16} />
                    </button>
                </div>
            </form>
        )}

        {step === 'form' && foundGuest && (
            <form onSubmit={handleFormSubmit} className="p-8 md:p-12 space-y-8 bg-white/95 backdrop-blur-sm animate-fade-in-up">
            
            <div className="flex items-center gap-3 bg-wedding-cream p-4 rounded-xl border border-wedding-gold/30">
                <div className="bg-wedding-marigold/20 p-2 rounded-full">
                    <User className="text-wedding-marigold" size={20} />
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-500">{t('rsvp_welcome')}</p>
                    <h3 className="font-serif text-2xl text-wedding-charcoal">{foundGuest.firstName} {foundGuest.lastName}</h3>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_email')}</label>
                <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border-b-2 border-gray-200 py-2 focus:border-wedding-rani outline-none transition-colors bg-transparent font-serif text-lg"
                placeholder="email@example.com"
                />
            </div>

            <div className="space-y-4">
                <span className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_attending')}</span>
                <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleFormChange}
                    className="w-5 h-5 text-wedding-rani focus:ring-wedding-rani accent-wedding-rani"
                    />
                    <span className="font-serif text-xl text-gray-700 group-hover:text-wedding-rani transition-colors">{t('rsvp_yes')}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleFormChange}
                    className="w-5 h-5 text-wedding-rani focus:ring-wedding-rani accent-wedding-rani"
                    />
                    <span className="font-serif text-xl text-gray-700 group-hover:text-wedding-rani transition-colors">{t('rsvp_no')}</span>
                </label>
                </div>
            </div>

            {formData.attending === 'yes' && (
                <div className="space-y-8 animate-fade-in-up">
                
                {/* Guest Count Logic based on +1 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_guests')}</label>
                    
                    {foundGuest.hasPlusOne ? (
                        <div className="relative">
                            <select
                                id="guests"
                                name="guests"
                                value={formData.guests}
                                onChange={handleFormChange}
                                className="w-full border-b-2 border-gray-200 py-2 focus:border-wedding-rani outline-none bg-transparent font-serif text-lg appearance-none"
                            >
                                <option value="1">1 Guest ({foundGuest.firstName})</option>
                                <option value="2">2 Guests ({foundGuest.firstName} + 1)</option>
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs font-bold uppercase tracking-widest">
                                {t('rsvp_party_of_2')}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 py-2 border-b-2 border-gray-100 text-gray-500 font-serif text-lg">
                            <Users size={20} />
                            <span>{t('rsvp_party_of')} (1)</span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="dietaryRestrictions" className="block text-xs font-bold uppercase tracking-widest text-wedding-marigold">{t('rsvp_diet')}</label>
                    <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    rows={2}
                    value={formData.dietaryRestrictions}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-wedding-rani outline-none transition-colors"
                    placeholder="..."
                    />
                </div>
                </div>
            )}

            <div className="pt-4 flex gap-4">
                <button
                type="button"
                onClick={() => setStep('lookup')}
                className="w-1/3 bg-gray-100 text-gray-600 py-4 font-sans uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors rounded-full"
                >
                Back
                </button>
                <button
                type="submit"
                className="w-2/3 bg-wedding-charcoal text-white py-4 font-sans uppercase tracking-widest text-sm hover:bg-black transition-colors flex items-center justify-center gap-2 rounded-full shadow-lg"
                >
                {t('rsvp_send')} <Send size={16} />
                </button>
            </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default RSVP;