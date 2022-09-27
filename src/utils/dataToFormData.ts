export const dataToFormData = (payload: Record<string, any>): FormData => {
  const data: FormData = new FormData();
  Object.entries(payload).forEach(([payloadKey, payloadValue]) => {
    if (Array.isArray(payloadValue)) {
      payloadValue.forEach((arrKey) => {
        if (
          typeof arrKey === "object" &&
          arrKey !== null &&
          !(arrKey instanceof Blob)
        ) {
          data.append(`${payloadKey}[]`, JSON.stringify(arrKey));
        } else {
          data.append(`${payloadKey}[]`, arrKey);
        }
      });
    } else if (
      typeof payloadValue === "object" &&
      payloadValue !== null &&
      !(payloadValue instanceof Blob)
    ) {
      data.append(payloadKey, JSON.stringify(payloadValue));
    } else {
      data.append(payloadKey, payloadValue as string);
    }
  });
  return data;
};
