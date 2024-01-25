export default function staffId(firstName, lastName) {
  let staffId = `${firstName}${lastName}`
  staffId = staffId.replace(/ /g, '')
  return staffId.toLowerCase()
}
