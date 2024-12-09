export const base64ToHex = (base64: string): string => {
  const binaryData = Buffer.from(base64, "base64");

  return binaryData.toString("hex");
};
 