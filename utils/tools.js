import moment from "moment"

const dev = process.env.NODE_ENV !== 'production'

export const getHostName = () => {
  if (dev) {
    return "http://localhost:8000"
  }

  return "https://api.tieuhoan.dev"
}

export const copyToClipBoard = (value) => {
  window.document.addEventListener("copy", function (e) {
    e.clipboardData.setData("text/plain", value)
    e.clipboardData.setData("text/html", value)
    e.preventDefault()
  });

  window.document.execCommand("copy")
}

export const formatDateTime = (timezone, time, full, format) => {
  if (timezone != 0) {
    timezone = timezone || 7 
  }
  let timeAndZone = typeof time === "number" ? moment(time, "X") : moment.utc(time)
  timeAndZone = timezone ? timeAndZone.utcOffset(parseFloat(timezone)) : timeAndZone

  if (full) return moment(timeAndZone).format("HH:mm DD/MM/YYYY")
  if (format) return moment(timeAndZone).format(format)
  return moment(timeAndZone).calendar(null, {
    sameDay: "HH:mm [hôm nay]",
    nextDay: `HH:mm [ngày mai]`,
    nextWeek: "HH:mm DD/MM",
    lastDay: `HH:mm [hôm qua]`,
    lastWeek: "HH:mm DD/MM",
    sameElse: "HH:mm DD/MM",
  })
}