const API_URL = 'https://v6.exchangerate-api.com/v6/72632ad909be0ed55bb6ea11/latest/USD';

export async function exchangeRates() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rates");

    const data = await response.json();
    return data.conversion_rates; // Contains rates like { INR: 83.33, EUR: 0.92, ... }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}
