import React, { useState, useMemo, useCallback } from "react";
import { Country, State, City } from "country-state-city";
import continentMap from "../data/continentMap.js";
import { FiSearch, FiChevronDown, FiChevronUp, FiChevronRight, FiMapPin } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
];

const CONTINENT_EMOJI = {
  Africa: "🌍",
  Asia: "🌏",
  Europe: "🌍",
  "North America": "🌎",
  "South America": "🌎",
  Oceania: "🌏",
};

// Group all countries by continent
const allCountries = Country.getAllCountries();
const byContinent = {};
CONTINENTS.forEach((c) => (byContinent[c] = []));
allCountries.forEach((country) => {
  const cont = continentMap[country.isoCode];
  if (cont && byContinent[cont]) byContinent[cont].push(country);
});
// Sort each continent's countries alphabetically
CONTINENTS.forEach((c) =>
  byContinent[c].sort((a, b) => a.name.localeCompare(b.name))
);

const LocationBrowser = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  // Drill-down state
  const [continent, setContinent] = useState(null);   // string
  const [country, setCountry] = useState(null);        // country object
  const [stateObj, setStateObj] = useState(null);      // state object

  // Filter per level
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // ── Derived lists ──────────────────────────────────────────────────────────
  const countries = useMemo(() => {
    if (!continent) return [];
    const list = byContinent[continent] || [];
    if (!countryFilter.trim()) return list;
    return list.filter((c) =>
      c.name.toLowerCase().includes(countryFilter.toLowerCase())
    );
  }, [continent, countryFilter]);

  const states = useMemo(() => {
    if (!country) return [];
    const list = State.getStatesOfCountry(country.isoCode);
    if (!stateFilter.trim()) return list;
    return list.filter((s) =>
      s.name.toLowerCase().includes(stateFilter.toLowerCase())
    );
  }, [country, stateFilter]);

  const cities = useMemo(() => {
    if (!stateObj || !country) return [];
    const list = City.getCitiesOfState(country.isoCode, stateObj.isoCode);
    if (!cityFilter.trim()) return list;
    return list.filter((c) =>
      c.name.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }, [stateObj, country, cityFilter]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const selectContinent = useCallback((c) => {
    setContinent(c);
    setCountry(null);
    setStateObj(null);
    setCountryFilter("");
    setStateFilter("");
    setCityFilter("");
  }, []);

  const selectCountry = useCallback((c) => {
    setCountry(c);
    setStateObj(null);
    setStateFilter("");
    setCityFilter("");
  }, []);

  const selectState = useCallback((s) => {
    setStateObj(s);
    setCityFilter("");
  }, []);

  const selectCity = useCallback(
    (cityName) => {
      onSelect(cityName);
      setOpen(false);
    },
    [onSelect]
  );

  const goBack = () => {
    if (stateObj) { setStateObj(null); setCityFilter(""); }
    else if (country) { setCountry(null); setStateFilter(""); }
    else if (continent) { setContinent(null); setCountryFilter(""); }
  };

  // ── Breadcrumb ─────────────────────────────────────────────────────────────
  const breadcrumb = [
    continent && (
      <span key="cont" className="flex items-center gap-1">
        <span>{CONTINENT_EMOJI[continent]}</span>
        <span>{continent}</span>
      </span>
    ),
    country && (
      <span key="country" className="flex items-center gap-1">
        <FiChevronRight size={12} className="text-white/30" />
        <span>{country.flag}</span>
        <span>{country.name}</span>
      </span>
    ),
    stateObj && (
      <span key="state" className="flex items-center gap-1">
        <FiChevronRight size={12} className="text-white/30" />
        <span>{stateObj.name}</span>
      </span>
    ),
  ].filter(Boolean);

  // ── Level: what are we showing? ────────────────────────────────────────────
  const level = stateObj ? "cities" : country ? "states" : continent ? "countries" : "continents";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex items-center justify-between px-4 py-3 rounded-2xl
          bg-white/[0.06] hover:bg-white/10 border border-white/10 hover:border-sky-400/30
          text-white/60 hover:text-white font-dm text-sm
          transition-all duration-300
        "
      >
        <span className="flex items-center gap-2">
          <FiMapPin size={15} className="text-sky-400" />
          <span>Browse all countries, states &amp; towns</span>
        </span>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-2 glass-card rounded-2xl overflow-hidden animate-fade-in border border-white/10">

          {/* Header: breadcrumb + back + close */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/[0.03]">
            <div className="flex items-center gap-1 text-white/50 font-dm text-xs flex-wrap">
              {breadcrumb.length > 0 ? breadcrumb : (
                <span className="text-white/30">Select a continent to start</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {level !== "continents" && (
                <button
                  onClick={goBack}
                  className="text-sky-400 hover:text-sky-300 font-dm text-xs px-2 py-1 rounded-lg hover:bg-sky-400/10 transition-all"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>

          {/* Search filter */}
          <div className="px-3 pt-3 pb-2">
            <div className="relative">
              <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={
                  level === "countries" ? countryFilter
                  : level === "states" ? stateFilter
                  : level === "cities" ? cityFilter
                  : ""
                }
                onChange={(e) => {
                  if (level === "countries") setCountryFilter(e.target.value);
                  else if (level === "states") setStateFilter(e.target.value);
                  else if (level === "cities") setCityFilter(e.target.value);
                }}
                placeholder={
                  level === "continents" ? "Choose a continent below..."
                  : level === "countries" ? `Search countries in ${continent}...`
                  : level === "states" ? `Search states in ${country?.name}...`
                  : `Search towns in ${stateObj?.name}...`
                }
                disabled={level === "continents"}
                className="
                  w-full pl-8 pr-3 py-2 rounded-xl
                  bg-white/[0.06] border border-white/10
                  text-white placeholder-white/25 font-dm text-sm
                  focus:outline-none focus:border-sky-400/40
                  disabled:opacity-40
                "
              />
            </div>
          </div>

          {/* Content grid */}
          <div className="px-3 pb-3 max-h-72 overflow-y-auto">

            {/* ── Continents ── */}
            {level === "continents" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CONTINENTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => selectContinent(c)}
                    className="
                      flex items-center gap-2 px-3 py-3 rounded-xl text-left
                      bg-white/[0.05] hover:bg-sky-400/15 border border-white/8 hover:border-sky-400/30
                      text-white/70 hover:text-white font-dm text-sm
                      transition-all duration-200
                    "
                  >
                    <span className="text-xl">{CONTINENT_EMOJI[c]}</span>
                    <div>
                      <div className="font-semibold text-xs">{c}</div>
                      <div className="text-white/30 text-xs">{byContinent[c]?.length} countries</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ── Countries ── */}
            {level === "countries" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {countries.length === 0 ? (
                  <p className="col-span-3 text-white/30 font-dm text-sm text-center py-4">No results</p>
                ) : countries.map((c) => (
                  <button
                    key={c.isoCode}
                    onClick={() => selectCountry(c)}
                    className="
                      flex items-center gap-2 px-3 py-2 rounded-xl text-left
                      bg-white/[0.04] hover:bg-sky-400/12 border border-transparent hover:border-sky-400/25
                      text-white/60 hover:text-white font-dm text-xs
                      transition-all duration-200
                    "
                    title={c.name}
                  >
                    <span className="text-base flex-shrink-0">{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* ── States ── */}
            {level === "states" && (
              <>
                {/* Option to search the country capital directly */}
                <button
                  onClick={() => selectCity(country.name)}
                  className="
                    w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-xl text-left
                    bg-sky-400/10 border border-sky-400/25
                    text-sky-300 font-dm text-xs
                    transition-all duration-200 hover:bg-sky-400/20
                  "
                >
                  <FiMapPin size={12} />
                  <span>Get weather for {country.flag} {country.name} (capital)</span>
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {states.length === 0 ? (
                    <p className="col-span-3 text-white/30 font-dm text-sm text-center py-4">
                      {State.getStatesOfCountry(country.isoCode).length === 0
                        ? "No states data available — search by country name above"
                        : "No results"}
                    </p>
                  ) : states.map((s) => (
                    <button
                      key={s.isoCode}
                      onClick={() => selectState(s)}
                      className="
                        px-3 py-2 rounded-xl text-left
                        bg-white/[0.04] hover:bg-sky-400/12 border border-transparent hover:border-sky-400/25
                        text-white/60 hover:text-white font-dm text-xs
                        transition-all duration-200 truncate
                      "
                      title={s.name}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ── Cities / Towns ── */}
            {level === "cities" && (
              <>
                {/* Search state directly */}
                <button
                  onClick={() => selectCity(stateObj.name)}
                  className="
                    w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-xl text-left
                    bg-sky-400/10 border border-sky-400/25
                    text-sky-300 font-dm text-xs
                    transition-all duration-200 hover:bg-sky-400/20
                  "
                >
                  <FiMapPin size={12} />
                  <span>Get weather for {stateObj.name} state</span>
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {cities.length === 0 ? (
                    <p className="col-span-3 text-white/30 font-dm text-sm text-center py-4">
                      {City.getCitiesOfState(country.isoCode, stateObj.isoCode).length === 0
                        ? "No towns data — use the state button above"
                        : "No results"}
                    </p>
                  ) : cities.map((city) => (
                    <button
                      key={`${city.name}-${city.latitude}`}
                      onClick={() => selectCity(city.name)}
                      className="
                        px-3 py-2 rounded-xl text-left
                        bg-white/[0.04] hover:bg-sky-400/12 border border-transparent hover:border-sky-400/25
                        text-white/60 hover:text-white font-dm text-xs
                        transition-all duration-200 truncate
                      "
                      title={city.name}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer count */}
          <div className="px-4 py-2 border-t border-white/8 bg-white/[0.02]">
            <p className="text-white/20 font-dm text-xs">
              {level === "continents" && `${CONTINENTS.length} continents · 250 countries worldwide`}
              {level === "countries" && `${countries.length} countries in ${continent}`}
              {level === "states" && `${states.length} states/provinces in ${country?.name}`}
              {level === "cities" && `${cities.length} towns/cities in ${stateObj?.name}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationBrowser;
