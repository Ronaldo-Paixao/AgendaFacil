export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-amber-200">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Empresa */}
          <div>
            <h3 className="text-lg font-bold text-amber-900">
              AgendaFácil
            </h3>

            <p className="text-amber-700 mt-2 text-sm">
              Plataforma de agendamento online para profissionais autônomos.
            </p>
          </div>

          {/* Contatos */}
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              Contato
            </h4>

            <div className="space-y-1 text-sm text-amber-600">
              <p>📧 contato@agendafacil.com</p>
              <p>📱 (81) 99999-9999</p>
              <p>📍 Recife - PE</p>
<div className="mt-4">
  <iframe
    title="Mapa"
    src="https://www.google.com/maps?q=Recife,PE&output=embed"
    width="100%"
    height="150"
    style={{ border: 0 }}
    loading="lazy"
    className="rounded-lg"
  />
</div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              Redes Sociais
            </h4>

            <div className="space-y-1 text-sm">
              <p>📷 Instagram</p>
              <p>💼 LinkedIn</p>
              <p>💬 WhatsApp</p>
            </div>
          </div>

        </div>

        <div className="border-t border-amber-100 mt-8 pt-4 text-center">
          <p className="text-xs text-amber-500">
            © 2026 AgendaFácil. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}