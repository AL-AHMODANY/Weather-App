import React, { useState, useMemo, useCallback } from "react";
import { Country, State, City } from "country-state-city";
import continentMap from "../data/continentMap.js";
import { FiSearch, FiChevronDown, FiChevronUp, FiChevronRight, FiMapPin } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const CONTINENTS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
const CONTINENT_EMOJI = {
  Africa: "🌍", Asia: "🌏", Europe: "🌍",
  "North America": "🌎", "South America": "🌎", Oceania: "🌏",
};

const allCountries = Country.getAllCountries();
const byContinent = {};
CONTINENTS.forEach((c) => (byContinent[c] = []));
allCountries.forEach((country) => {
  const cont = continentMap[country.isoCode];
  if (cont && byContinent[cont]) byContinent[cont].push(country);
});
CONTINENTS.forEach((c) => byContinent[c].sort((a, b) => a.name.localeCompare(b.name)));

const LocationBrowser = ({ onSelect, isDark = true }) => {
  const [open, setOpen] = useState(false);
  const [continent, setContinent] = useState(null);
  const [country, setCountry] = useState(null);
  const [stateObj, setStateObj] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // Theme helpers
  const T = {
    panel:      isDark ? "border-white/10"                                          : "border-slate-200",
    header:     isDark ? "border-white/8 bg-white/[0.03]"                          : "border-slate-200 bg-slate-50",
    breadcrumb: isDark ? "text-white/60"                                            : "text-slate-600",
    chevron:    isDark ? "text-white/30"                                            : "text-slate-400",
    hint:       isDark ? "text-white/30"                                            : "text-slate-400",
    backBtn:    isDark ? "text-sky-400 hover:text-sky-300 hover:bg-sky-400/10"      : "text-sky-600 hover:text-sky-700 hover:bg-sky-50",
    closeBtn:   isDark ? "text-white/40 hover:text-white/80"                        : "text-slate-400 hover:text-slate-700",
    searchIcon: isDark ? "text-white/30"                                            : "text-slate-400",
    input:      isDark
      ? "bg-white/[0.06] border-white/10 text-white placeholder-white/25 focus:border-sky-400/40"
      : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-400",
    toggleBtn:  isDark
      ? "bg-white/[0.06] hover:bg-white/10 border-white/10 hover:border-sky-400/30 text-white/60 hover:text-white"
      : "bg-white/80 hover:bg-white border-slate-200 hover:border-sky-400/40 text-slate-600 hover:text-slate-900",
    continentCard: isDark
      ? "bg-white/[0.05] hover:bg-sky-400/15 border-white/8 hover:border-sky-400/30 text-white/70 hover:text-white"
      : "bg-white hover:bg-sky-50 border-slate-200 hover:border-sky-400/50 text-slate-700 hover:text-slate-900",
    continentSub: isDark ? "text-white/30" : "text-slate-400",
    itemBtn:    isDark
      ? "bg-white/[0.04] hover:bg-sky-400/12 border-transparent hover:border-sky-400/25 text-white/70 hover:text-white"
      : "bg-white hover:bg-sky-50 border-slate-100 hover:border-sky-400/40 text-slate-700 hover:text-slate-900",
    capitalBtn: isDark
      ? "bg-sky-400/10 border-sky-400/25 text-sky-300 hover:bg-sky-400/20"
      : "bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100",
    noResult:   isDark ? "text-white/30" : "text-slate-400",
    footer:     isDark ? "border-white/8 bg-white/[0.02] text-white/25" : "border-slate-200 bg-slate-50 text-slate-400",
  };

  const countries = useMemo(() => {
    if (!continent) return [];
    const list = byContinent[continent] || [];
    if (!countryFilter.trim()) return list;
    return list.filter((c) => c.name.toLowerCase().includes(countryFilter.toLowerCase()));
  }, [continent, countryFilter]);

  const states = useMemo(() => {
    if (!country) return [];
    const list = State.getStatesOfCountry(country.isoCode);
    if (!stateFilter.trim()) return list;
    return list.filter((s) => s.name.toLowerCase().includes(stateFilter.toLowerCase()));
  }, [country, stateFilter]);

  const cities = useMemo(() => {
    if (!stateObj || !country) return [];
    const list = City.getCitiesOfState(country.isoCode, stateObj.isoCode);
    if (!cityFilter.trim()) return list;
    return list.filter((c) => c.name.toLowerCase().includes(cityFilter.toLowerCase()));
  }, [stateObj, country, cityFilter]);

  const selectContinent = useCallback((c) => {
    setContinent(c); setCountry(null); setStateObj(null);
    setCountryFilter(""); setStateFilter(""); setCityFilter("");
  }, []);
  const selectCountry = useCallback((c) => {
    setCountry(c); setStateObj(null); setStateFilter(""); setCityFilter("");
  }, []);
  const selectState = useCallback((s) => { setStateObj(s); setCityFilter(""); }, []);
  const selectCity = useCallback((cityName) => { onSelect(cityName); setOpen(false); }, [onSelect]);

  const goBack = () => {
    if (stateObj) { setStateObj(null); setCityFilter(""); }
    else if (country) { setCountry(null); setStateFilter(""); }
    else if (continent) { setContinent(null); setCountryFilter(""); }
  };

  const level = stateObj ? "cities" : country ? "states" : continent ? "countries" : "continents";

  const breadcrumb = [
    continent && <span key="cont" className="flex items-center gap-1"><span>{CONTINENT_EMOJI[continent]}</span><span>{continent}</span></span>,
    country && <span key="country" className="flex items-center gap-1"><FiChevronRight size={12} className={T.chevron} /><span>{country.flag}</span><span>{country.name}</span></span>,
    stateObj && <span key="state" className="flex items-center gap-1"><FiChevronRight size={12} className={T.chevron} /><span>{stateObj.name}</span></span>,
  ].filter(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border font-dm text-sm transition-all duration-300 ${T.toggleBtn}`}
      >
        <span className="flex items-center gap-2">
          <FiMapPin size={15} className="text-sky-500" />
          <span>Browse all countries, states &amp; towns</span>
        </span>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {/* Panel */}
      {open && (
        <div className={`mt-2 glass-card rounded-2xl overflow-hidden animate-fade-in border ${T.panel}`}>

          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${T.header}`}>
            <div className={`flex items-center gap-1 font-dm text-xs flex-wrap ${T.breadcrumb}`}>
              {breadcrumb.length > 0 ? breadcrumb : <span className={T.hint}>Select a continent to start</span>}
            </div>
            <div className="flex items-center gap-2">
              {level !== "continents" && (
                <button onClick={goBack} className={`font-dm text-xs px-2 py-1 rounded-lg transition-all ${T.backBtn}`}>
                  ← Back
                </button>
              )}
              <button onClick={() => setOpen(false)} className={`transition-colors ${T.closeBtn}`}>
                <IoClose size={18} />
              </button>
            </div>
          </div>

          {/* Search filter */}
          <div className="px-3 pt-3 pb-2">
            <div className="relative">
              <FiSearch size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${T.searchIcon}`} />
              <input
                type="text"
                value={level === "countries" ? countryFilter : level === "states" ? stateFilter : level === "cities" ? cityFilter : ""}
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
                className={`w-full pl-8 pr-3 py-2 rounded-xl border font-dm text-sm focus:outline-none disabled:opacity-40 transition-all ${T.input}`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-3 pb-3 max-h-72 overflow-y-auto">

            {/* Continents */}
            {level === "continents" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CONTINENTS.map((c) => (
                  <button key={c} onClick={() => selectContinent(c)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left border font-dm text-sm transition-all duration-200 ${T.continentCard}`}
                  >
                    <span className="text-xl">{CONTINENT_EMOJI[c]}</span>
                    <div>
                      <div className="font-semibold text-xs">{c}</div>
                      <div className={`text-xs ${T.continentSub}`}>{byContinent[c]?.length} countries</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Countries */}
            {level === "countries" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {countries.length === 0
                  ? <p className={`col-span-3 font-dm text-sm text-center py-4 ${T.noResult}`}>No results</p>
                  : countries.map((c) => (
                    <button key={c.isoCode} onClick={() => selectCountry(c)} title={c.name}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left border font-dm text-xs transition-all duration-200 ${T.itemBtn}`}
                    >
                      <span className="text-base flex-shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))
                }
              </div>
            )}

            {/* States */}
            {level === "states" && (
              <>
                <button onClick={() => selectCity(country.name)}
                  className={`w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-xl text-left border font-dm text-xs transition-all duration-200 ${T.capitalBtn}`}
                >
                  <FiMapPin size={12} />
                  <span>Get weather for {country.flag} {country.name} (capital)</span>
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {states.length === 0
                    ? <p className={`col-span-3 font-dm text-sm text-center py-4 ${T.noResult}`}>
                        {State.getStatesOfCountry(country.isoCode).length === 0
                          ? "No states data — search by country name above" : "No results"}
                      </p>
                    : states.map((s) => (
                      <button key={s.isoCode} onClick={() => selectState(s)} title={s.name}
                        className={`px-3 py-2 rounded-xl text-left border font-dm text-xs transition-all duration-200 truncate ${T.itemBtn}`}
                      >
                        {s.name}
                      </button>
                    ))
                  }
                </div>
              </>
            )}

            {/* Cities */}
            {level === "cities" && (
              <>
                <button onClick={() => selectCity(stateObj.name)}
                  className={`w-full flex items-center gap-2 px-3 py-2 mb-2 rounded-xl text-left border font-dm text-xs transition-all duration-200 ${T.capitalBtn}`}
                >
                  <FiMapPin size={12} />
                  <span>Get weather for {stateObj.name} state</span>
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {cities.length === 0
                    ? <p className={`col-span-3 font-dm text-sm text-center py-4 ${T.noResult}`}>
                        {City.getCitiesOfState(country.isoCode, stateObj.isoCode).length === 0
                          ? "No towns data — use the state button above" : "No results"}
                      </p>
                    : cities.map((city) => (
                      <button key={`${city.name}-${city.latitude}`} onClick={() => selectCity(city.name)} title={city.name}
                        className={`px-3 py-2 rounded-xl text-left border font-dm text-xs transition-all duration-200 truncate ${T.itemBtn}`}
                      >
                        {city.name}
                      </button>
                    ))
                  }
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className={`px-4 py-2 border-t font-dm text-xs ${T.footer}`}>
            {level === "continents" && `${CONTINENTS.length} continents · 250 countries worldwide`}
            {level === "countries" && `${countries.length} countries in ${continent}`}
            {level === "states" && `${states.length} states/provinces in ${country?.name}`}
            {level === "cities" && `${cities.length} towns/cities in ${stateObj?.name}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationBrowser;
