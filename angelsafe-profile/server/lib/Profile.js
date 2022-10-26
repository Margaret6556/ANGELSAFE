const TypeCheck = require('type-check').typeCheck;
const IsBase64 = require('is-base64');

class ProfileService {
  constructor() {
  }

  static get Gender(){
    return {
      'Male': 1,
      'Female': 2,
    };
  }

  static get Countries(){
    return {
      "AFG": "Afghanistan",
      "ALB": "Albania",
      "DZA": "Algeria",
      "ASM": "American Samoa",
      "AND": "Andorra",
      "AGO": "Angola",
      "AIA": "Anguilla",
      "ATA": "Antarctica",
      "ATG": "Antigua and Barbuda",
      "ARG": "Argentina",
      "ARM": "Armenia",
      "ABW": "Aruba",
      "AUS": "Australia",
      "AUT": "Austria",
      "AZE": "Azerbaijan",
      "BHS": "Bahamas",
      "BHR": "Bahrain",
      "BGD": "Bangladesh",
      "BRB": "Barbados",
      "BLR": "Belarus",
      "BEL": "Belgium",
      "BLZ": "Belize",
      "BEN": "Benin",
      "BMU": "Bermuda",
      "BTN": "Bhutan",
      "BOL": "Bolivia",
      "BES": "Bonaire, Sint Eustatius and Saba",
      "BIH": "Bosnia and Herzegovina",
      "BWA": "Botswana",
      "BVT": "Bouvet Island",
      "BRA": "Brazil",
      "IOT": "British Indian Ocean Territory",
      "BRN": "Brunei Darussalam",
      "BGR": "Bulgaria",
      "BFA": "Burkina Faso",
      "BDI": "Burundi",
      "CPV": "Cabo Verde",
      "KHM": "Cambodia",
      "CMR": "Cameroon",
      "CAN": "Canada",
      "CYM": "Cayman Islands",
      "CAF": "Central African Republic",
      "TCD": "Chad",
      "CHL": "Chile",
      "CHN": "China",
      "CXR": "Christmas Island",
      "CCK": "Cocos Islands",
      "COL": "Colombia",
      "COM": "Comoros",
      "COD": "Congo",
      "COG": "Congo",
      "COK": "Cook Islands",
      "CRI": "Costa Rica",
      "HRV": "Croatia",
      "CUB": "Cuba",
      "CUW": "Curaçao",
      "CYP": "Cyprus",
      "CZE": "Czechia",
      "CIV": "Côte d'Ivoire",
      "DNK": "Denmark",
      "DJI": "Djibouti",
      "DMA": "Dominica",
      "DOM": "Dominican Republic",
      "ECU": "Ecuador",
      "EGY": "Egypt",
      "SLV": "El Salvador",
      "GNQ": "Equatorial Guinea",
      "ERI": "Eritrea",
      "EST": "Estonia",
      "SWZ": "Eswatini",
      "ETH": "Ethiopia",
      "FLK": "Falkland Islands",
      "FRO": "Faroe Islands",
      "FJI": "Fiji",
      "FIN": "Finland",
      "FRA": "France",
      "GUF": "French Guiana",
      "PYF": "French Polynesia",
      "ATF": "French Southern Territories",
      "GAB": "Gabon",
      "GMB": "Gambia",
      "GEO": "Georgia",
      "DEU": "Germany",
      "GHA": "Ghana",
      "GIB": "Gibraltar",
      "GRC": "Greece",
      "GRL": "Greenland",
      "GRD": "Grenada",
      "GLP": "Guadeloupe",
      "GUM": "Guam",
      "GTM": "Guatemala",
      "GGY": "Guernsey",
      "GIN": "Guinea",
      "GNB": "Guinea-Bissau",
      "GUY": "Guyana",
      "HTI": "Haiti",
      "HMD": "Heard Island and McDonald Islands",
      "VAT": "Holy See",
      "HND": "Honduras",
      "HKG": "Hong Kong",
      "HUN": "Hungary",
      "ISL": "Iceland",
      "IND": "India",
      "IDN": "Indonesia",
      "IRN": "Iran",
      "IRQ": "Iraq",
      "IRL": "Ireland",
      "IMN": "Isle of Man",
      "ISR": "Israel",
      "ITA": "Italy",
      "JAM": "Jamaica",
      "JPN": "Japan",
      "JEY": "Jersey",
      "JOR": "Jordan",
      "KAZ": "Kazakhstan",
      "KEN": "Kenya",
      "KIR": "Kiribati",
      "PRK": "Korea",
      "KOR": "Korea",
      "KWT": "Kuwait",
      "KGZ": "Kyrgyzstan",
      "LAO": "Lao People's Democratic Republic",
      "LVA": "Latvia",
      "LBN": "Lebanon",
      "LSO": "Lesotho",
      "LBR": "Liberia",
      "LBY": "Libya",
      "LIE": "Liechtenstein",
      "LTU": "Lithuania",
      "LUX": "Luxembourg",
      "MAC": "Macao",
      "MDG": "Madagascar",
      "MWI": "Malawi",
      "MYS": "Malaysia",
      "MDV": "Maldives",
      "MLI": "Mali",
      "MLT": "Malta",
      "MHL": "Marshall Islands",
      "MTQ": "Martinique",
      "MRT": "Mauritania",
      "MUS": "Mauritius",
      "MYT": "Mayotte",
      "MEX": "Mexico",
      "FSM": "Micronesia",
      "MDA": "Moldova",
      "MCO": "Monaco",
      "MNG": "Mongolia",
      "MNE": "Montenegro",
      "MSR": "Montserrat",
      "MAR": "Morocco",
      "MOZ": "Mozambique",
      "MMR": "Myanmar",
      "NAM": "Namibia",
      "NRU": "Nauru",
      "NPL": "Nepal",
      "NLD": "Netherlands",
      "NCL": "New Caledonia",
      "NZL": "New Zealand",
      "NIC": "Nicaragua",
      "NER": "Niger",
      "NGA": "Nigeria",
      "NIU": "Niue",
      "NFK": "Norfolk Island",
      "MNP": "Northern Mariana Islands",
      "NOR": "Norway",
      "OMN": "Oman",
      "PAK": "Pakistan",
      "PLW": "Palau",
      "PSE": "Palestine, State of",
      "PAN": "Panama",
      "PNG": "Papua New Guinea",
      "PRY": "Paraguay",
      "PER": "Peru",
      "PHL": "Philippines",
      "PCN": "Pitcairn",
      "POL": "Poland",
      "PRT": "Portugal",
      "PRI": "Puerto Rico",
      "QAT": "Qatar",
      "MKD": "Republic of North Macedonia",
      "ROU": "Romania",
      "RUS": "Russian Federation",
      "RWA": "Rwanda",
      "REU": "Réunion",
      "BLM": "Saint Barthélemy",
      "SHN": "Saint Helena, Ascension and Tristan da Cunha",
      "KNA": "Saint Kitts and Nevis",
      "LCA": "Saint Lucia",
      "MAF": "Saint Martin",
      "SPM": "Saint Pierre and Miquelon",
      "VCT": "Saint Vincent and the Grenadines",
      "WSM": "Samoa",
      "SMR": "San Marino",
      "STP": "Sao Tome and Principe",
      "SAU": "Saudi Arabia",
      "SEN": "Senegal",
      "SRB": "Serbia",
      "SYC": "Seychelles",
      "SLE": "Sierra Leone",
      "SGP": "Singapore",
      "SXM": "Sint Maarten",
      "SVK": "Slovakia",
      "SVN": "Slovenia",
      "SLB": "Solomon Islands",
      "SOM": "Somalia",
      "ZAF": "South Africa",
      "SGS": "South Georgia and the South Sandwich Islands",
      "SSD": "South Sudan",
      "ESP": "Spain",
      "LKA": "Sri Lanka",
      "SDN": "Sudan",
      "SUR": "Suriname",
      "SJM": "Svalbard and Jan Mayen",
      "SWE": "Sweden",
      "CHE": "Switzerland",
      "SYR": "Syrian Arab Republic",
      "TWN": "Taiwan",
      "TJK": "Tajikistan",
      "TZA": "Tanzania, United Republic of",
      "THA": "Thailand",
      "TLS": "Timor-Leste",
      "TGO": "Togo",
      "TKL": "Tokelau",
      "TON": "Tonga",
      "TTO": "Trinidad and Tobago",
      "TUN": "Tunisia",
      "TUR": "Turkey",
      "TKM": "Turkmenistan",
      "TCA": "Turks and Caicos Islands",
      "TUV": "Tuvalu",
      "UGA": "Uganda",
      "UKR": "Ukraine",
      "ARE": "United Arab Emirates",
      "GBR": "United Kingdom of Great Britain and Northern Ireland",
      "UMI": "United States Minor Outlying Islands",
      "USA": "United States of America",
      "URY": "Uruguay",
      "UZB": "Uzbekistan",
      "VUT": "Vanuatu",
      "VEN": "Venezuela",
      "VNM": "Viet Nam",
      "VGB": "Virgin Islands",
      "VIR": "Virgin Islands",
      "WLF": "Wallis and Futuna",
      "ESH": "Western Sahara",
      "YEM": "Yemen",
      "ZMB": "Zambia",
      "ZWE": "Zimbabwe",
      "ALA": "Åland Islands"
    }  
  }

  static isRequestValid(data) {
    return TypeCheck('{username: String, year: String, country: String, gender: String, ip: String}', data);
  }

  static isRequestUpdateValid(data) {
    return TypeCheck('{username: Maybe String, year: Maybe String, country: Maybe String, gender: Maybe String, bio: Maybe String, hobbies: Maybe Array, music: Maybe Array, movies: Maybe Array, ip: String}', data);
  }

  static isRequestUpdatePicValid(data) {
    return TypeCheck('{ profilePic: String, ip: String}', data);
  }

  static isRequestListValid(data) {
    return TypeCheck('{ ids: Array, ip: String}', data);
  }

  static isUsernameValid(data){
    return data.length > 6 && data.length < 14;
  }

  static isYearValid(data){
    let date = parseInt(data);
    const text = /^[0-9]+$/;
    if (!text.test(date)) {
      return false;
    }
    if (!((data.length == 4) && (date > 1900))) {
      return false;
    }
    return true;
  }

  static isCountryValid(data){
    return Object.values(ProfileService.Countries).includes(data);
  }

  static isGenderValid(data){
    return ProfileService.Gender.hasOwnProperty(data);
  }

  static async isProfilePicValid(data){
    return IsBase64(data, { mime: true });
  }
  
  static getRandomNumber(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  }

  static getRelevantTime(current, previous){
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  }

}

module.exports = ProfileService;