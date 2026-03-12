#!/bin/bash

# Configuration
API_URL="http://localhost:8080/weather"

echo "Starting weather data seeding to $API_URL..."

# City data: City|Region|Latitude|Longitude
cities=(
  "London|Europe|51.5074|-0.1278"
  "New York|North America|40.7128|-74.0060"
  "Tokyo|Asia|35.6895|139.6917"
  "Sydney|Australia|-33.8688|151.2093"
  "Paris|Europe|48.8566|2.3522"
  "Toronto|North America|43.6532|-79.3832"
  "São Paulo|South America|-23.5505|-46.6333"
)

# Current time in seconds
now=$(date +%s)

# 1 day in seconds
day=86400

# Start timestamp = 6 days ago
start=$((now - 6 * day))

index=0

for city_info in "${cities[@]}"; do
  IFS="|" read -r city region lat lon <<< "$city_info"

  # Timestamp evenly spaced by 1 day
  timestamp=$(( (start + index * day) * 1000 ))

  # Generate random temperature between -5 and 35
  temperature=$(awk -v min=-5 -v max=35 'BEGIN{srand(); print min+rand()*(max-min)}')

  echo "Posting weather for $city..."

  curl --location "$API_URL" \
    --header 'Content-Type: application/json' \
    --data "{
      \"cityName\": \"$city\",
      \"region\": \"$region\",
      \"latitude\": $lat,
      \"longitude\": $lon,
      \"temperature\": $temperature,
      \"timestamp\": $timestamp
    }"

  echo -e "\nDone."

  ((index++))
done

echo "Weather seeding complete!"
