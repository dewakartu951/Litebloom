
function analyzeSentiment(news) {
  const positiveWords = ["naik", "rebound", "masuk", "optimis"];
  const negativeWords = ["turun", "larangan", "gejolak", "crash"];
  const text = (news.title + " " + news.summary).toLowerCase();
  if (positiveWords.some(w => text.includes(w))) return "Positive";
  if (negativeWords.some(w => text.includes(w))) return "Negative";
  return "Neutral";
}

function isValidSource(source) {
  return source.includes("reuters") || source.includes("bloomberg") || source.includes("federalreserve") || source.includes("investing");
}

function renderMarket(data) {
  const marketDiv = document.getElementById("market");
  marketDiv.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${item.name}</h3>
                      <p>Harga: ${item.price}</p>
                      <p style="color:${item.change.includes('+') ? 'lightgreen' : 'salmon'}">${item.change}</p>`;
    marketDiv.appendChild(card);
  });
}

function renderNews(data) {
  const newsDiv = document.getElementById("news");
  newsDiv.innerHTML = "";
  data.forEach(news => {
    const sentiment = analyzeSentiment(news);
    const valid = isValidSource(news.source);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${news.title}</h3>
                      <p><em>${news.category}</em></p>
                      <p>${news.summary}</p>
                      <p>Sentimen: <strong>${sentiment}</strong></p>
                      ${!valid ? "<p style='color:gold'>⚠️ Sumber tidak sah</p>" : ""}
                      <a href="${news.source}" target="_blank" style="color:lightblue">Baca Selengkapnya</a>`;
    newsDiv.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = marketData.filter(item => item.name.toLowerCase().includes(keyword));
  renderMarket(filtered);
});

renderMarket(marketData);
renderNews(newsData);
