const express = require("express");
const ditzz = require("ditzzlabs");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
app.set("json spaces", 2);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  var ingfo = {
    status: "ONLINE",
    creator: "Ditzzy | IG : @zyfn.dev | ",
    code: 200,
    info: `Pakai Paramater /dl?url=URL`,
    dlinfo : `Supported Download : Facebook   Tiktok   Instagram   Twitter   Pinterest   Youtube`};

  res.send(ingfo);
});
var errnya = {
  status: "404",
  creator: "Ditzzy",
  code: false,
  reason: "Harap Masukkan Parameter url cuy",
};
var notf = {
  status: "502",
  creator: "Ditzzy",
  code: false,
  reason: "Scrape Tidak Ditemukan\nJika ingin Request ke 08988293493",
};
app.get("/dl", async (req, res, next) => {
  var url = req.query.url;
  if (!url) return res.json(errnya);
  if (url.includes("facebook")) {
    var fb = await ditzz.downloader.facebook(url);
    var fbresult = {
      status: "200",
      creator: "Ditzzy",
      title: fb.title,
      hd: fb.hd,
      sd: fb.sd,
    };
    res.json(fbresult);
  } else if (url.includes("youtu")) {
    var yt = await ditzz.downloader.youtube(url);
    var ytresult = {
      status: "200",
      creator: "Ditzzy",
      title: yt.title,
      username: yt.username,
      quality: yt.fquality,
      size: yt.size,
      thumb: yt.thumb,
      url: yt.download_url,
    };
    res.json(ytresult);
  } else if (url.includes("instagram")) {
    var ig = await ditzz.downloader.instagram(url);
    var igresult = {
      status: "200",
      creator: "Ditzzy",
      result: ig,
    };
    res.json(igresult);
  } else if (url.includes("twitter")) {
    var tw = await ditzz.downloader.twitter(url);
    var twresult = {
      status: "200",
      creator: "Ditzzy",
      result: tw,
    };
    res.json(twresult);
  } else if (url.includes("pin.it")) {
    var pin = await ditzz.downloader.pinterestdl(url);
    var pinresult = {
      status: "200",
      creator: "Ditzzy",
      result : pin
    };
    res.json(pinresult);
  } else if (url.includes("tiktok")) {
    var tt = await ditzz.downloader.tiktok(url);
    var ttresult = {
      status: "200",
      creator: "Ditzzy",
      title: tt.title,
      thumb: tt.thumbnail.replace("https:", ""),
      audSize: tt.media[2].formattedSize,
      vidSize: tt.media[1].formattedSize,
      video: tt.media[1].url,
      audio: tt.media[2].url,
    };
    res.json(ttresult);
  } else {
    res.json(notf);
  }
});
app.listen(port, () => {
  console.log(`ok : ${port}`);
});
