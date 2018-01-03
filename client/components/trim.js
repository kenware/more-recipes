
const trim=(n)=>{
    if (n.length<100) {
          return n
      }
    let result = "";
      for (let i of n){
       
        result = result + i;
       
       if(result.length==100) {
           break;
          }
   }
   return result;
  }
export default trim;