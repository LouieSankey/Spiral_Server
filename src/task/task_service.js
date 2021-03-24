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

    getTasksForAccount(knex, account_id) {
        return knex.from('task').select('*').where('account', account_id)
    },

    getTasksForRange(knex, account_id, params) {
        let tasks = knex.from('task').select('*').where('account', account_id)
        .where('project', params.project)
        .where('date_published', '<', params.dateTo)
        .where('date_published', '>', params.dateFrom)
        return tasks
        
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