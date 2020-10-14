const UserPrefService ={
    getAllUserPrefs(knex) {
        return knex.select('*').from('pref')
    }, 
    
    insertUserPref(knex, newUserPref) {
        return knex
            .insert(newUserPref)
            .into('pref')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 

    getByAccountId(knex, account_id) {
           return knex.from('pref').select('*').where('account', account_id).first()
    },
    
    deleteUserPref(knex, id) {
       return knex('pref')
         .where({ id })
         .delete()
     },

     updateUserPref(knex, id, newUserFields) {
        return knex('pref')
          .where({ id })
          .update(newUserFields)
      }
}

module.exports = UserPrefService