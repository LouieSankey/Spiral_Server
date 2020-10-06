//"project" will be replaced with the name of the table you are using CRUD on in the DB
const ProjectService ={
    getAllProjects(knex) {
        return knex.select('*').from('project')
    }, 
    
    
    insertProject(knex, newProject) {
        return knex
            .insert(newProject)
            .into('project')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 

    getById(knex, id) {
           return knex.from('project').select('*').where('id', id).first()
    },
    
    getProjectsForAccount(knex, account_id){
        return knex.from('project').select('*').where('account', account_id)
    },
    
    deleteProject(knex, id) {
       return knex('project')
         .where({ id })
         .delete()
     },

     updateProject(knex, id, newUserFields) {
        return knex('project')
          .where({ id })
          .update(newUserFields)
      }
}

module.exports = ProjectService