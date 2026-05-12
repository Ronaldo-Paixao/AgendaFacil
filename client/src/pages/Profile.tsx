import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Profile() {
  const { data: profile } = trpc.professionals.getProfile.useQuery();
  const createProfile = trpc.professionals.createProfile.useMutation();
  const updateProfile = trpc.professionals.updateProfile.useMutation();

  const [formData, setFormData] = useState({
    slug: profile?.slug || "",
    businessName: profile?.businessName || "",
    description: profile?.description || "",
    phone: profile?.phone || "",
    whatsapp: profile?.whatsapp || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      await updateProfile.mutateAsync(formData);
    } else {
      await createProfile.mutateAsync(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Meu Perfil</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm border border-amber-100">
          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Nome do Negócio</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={e => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">URL Personalizada</label>
            <input
              type="text"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
              disabled={!!profile}
            />
          </div>

          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">WhatsApp</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition"
          >
            {profile ? "Atualizar Perfil" : "Criar Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}
