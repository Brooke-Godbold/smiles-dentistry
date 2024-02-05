const timeDictionary = [
  { name: '9am', value: 9 },
  { name: '10am', value: 10 },
  { name: '11am', value: 11 },
  { name: '1pm', value: 13 },
  { name: '2pm', value: 14 },
  { name: '3pm', value: 15 },
  { name: '4pm', value: 16 },
  { name: '5pm', value: 17 }
]

const availableDatesList = () => {
  const dates = []

  const firstDay = new Date()
  firstDay.setHours(24, 0, 0, 0)

  if (firstDay.getDay() !== 0) {
    dates.push({
      name: dateToString(firstDay),
      value: dateToTimestamp(firstDay)
    })
  }

  for (var i = 0; i <= 90; i++) {
    var nextDay = new Date()
    nextDay.setDate(firstDay.getDate() + i)
    nextDay.setHours(24, 0, 0, 0)

    if (nextDay.getDay() !== 0) {
      dates.push({
        name: dateToString(nextDay),
        value: dateToTimestamp(nextDay)
      })
    }
  }

  return dates
}

function timeAsString(timeValue) {
  return timeDictionary.find((time) => time.value === timeValue)?.name
}

function timestampToDateString(timestamp) {
  const date = new Date(timestamp)
  return dateToString(date)
}

function dateToTimestamp(date) {
  return Date.parse(date.toUTCString())
}

function dateToString(date) {
  return date.toDateString()
}

export {
  timeAsString,
  timestampToDateString,
  dateToTimestamp,
  dateToString,
  timeDictionary,
  availableDatesList
}
