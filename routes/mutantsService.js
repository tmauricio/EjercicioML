const controller = require("../controllers/mutants.controller");

const mutants = () => ({
    
    get: {
        '/stats': (req, res) => {
            controller.stats(req, res);
        }
    },

    post: {
        '/mutant': (req, res) => {
            controller.isMutant(req, res)            
        },
    }

});

module.exports = mutants;