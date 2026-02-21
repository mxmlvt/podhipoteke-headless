"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  message?: string;
}

type FieldName = "name" | "phone" | "email" | "city" | "message";

interface LeadCaptureModalProps {
  trigger: ReactNode;
  heading: string;
  description: string;
  onSubmit: (data: LeadData) => void;
  fields?: FieldName[];
}

export default function LeadCaptureModal({
  trigger,
  heading,
  description,
  onSubmit,
  fields = ["name", "phone", "email"],
}: LeadCaptureModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LeadData>({});
  const [rodo, setRodo] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rodo) return;
    onSubmit(formData);
    setSubmitted(true);
  };

  const fieldLabels: Record<FieldName, string> = {
    name: "Imię i nazwisko",
    phone: "Telefon",
    email: "E-mail",
    city: "Miasto",
    message: "Wiadomość",
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#111827] text-xl">{heading}</DialogTitle>
            <DialogDescription className="text-[#6b7280]">{description}</DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold text-[#111827] mb-1">Dziękujemy za kontakt!</p>
              <p className="text-sm text-[#6b7280]">Odezwiemy się najszybciej jak to możliwe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {fields.map((field) => (
                <div key={field}>
                  <Label htmlFor={field} className="text-sm font-medium text-[#374151]">
                    {fieldLabels[field]}
                  </Label>
                  {field === "message" ? (
                    <Textarea
                      id={field}
                      className="mt-1"
                      rows={3}
                      value={formData[field] || ""}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  ) : (
                    <Input
                      id={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      className="mt-1"
                      value={formData[field] || ""}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  )}
                </div>
              ))}

              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="rodo"
                  checked={rodo}
                  onCheckedChange={(v) => setRodo(!!v)}
                />
                <Label htmlFor="rodo" className="text-xs text-[#6b7280] leading-relaxed cursor-pointer">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na moje zapytanie, zgodnie z{" "}
                  <a href="/polityka-prywatnosci" className="text-[#2299AA] underline">
                    Polityką Prywatności
                  </a>
                  .
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!rodo}
                className="w-full bg-[#1c435e] hover:bg-[#254d6b] text-white"
              >
                Wyślij zapytanie
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
