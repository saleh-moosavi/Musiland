const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = {
  /***************** Get *****************/
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
    });

    return await response.json();
  },

  /***************** Post *****************/
  async post<T>(
    url: string,
    data: Record<string, string | number | boolean | object>,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await response.json();
  },

  /***************** Put *****************/
  async put<T>(
    url: string,
    data: Record<string, string | number | boolean | object>,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await response.json();
  },

  /***************** Delete *****************/
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
      cache: "no-store",
    });

    return await response.json();
  },
};
