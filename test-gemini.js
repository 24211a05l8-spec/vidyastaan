const apiKey = "AIzaSyBodoLZwu4yP_tDUADXJeUeSVWOxHyWO3c";
async function run() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  const models = data.models.map(m => m.name);
  console.log("AVAILABLE MODELS:", models);
}
run();
