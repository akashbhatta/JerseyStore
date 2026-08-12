export const generateUniqueId = () => {
  return `jersey-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const base64Decode = (base64) => {
  if (!base64) return null;
  try {
    const standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(standardBase64));
  } catch (error) {
    console.error("Base64 decode error:", error);
    return null;
  }
};