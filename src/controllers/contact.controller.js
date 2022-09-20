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

const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const contactService = new ContactService();
        const contact = await contactService.create(req.body);
        return res.send(contact);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while creating the contact')
        );
    }
};

exports.findAll = async(req , res , next) => {
    let contacts = [ ];
    try {
         const contactService = new ContactService();
         const { name } = req.query ;
         if ( name ) {
              contacts = await contactService.findByName (name);
         } else {
              contacts = await contactService.all();
         }
    } catch (error) {
         console.log (error) ;
         return next (
              new ApiError ( 500 , 'An error occurred while retrieving contacts')
         );
    }
    return res.send ( contacts ) ;
};
exports.findOne = async ( req , res , next ) => {
    try {
        const contactService = new ContactService();
        const contact = await contactService.findById(req.params.id);
        if (!contact) {                  
            return next(new ApiError ( 404 , 'Contact not found'));
        }
        return res.send ( contact ) ;
    } catch ( error ) {
        console.log (error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};
exports.update = async ( req , res , next ) => {
    if ( Object.keys (req.body).length == 0 ) {
        return next ( new ApiError ( 400 , ' Data to update can not be empty ' )) ;
   }
   try {
        const contactService = new ContactService () ;
        const updated = await contactService.update ( req.params.id , req.body ) ;
        if ( ! updated ) {
            return next ( new ApiError ( 404 , 'Contact not found'));
       }
        return res.send ( { message : 'Contact was updated successfully' }) ;
   } catch (error) {
        console.log (error) ;
        return next (
            new ApiError ( 500 , `Error updating contact with id=${req.params.id}`)
        );
    }
};
exports.delete = async ( req , res , next ) => {
    try {
        const contactService = new ContactService ();
        const deleted = await contactService.delete ( req.params.id ) ;
        if ( ! deleted ) {
            return next ( new ApiError ( 404 , ' Contact not found ' ) ) ;
        }
        return res.send ( { message : ' Contact was deleted successfully ' } ) ;
    } catch ( error ) {
        console.log ( error ) ;
        return next (
           new ApiError (
                500 ,
                `Could not delete contact with id = ${req.params.id}`
           )
        );
    }
};
exports.findAllFavorite = async ( req , res , next ) => {
    try {
        const contactService = new ContactService(); 
        const contacts = await contactService.allFavorite();
        return res.send (contacts) ;
    } catch ( error ) {
        console.log ( error ) ;
        return next (                           
             new ApiError (
                 500 ,
                 ' An error occurred while retrieving favorite contacts '
             )
        );
    }
};