export interface LeadData {
  source: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  message?: string;
  tool_data?: Record<string, unknown>;
}

export interface LeadResult {
  success: boolean;
  error?: string;
  id?: number;
}

/**
 * Wysyła lead przez Next.js API route (/api/leads),
 * które proxy'uje do WordPress REST API.
 *
 * Użycie:
 *   const result = await submitLead({ source: 'kalkulator-raty', name, phone, email, tool_data });
 *   if (!result.success) showError(result.error);
 */
export async function submitLead(data: LeadData): Promise<LeadResult> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: json.error ?? "Błąd wysyłania formularza. Spróbuj ponownie.",
      };
    }

    return { success: true, id: json.id };
  } catch {
    return {
      success: false,
      error: "Brak połączenia z serwerem. Spróbuj ponownie lub zadzwoń: 577 873 616",
    };
  }
}
