export const formatUSPhoneNumber = (phoneNumber?: string): string => {
  if (!phoneNumber) return "N/A";

  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  return phoneNumber;
};
