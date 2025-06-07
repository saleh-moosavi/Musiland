export function objectToQueryString(obj: any, prefix = ""): any {
  const params = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}[${key}]` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        // پردازش آبجکت‌های تو در تو
        params.push(objectToQueryString(value, newKey));
      } else if (Array.isArray(value)) {
        // پردازش آرایه‌ها
        value.forEach((item, index) => {
          params.push(objectToQueryString(item, `${newKey}[${index}]`));
        });
      } else {
        // مقادیر ساده
        params.push(
          `${encodeURIComponent(newKey)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return params.filter(Boolean).join("&");
}
