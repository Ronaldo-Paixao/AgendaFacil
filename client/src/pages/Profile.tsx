import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Profile() {
const [, navigate] = useLocation();
  const utils = trpc.useUtils();

const { data: profile } =
  trpc.professionals.getProfile.useQuery();

  const createProfile = trpc.professionals.createProfile.useMutation({
  onSuccess: () => {
    utils.professionals.getProfile.invalidate();
  },
});

const updateProfile = trpc.professionals.updateProfile.useMutation({
  onSuccess: () => {
    utils.professionals.getProfile.invalidate();
  },
});

  const [formData, setFormData] = useState({
  slug: "",
  businessName: "",
  description: "",
  phone: "",
  whatsapp: "",
});

const [editingSlug, setEditingSlug] = useState(false);

useEffect(() => {
  if (profile) {
    setFormData({
      slug: profile.slug || "",
      businessName: profile.businessName || "",
      description: profile.description || "",
      phone: profile.phone || "",
      whatsapp: profile.whatsapp || "",
    });
  }
}, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("ENVIANDO:", formData);

  if (profile) {
    await updateProfile.mutateAsync(formData);
  } else {
    await createProfile.mutateAsync(formData);
  }

  setEditingSlug(false);

  alert("Perfil atualizado com sucesso!");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
  type="button"
  onClick={() => navigate("/")}
  className="mb-4 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-800 hover:bg-amber-50 transition"
>
  ← Voltar ao Início
</button>

<h1 className="text-4xl font-bold text-amber-900 mb-8">
  Meu Perfil
</h1>

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
              disabled={!editingSlug}
            />
          </div>

{profile && (
  <button
    type="button"
    onClick={() => {
      const confirmed = window.confirm(
        "Alterar a URL pode invalidar links já compartilhados. Deseja continuar?"
      );

      if (confirmed) {
        setEditingSlug(true);
      }
    }}
    className="mb-6 text-sm text-blue-600 hover:text-blue-800"
  >
    Alterar URL Pública
  </button>
)}

{formData.slug && (
  <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
    <label className="block text-amber-900 font-semibold mb-2">
      Link Público de Agendamento
    </label>

    <div className="flex gap-2">
      <input
        type="text"
        value={`http://localhost:5173/book/${formData.slug}`}
        readOnly
        className="flex-1 px-4 py-2 border border-amber-200 rounded-lg bg-white"
      />

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(
            `http://localhost:5173/book/${formData.slug}`
          );

          alert("Link copiado!");
        }}
        className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
      >
        Copiar
      </button>
    </div>

    <button
      type="button"
      onClick={() =>
        window.open(
          `http://localhost:5173/book/${formData.slug}`,
          "_blank"
        )
      }
      className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    >
      Abrir Página de Agendamento
    </button>
  </div>
)}

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
