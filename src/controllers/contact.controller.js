exports.create = (req, res) => {
    return res.send({ message:'create handler' });
};

exports.findALL = (req, res) => {
    return res.send({ message:'findALL handler' });
};

exports.findONE = (req, res) => {
    return res.send({ message:'findONE handler' });
};

exports.update = (req, res) => {
    return res.send({ message:'update handler' });
};

exports.delete = (req, res) => {
    return res.send({ message:'delete handler' });
};

exports.deleteALL = (req, res) => {
    return res.send({ message:'deleteALL handler' });
};

exports.findALLFavorite = (req, res) => {
    return res.send({ message:'findALLFavorite handler' });
};