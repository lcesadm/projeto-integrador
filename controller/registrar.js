const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const { usuarios } = require("../models");



const registerController = {
    store: async (req, res) => {
        const {email, password, CPF, nome, endereco, nascimento, sexo, ofertas} = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);

        const usuario = await usuarios.findAll({
          
          where: {
            email,
          }
          
      });

      console.log(usuario)

      if (!usuario.length < 1) {
        return res.render("cadastro", {
          msg: "Conta ja cadastrada",
        });
      }else{
        const user = await usuarios.create({
          email,
          password: hashPassword,
          CPF, 
          nome,
          nascimento,
          sexo,
          ofertas,
          vendedor: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
      });

      }

        
        

    
        
            return res.redirect("cliente");
    },

}

module.exports = registerController;