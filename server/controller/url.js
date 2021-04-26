import Url from '../model/url'

export const getUrl = async (req, res) => {
    Url.find({}, function(err, result) {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }).sort('-clicks').limit(5)
}

export const postUrl = async (req, res) => {
    const fullUrl = req.body.fullUrl
    const getUrl = await Url.findOne({full: fullUrl});

    if(getUrl) {
        return res.status(200).json({message: 'Already Exist', getUrl})
    }
    
    const newRecord = new Url({
        full: fullUrl
    });

    await newRecord.save()
        .then(() => {
            res.status(201).json({newRecord});
        }).catch(error => {
            res.status(404).json(error.message)
        })
}

export const redirectUrl = async (req, res) => {
    const shortId = req.params.shortId
    const result = await Url.findOne({ short: shortId })
    console.log(shortId)

    if (!result) {
        return res.status(404).json({error: 'Unknown Link'})
    }

    result.clicks++

    await result.save().catch(error => {
        res.status(404).send(error.message)
    })

    res.redirect(result.full)

}

