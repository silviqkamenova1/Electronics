const Electronics = require('../models/Electronics');
const User = require('../models/User');


exports.getById = (userId) => User.findById(userId)

exports.create = async (ownerId, elData) => {
    const user = await this.getById(ownerId);
    elData.owner = {
        _id: user._id,
        username: user.username,
        email: user.email
    };
    
    const electronic = await Electronics.create({ ...elData });
    
};
exports.getAll = () => Electronics.find({}).lean();

exports.getOneDetailed = (elId) => Electronics.findById(elId)

exports.buy = async (userId, elId) => {
    const electronic = await Electronics.findById(elId);
    electronic.buyingList.push(userId);

    return electronic.save()
}

exports.delete = (elId) => Electronics.findByIdAndDelete(elId);

exports.getOne = (elId) => Electronics.findById(elId).lean();

exports.edit = (elId, elData) => Electronics.findByIdAndUpdate(elId, elData, { runValidators: true });

exports.search = async (name, type) => {
    let electronic = await this.getAll();

   
    if(name) {
        electronic = electronic.filter(x => x.name.toLowerCase() == name.toLowerCase());
    };
 
    if(type){
        electronic = electronic.filter(x => x.type.toLowerCase() == type.toLowerCase());
    };

    return electronic;
}





