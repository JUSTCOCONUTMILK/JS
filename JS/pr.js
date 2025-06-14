const apiKey = '';

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("errorMsg");
  resultDiv.innerHTML = "";
  errorDiv.innerText = "";

  if (!city) {
    errorDiv.innerText = "Введите название города.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    resultDiv.innerHTML = `
      <h3>${data.name}</h3>
      <img src="${iconUrl}" alt="${description}" />
      <p><strong>${temp.toFixed(1)}°C</strong></p>
      <p>${description}</p>
    `;
  } catch (err) {
    errorDiv.innerText = "Ошибка: " + err.message;
  }
}
