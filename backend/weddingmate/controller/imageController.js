exports.download = (req, res)=>{
    const {productId, type, fileName} = req.params;
    const filepath = path.join(__dirname, `../uploads/${productId}/${fileName}`);

    res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
    if (!fs.existsSync(filepath))
        res.send(404, {error: 'Can not found file.'});
    else
        fs.createReadStream(filepath).pipe(res);
};
