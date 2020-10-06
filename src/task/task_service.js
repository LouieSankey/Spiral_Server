const TaskService ={
    getAllTasks(knex) {
        return knex.select('*').from('task')
    }, 
    
    insertTask(knex, newTask) {
        return knex
            .insert(newTask)
            .into('task')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, 

    getTasksForProject(knex, project_id) {
        return knex.from('task').select('*').where('id', project_id)
    },

    getById(knex, id) {
           return knex.from('task').select('*').where('id', id).first()
    },
    
    deleteTask(knex, id) {
       return knex('task')
         .where({ id })
         .delete()
     },

     updateTask(knex, id, newUserFields) {
        return knex('task')
          .where({ id })
          .update(newUserFields)
      }
}

module.exports = TaskService