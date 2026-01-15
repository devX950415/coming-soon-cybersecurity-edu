'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-muted text-sm mb-8">
        Let&apos;s talk about your next way of education yourself through a platform with AI
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-muted text-sm mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full bg-transparent border-b border-theme pb-2 text-theme focus:outline-none transition-colors"
            placeholder="Somya"
          />
        </div>
        <div>
          <label className="block text-muted text-sm mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full bg-transparent border-b border-theme pb-2 text-theme focus:outline-none transition-colors"
            placeholder="Prakash"
          />
        </div>
      </div>

      <div>
        <label className="block text-muted text-sm mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent border-b border-theme pb-2 text-theme focus:outline-none transition-colors"
          placeholder="somya@gmail.com"
        />
      </div>

      <div>
        <label className="block text-muted text-sm mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-transparent border-b border-theme pb-2 text-theme focus:outline-none transition-colors"
          placeholder="0876543210"
        />
      </div>

      <div>
        <label className="block text-muted text-sm mb-2">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-theme pb-2 text-theme focus:outline-none transition-colors resize-none"
          placeholder="Tell us more about yourself..."
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-3 rounded-full font-medium transition-colors"
        style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      >
        Submit
      </button>
    </form>
  );
}
