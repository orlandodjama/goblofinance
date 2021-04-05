export const addTodo = content => ({
    type: "ADD_TODO",
    payload: {
      content
    },
    meta: {
     offline: {
       // the network action to execute:
       effect: {
         url: "/api/sample",
         method: "POST",
         body: `name=${content}`,
         headers: { 
           "content-type": "application/x-www-form urlencoded" 
         }
       }, 
       // action to dispatch when effect succeeds:
       commit: { type: "ADD_TODO", meta: { content } },
       // action to dispatch if network action fails permanently:
       rollback: { type: "ADD_TODO_ROLLBACK", meta: { content } }
     }
   }
 });