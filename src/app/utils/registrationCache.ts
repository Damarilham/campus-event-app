const KEY = "campus_registered_events";

export function getRegisteredEvents(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isEventRegistered(eventId: number): boolean {
  return getRegisteredEvents().includes(eventId);
}

export function saveEventRegistration(eventId: number): void {
  const registered = getRegisteredEvents();
  if (!registered.includes(eventId)) {
    localStorage.setItem(KEY, JSON.stringify([...registered, eventId]));
  }
}

export function removeEventRegistration(eventId: number): void {
  const registered = getRegisteredEvents();
  const updated = registered.filter(id => id !== eventId);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearRegistrationCache(): void {
  localStorage.removeItem(KEY);
}
