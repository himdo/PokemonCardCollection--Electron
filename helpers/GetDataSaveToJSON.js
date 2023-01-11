const axios = require('axios');
var fs = require('fs');

async function GetGenericFromPage(URL,pageNumber=1) {
  return await axios.get(`${URL}?page=${pageNumber}`)
}

async function GetAllGeneric(URL, FileName) {
  let Page1Data = (await GetGenericFromPage(URL, 1))['data']
  let letAllData = Page1Data["data"]
  try {
    let pageCount = Math.ceil(Page1Data["totalCount"] / Page1Data["pageSize"]) + 1
    for (let i = 2; i < pageCount; i++) {
      console.log(`On Page: ${i} / ${pageCount - 1}`)
      let pagedData = (await GetGenericFromPage(URL, i))['data']
      let tempArray = letAllData.concat(pagedData['data'])
      letAllData = tempArray
    }
  } catch (error) {}

  fs.writeFileSync(FileName, JSON.stringify(letAllData), 'utf8')
}

// GetAllGeneric("https://api.pokemontcg.io/v2/cards", "./API_DATA/Cards.json")
// GetAllGeneric("https://api.pokemontcg.io/v2/sets", "./API_DATA/Sets.json")
// GetAllGeneric("https://api.pokemontcg.io/v2/types", "./API_DATA/Types.json")
// GetAllGeneric("https://api.pokemontcg.io/v2/subtypes", "./API_DATA/Subtypes.json")
// GetAllGeneric("https://api.pokemontcg.io/v2/supertypes", "./API_DATA/Supertypes.json")
// GetAllGeneric("https://api.pokemontcg.io/v2/rarities", "./API_DATA/Rarities.json")
