"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Star, CheckCircle, ChevronRight, UserCircle2 } from 'lucide-react';

export default function BookingSystem({ data }: { data: any }) {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  if (!data) return <div className="p-8 text-center">Loading booking system...</div>;

  const { serviceName = "Booking Portal", description, providers = [], availableSlots = [], services = [] } = data;

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      // Reset state after showing success message
      setIsBooked(false);
      setSelectedService(null);
      setSelectedProvider(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-rose-50/30 text-stone-900 font-sans pb-24 flex flex-col items-center pt-12 px-4 sm:px-6">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">{serviceName}</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">{description || "Select a service, choose your preferred provider, and find a time that works for you."}</p>
        </div>

        {isBooked ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-rose-100 flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Booking Confirmed!</h2>
            <p className="text-stone-600 text-lg max-w-md mb-8">
              You are all set for your {selectedService?.name} appointment with {selectedProvider?.name} at {selectedTime}.
            </p>
            <p className="text-stone-400 text-sm">We've sent a confirmation email with details.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl shadow-rose-900/5 border border-rose-100/50 overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Sidebar (Progress / Selection Info) */}
            <div className="w-full md:w-1/3 bg-stone-50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-stone-200/60">
              <h3 className="font-bold text-lg text-stone-900 mb-6">Your Selection</h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent hidden"></div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold transition-colors ${selectedService ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-100 text-rose-600'}`}>1</div>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-1">Service</h4>
                    {selectedService ? (
                      <p className="text-sm font-medium text-rose-600">{selectedService.name}</p>
                    ) : (
                      <p className="text-sm text-stone-500">Select a service</p>
                    )}
                  </div>
                </div>
                
                <div className={`flex gap-4 transition-opacity ${!selectedService ? 'opacity-50' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold transition-colors ${selectedProvider ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-100 text-rose-600'}`}>2</div>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-1">Provider</h4>
                    {selectedProvider ? (
                      <p className="text-sm font-medium text-rose-600">{selectedProvider.name}</p>
                    ) : (
                      <p className="text-sm text-stone-500">Choose a professional</p>
                    )}
                  </div>
                </div>

                <div className={`flex gap-4 transition-opacity ${!selectedProvider ? 'opacity-50' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold transition-colors ${selectedTime ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-100 text-rose-600'}`}>3</div>
                  <div>
                    <h4 className="font-bold text-stone-900 mb-1">Date & Time</h4>
                    {selectedTime ? (
                      <p className="text-sm font-medium text-rose-600">Selected: {selectedTime}</p>
                    ) : (
                      <p className="text-sm text-stone-500">Pick a time slot</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedTime && (
                <div className="mt-12 pt-6 border-t border-stone-200">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-stone-500 font-medium">Total Price</span>
                    <span className="text-2xl font-bold text-stone-900">{selectedService?.price}</span>
                  </div>
                  <button 
                    onClick={handleBook}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-rose-600/20"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>

            {/* Right Main Area (Selection Steps) */}
            <div className="flex-1 p-6 sm:p-8 min-h-[500px]">
              
              {!selectedService && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
                  <div className="grid gap-3">
                    {services.map((s: any, i: number) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedService(s)}
                        className="text-left p-5 rounded-2xl border-2 border-stone-100 hover:border-rose-300 hover:bg-rose-50/50 transition-all group flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-bold text-lg text-stone-900 group-hover:text-rose-700 transition-colors">{s.name}</h3>
                          <p className="text-stone-500 text-sm mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {s.duration}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg text-stone-900">{s.price}</span>
                          <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-rose-500 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedService && !selectedProvider && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <button onClick={() => setSelectedService(null)} className="text-sm font-medium text-stone-500 hover:text-stone-900 mb-6 flex items-center gap-1 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to services
                  </button>
                  <h2 className="text-2xl font-bold mb-6">Choose a Professional</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {providers.map((p: any, i: number) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedProvider(p)}
                        className="text-left p-5 rounded-2xl border-2 border-stone-100 hover:border-rose-300 hover:bg-rose-50/50 transition-all group flex flex-col items-center text-center"
                      >
                        <div className="w-16 h-16 bg-stone-100 rounded-full mb-3 flex items-center justify-center text-stone-400 group-hover:bg-white shadow-sm transition-colors">
                          <UserCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-stone-900 group-hover:text-rose-700 transition-colors">{p.name}</h3>
                        <p className="text-stone-500 text-sm mb-2">{p.role}</p>
                        <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" /> {p.rating}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedService && selectedProvider && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <button onClick={() => setSelectedProvider(null)} className="text-sm font-medium text-stone-500 hover:text-stone-900 mb-6 flex items-center gap-1 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to providers
                  </button>
                  <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
                  
                  <div className="mb-8">
                    <h3 className="font-medium text-stone-700 mb-3 flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Available Days (This Week)</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {[1,2,3,4,5].map(day => (
                        <button 
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`flex-shrink-0 w-16 p-2 rounded-xl border-2 text-center transition-all ${selectedDate === day ? 'border-rose-500 bg-rose-50' : 'border-stone-100 hover:border-rose-200'}`}
                        >
                          <span className="block text-xs text-stone-500 font-medium uppercase mb-1">Mon</span>
                          <span className={`block text-xl font-bold ${selectedDate === day ? 'text-rose-600' : 'text-stone-900'}`}>{day + 10}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`transition-opacity duration-300 ${!selectedDate ? 'opacity-30 pointer-events-none' : ''}`}>
                    <h3 className="font-medium text-stone-700 mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Available Slots</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableSlots.map((slot: string, i: number) => (
                        <button 
                          key={i}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all ${selectedTime === slot ? 'border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'border-stone-100 bg-white text-stone-700 hover:border-rose-300 hover:bg-rose-50'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
