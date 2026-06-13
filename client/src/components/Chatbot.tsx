import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const handleQuestion = (question: string) => {
    let answer = "";

    switch (question) {
      case "agendar":
        answer =
          "Para agendar um serviço, acesse o link público do profissional.";
        break;

      case "servicos":
        answer =
          "Os serviços disponíveis são exibidos na página pública do profissional.";
        break;

      case "horarios":
        answer =
          "Os horários disponíveis são definidos pelo profissional.";
        break;

      default:
        answer = "Como posso ajudar?";
    }

    alert(answer);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-amber-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-amber-700"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 bg-white w-80 rounded-lg shadow-xl border border-amber-100 p-4">
          <h3 className="font-bold text-amber-900 mb-4">
            Assistente AgendaFácil
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => handleQuestion("agendar")}
              className="w-full text-left p-2 bg-amber-50 rounded hover:bg-amber-100"
            >
              Como agendar?
            </button>

            <button
              onClick={() => handleQuestion("servicos")}
              className="w-full text-left p-2 bg-amber-50 rounded hover:bg-amber-100"
            >
              Ver serviços
            </button>

            <button
              onClick={() => handleQuestion("horarios")}
              className="w-full text-left p-2 bg-amber-50 rounded hover:bg-amber-100"
            >
              Horários disponíveis
            </button>
          </div>
        </div>
      )}
    </>
  );
}