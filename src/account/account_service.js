const AccountService ={
    getAllAccounts(knex) {
        return knex.select('*').from('account')
    }, 
    
    insertAccount(knex, newAccount) {
        return knex
            .insert(newAccount)
            .into('account')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 

    getById(knex, id) {
           return knex.from('account').select('*').where('id', id).first()
    },
    
    deleteAccount(knex, id) {
       return knex('account')
         .where({ id })
         .delete()
     },

     updateAccount(knex, id, newUserFields) {
        return knex('account')
          .where({ id })
          .update(newUserFields)
      }
}

module.exports = AccountService