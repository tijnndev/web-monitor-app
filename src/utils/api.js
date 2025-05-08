const BASE_URL = `${import.meta.env.VITE_API_URL}/store`;

export async function fetchStoreProducts() {
  try {
    const response = await fetch(`${BASE_URL}s/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch store list");
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchStores() {
  try {
    const response = await fetch(`${BASE_URL}s`);
    if (!response.ok) {
      throw new Error("Failed to fetch store list");
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function fetchStoreData(store) {
  try {
    const response = (await fetch(`${BASE_URL}s/${store}`))
    if (!response.ok) {
      console.log(response)
      throw new Error(`Failed to fetch ${store} data`);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}