
const trim=(n)=>{
    if (n.length<60) {
          return n;
      }
    let result = "";
      for (let i of n){
       
        result = result + i;
       
       if(result.length==60) {
           break;
          }
   }
   return result+'...';
  }
export default trim;