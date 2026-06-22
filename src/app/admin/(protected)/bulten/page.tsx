"use client";

import { useEffect, useState } from "react";

type Subscriber = {
  id: string;
  email: string;
  createdAt: string;
};

export default function AdminBultenPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bulten")
      .then((res) => res.json())
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Bülten Aboneleri</h1>
      <div className="overflow-x-auto rounded-xl border border-brown-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-brown-100 text-left text-brown-700">
            <tr>
              <th className="p-3">E-posta</th>
              <th className="p-3">Kayıt Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-t border-brown-100">
                <td className="p-3 text-brown-700">{s.email}</td>
                <td className="p-3 text-brown-500">{new Date(s.createdAt).toLocaleDateString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && <p className="p-4 text-brown-500">Henüz abone bulunmuyor.</p>}
      </div>
    </div>
  );
}
