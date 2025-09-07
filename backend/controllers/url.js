const shortid = require('shortid'); 
const URL = require('../models/url'); 

async function generateShortUrl(req,res){
  const body = req.body;

  if (!body.url){
    return res.status(400).json({error:"Url is required"}); 
  } 

  const shortId  = shortid.generate()

  try{
    const newUrl = await URL.create({
      shortId : shortId , 
      redirectURL : body.url, 
      visitHistory : []
    })

    return res.json({ shortId: newUrl.shortId, redirectURL: newUrl.redirectURL });

  } catch(error){
    console.error('Failed to generate short URL:', error);
    return res.status(500).json({ error: 'Failed to generate short URL' });
  }
}

async function handlegetAnalytics(req,res){
  const shortId = req.params.shortId ; 

  try{
    const result = await URL.findOne({shortId}); 

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks : result.visitHistory.length,
      analytics : result.visitHistory
    }) ; 
  } catch(error){
    console.error('Failed to retrieve analytics:', error);
    res.status(500).json({error:"Failed to retreive analytics"}); 
  }
}

module.exports = {generateShortUrl,handlegetAnalytics};