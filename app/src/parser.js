const request = require('request')
const xml2js = require('xml2js')

function getFileName(url) {
  const m = url.match(/^https?:\/\/(?:m|www)\.ivoox\.com\/podcast\-(.+)_sq_(.+)_(.+)\.html/)
  return `${m[1]}_fg_${m[2]}_filtro_${m[3]}.xml`
}

function parseXML(url, callback) {
  request(`http://www.ivoox.com/${getFileName(url)}`, (error, response, body) => {
    xml2js.parseString(body, (err, json) => {
      if(err) console.log(err);
      try {
        json.rss.channel.map(channel => {
          channel.item = channel.item.map(item => {
            const m = item.link[0].match(/^https?:\/\/www\.ivoox\.com\/(.+)\-mp3_rf_(.+)_(.+)\.html$/)
            item.enclosure[0]['$'].url = `http://www.ivoox.com/${m[1]}_mf_${m[2]}_feed_${m[3]}.mp3`
            return item
          })
          return channel
        })
      } catch(err) {
        console.error(err)
      } finally {
        const builder = new xml2js.Builder();
        callback(builder.buildObject(json));
      }
    })
  })
}

module.exports = parseXML