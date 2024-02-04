export async function postJSON(url, data) {
  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let json = await res.json();
  return json;
}
