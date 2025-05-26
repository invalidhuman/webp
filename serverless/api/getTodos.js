export default async function handler(request, response) {
  const API_URL = process.env.BASE_URL;

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return response.status(200).json({ data });
}
