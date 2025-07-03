
const container = document.getElementById("market");
mockData.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${item.name}</h2>
    <p>Price: ${item.price}</p>
    <p style="color:${item.change.includes('+') ? 'lightgreen' : 'tomato'}">${item.change}</p>
  `;
  container.appendChild(card);
});
