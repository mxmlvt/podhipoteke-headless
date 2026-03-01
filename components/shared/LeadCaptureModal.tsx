"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, CheckCircle } from "lucide-react";
import { submitLead, type LeadData } from "@/lib/leads";

type FieldName = "name" | "phone" | "email" | "city" | "message";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  heading: string;
  description: string;
  fields?: FieldName[];
  /** Dane niezwiązane z formularzem (source, tool_data) */
  leadData: Omit<LeadData, "name" | "phone" | "email" | "city" | "message">;
  /** Wywołane po udanym submitcie leada */
  onSuccess?: () => void;
  /** Tekst na przycisku submit */
  submitLabel?: string;
}

const fieldConfig: Record<FieldName, { type: string; placeholder: string; required: boolean }> = {
  name:    { type: "text",     placeholder: "Imię i nazwisko *",    required: true },
  phone:   { type: "tel",      placeholder: "Numer telefonu *",     required: true },
  email:   { type: "email",    placeholder: "Adres e-mail *",       required: true },
  city:    { type: "text",     placeholder: "Miasto (opcjonalnie)", required: false },
  message: { type: "textarea", placeholder: "Wiadomość (opcjonalnie)", required: false },
};

export default function LeadCaptureModal({
  open,
  onClose,
  heading,
  description,
  fields = ["name", "phone", "email"],
  leadData,
  onSuccess,
  submitLabel = "Pobierz bezpłatnie",
}: LeadCaptureModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    if (!loading) {
      setSent(false);
      setError("");
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await submitLead({ ...leadData, ...form });
    setLoading(false);

    if (result.success) {
      setSent(true);
      onSuccess?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag?.("event", "conversion", { send_to: "AW-11125929915/zO7JCP6YjYEcELvvoLkp" });
    } else {
      setError(result.error ?? "Błąd wysyłania. Spróbuj ponownie.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] " +
    "focus:outline-none focus:ring-2 focus:ring-[#2299AA]/30 focus:border-[#2299AA] transition-colors text-sm";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        <div className="bg-[#1c435e] px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">{heading}</DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-1">{description}</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-14 h-14 text-[#2299AA] mx-auto mb-3" />
              <p className="text-lg font-bold text-[#111827] mb-1">Dziękujemy!</p>
              <p className="text-[#6b7280] text-sm">
                Twój raport zostanie pobrany automatycznie. Skontaktujemy się w ciągu 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map((field) => {
                const cfg = fieldConfig[field];
                const value = form[field];
                const onChange = (
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setForm((f) => ({ ...f, [field]: e.target.value }));

                if (cfg.type === "textarea") {
                  return (
                    <textarea
                      key={field}
                      placeholder={cfg.placeholder}
                      required={cfg.required}
                      value={value}
                      onChange={onChange}
                      rows={3}
                      className={inputClass + " resize-none"}
                    />
                  );
                }
                return (
                  <input
                    key={field}
                    type={cfg.type}
                    placeholder={cfg.placeholder}
                    required={cfg.required}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                  />
                );
              })}

              {error && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Wysyłanie…" : submitLabel}
              </button>

              <p className="text-xs text-[#9ca3af] text-center">
                🔒 Dane są bezpieczne. Nie wysyłamy spamu.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
