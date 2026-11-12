'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplicationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    position: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (!stored) {
      router.push('/login');
    } else {
      setEmail(stored);
    }
  }, [router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setSuccess('Application submitted successfully!');
      setForm({ fullName: '', phone: '', address: '', position: '', experience: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Application Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Position Applied For"
          value={form.position}
          onChange={handleChange}
          required
        />
        <textarea
          name="experience"
          placeholder="Experience / Notes"
          rows={4}
          value={form.experience}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}