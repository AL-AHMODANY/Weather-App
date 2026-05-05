// ─── All 36 Nigerian States + FCT ────────────────────────────────────────────
export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
  "Abuja (FCT)",
];

// ─── World Cities by Region ───────────────────────────────────────────────────
export const worldCities = {
  "🌍 Africa": [
    "Lagos", "Abuja", "Kano", "Ibadan", "Nairobi", "Cairo", "Casablanca",
    "Accra", "Dakar", "Addis Ababa", "Johannesburg", "Cape Town", "Durban",
    "Kampala", "Dar es Salaam", "Lusaka", "Harare", "Maputo", "Luanda",
    "Kinshasa", "Douala", "Yaoundé", "Abidjan", "Bamako", "Conakry",
    "Tunis", "Algiers", "Tripoli", "Khartoum", "Mogadishu", "Antananarivo",
  ],
  "🌍 Europe": [
    "London", "Paris", "Berlin", "Madrid", "Rome", "Amsterdam", "Brussels",
    "Vienna", "Zurich", "Stockholm", "Oslo", "Copenhagen", "Helsinki",
    "Warsaw", "Prague", "Budapest", "Bucharest", "Athens", "Lisbon",
    "Dublin", "Edinburgh", "Manchester", "Barcelona", "Milan", "Munich",
    "Hamburg", "Frankfurt", "Lyon", "Marseille", "Naples", "Turin",
    "Kyiv", "Minsk", "Riga", "Tallinn", "Vilnius", "Sofia", "Zagreb",
    "Belgrade", "Sarajevo", "Skopje", "Tirana", "Podgorica", "Ljubljana",
    "Bratislava", "Reykjavik", "Valletta", "Nicosia", "Luxembourg",
  ],
  "🌏 Asia": [
    "Tokyo", "Beijing", "Shanghai", "Mumbai", "Delhi", "Bangalore",
    "Chennai", "Kolkata", "Hyderabad", "Karachi", "Lahore", "Islamabad",
    "Dhaka", "Colombo", "Kathmandu", "Kabul", "Tehran", "Baghdad",
    "Riyadh", "Jeddah", "Dubai", "Abu Dhabi", "Doha", "Kuwait City",
    "Muscat", "Manama", "Amman", "Beirut", "Damascus", "Jerusalem",
    "Tel Aviv", "Istanbul", "Ankara", "Baku", "Tbilisi", "Yerevan",
    "Tashkent", "Almaty", "Bishkek", "Ashgabat", "Dushanbe", "Ulaanbaatar",
    "Seoul", "Busan", "Pyongyang", "Hong Kong", "Taipei", "Macau",
    "Bangkok", "Hanoi", "Ho Chi Minh City", "Phnom Penh", "Vientiane",
    "Yangon", "Naypyidaw", "Kuala Lumpur", "Singapore", "Jakarta",
    "Surabaya", "Bandung", "Manila", "Cebu", "Davao", "Colombo",
    "Kathmandu", "Thimphu", "Male", "Dili",
  ],
  "🌎 North America": [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
    "Fort Worth", "Columbus", "Charlotte", "Indianapolis", "San Francisco",
    "Seattle", "Denver", "Nashville", "Oklahoma City", "El Paso", "Boston",
    "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee",
    "Albuquerque", "Tucson", "Fresno", "Sacramento", "Atlanta", "Miami",
    "Minneapolis", "New Orleans", "Cleveland", "Tampa", "Pittsburgh",
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa",
    "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
    "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana",
    "Havana", "Kingston", "Port-au-Prince", "Santo Domingo", "San Juan",
    "Guatemala City", "San Salvador", "Tegucigalpa", "Managua", "San Jose",
    "Panama City", "Nassau", "Bridgetown", "Port of Spain",
  ],
  "🌎 South America": [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza",
    "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre",
    "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata",
    "Lima", "Arequipa", "Trujillo", "Chiclayo", "Iquitos",
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
    "Santiago", "Valparaíso", "Concepción",
    "Caracas", "Maracaibo", "Valencia", "Barquisimeto",
    "Quito", "Guayaquil", "Cuenca",
    "La Paz", "Santa Cruz", "Cochabamba",
    "Asunción", "Montevideo", "Georgetown", "Paramaribo", "Cayenne",
  ],
  "🌏 Oceania": [
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
    "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville",
    "Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin",
    "Port Moresby", "Suva", "Honiara", "Port Vila", "Nuku'alofa",
    "Apia", "Funafuti", "Tarawa", "Majuro", "Palikir",
  ],
};

// Flat list of all world cities for search
export const allWorldCities = Object.values(worldCities).flat();
