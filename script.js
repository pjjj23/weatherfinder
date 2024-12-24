 
        function toggleTheme() {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
            document.querySelector('.theme-toggle i').className = `fas ${icon}`;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-toggle i').className = 'fas fa-sun';
        }

        document.getElementById("search-btn").addEventListener("click", function() {
            const country = document.getElementById("country").value;
            const apiKey = "687006ff5ddd44bb8cc145240242412";
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error("Location not found");
                    return response.json();
                })
                .then(data => displayWeather(data))
                .catch(error => {
                    document.getElementById("weather-result").innerHTML = `
                        <div class="error-card">
                            <i class="fas fa-exclamation-circle fa-lg"></i>
                            <p>${error.message}</p>
                        </div>`;
                });
        });

        function displayWeather(data) {
            const { location, current } = data;
            const iconUrl = current.condition.icon.replace('http://', 'https://');
            const resultHTML = `
                <div class="weather-card">
                    <div class="weather-header">
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${location.name}, ${location.country}
                        </div>
                    </div>
                    <div class="temperature">
                        ${current.temp_c}°C
                    </div>
                    <div class="condition">
                        ${current.condition.text}
                    </div>
                    <img class="weather-icon" src="${iconUrl}" alt="${current.condition.text}" onerror="this.src='https://cdn.weatherapi.com/weather/64x64/day/116.png'">
                    <div class="weather-details">
                        <div class="weather-detail">
                            <i class="fas fa-wind"></i>
                            <div>
                                <div>Wind Speed</div>
                                <strong>${current.wind_kph} kph</strong>
                            </div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-tint"></i>
                            <div>
                                <div>Humidity</div>
                                <strong>${current.humidity}%</strong>
                            </div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-compress-arrows-alt"></i>
                            <div>
                                <div>Pressure</div>
                                <strong>${current.pressure_mb} mb</strong>
                            </div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-eye"></i>
                            <div>
                                <div>Visibility</div>
                                <strong>${current.vis_km} km</strong>
                            </div>
                        </div>
                    </div>
                </div>`;
            document.getElementById("weather-result").innerHTML = resultHTML;
        }

        document.getElementById("country").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                document.getElementById("search-btn").click();
            }
        });