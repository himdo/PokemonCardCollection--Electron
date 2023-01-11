var fs = require('fs');

function ReadGenericJSON(FileLocation) {
  let data = fs.readFileSync(FileLocation, 'utf-8')
  return JSON.parse(data)
}
function getCardsData () {
  return ReadGenericJSON("./API_DATA/Cards.json")
}
function getSetsData () {
  return ReadGenericJSON("./API_DATA/Sets.json")
}
function getTypesData () {
  return ReadGenericJSON("./API_DATA/Types.json")
}
function getSubtypesData () {
  return ReadGenericJSON("./API_DATA/Subtypes.json")
}
function getSupertypesData () {
  return ReadGenericJSON("./API_DATA/Supertypes.json")
}
function getRaritiesData () {
  return ReadGenericJSON("./API_DATA/Rarities.json")
}
// let cards = ReadGenericJSON("./API_DATA/Cards.json")
// let sets = ReadGenericJSON("./API_DATA/Sets.json")
// let types = ReadGenericJSON("./API_DATA/Types.json")
// let subtypes = ReadGenericJSON("./API_DATA/Subtypes.json")
// let supertypes = ReadGenericJSON("./API_DATA/Supertypes.json")
// let rarities = ReadGenericJSON("./API_DATA/Rarities.json")

// console.log(cards)
// console.log(sets)
// console.log(types)
// console.log(subtypes)
// console.log(supertypes)
// console.log(rarities)

module.exports = {
  ReadGenericJSON,
  getCardsData,
  getSetsData,
  getTypesData,
  getSubtypesData,
  getSupertypesData,
  getRaritiesData
}