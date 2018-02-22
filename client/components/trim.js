
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

  const trim2=(n)=>{
    if (n.length<10) {
          n=n+' . More is on the way';
      }
    let result = "";
      for (let i of n){
       
        result = result + i;
       
       if(result.length==10) {
           break;
          }
   }
   return result+'...';
  }
  const trim3=(n)=>{
    if (n.length<200) {
          n=n+'...';
          return n
      }
    let result = "";
      for (let i of n){
       
        result = result + i;
       
       if(result.length==200) {
           break;
          }
   }
   return result+'...';
  }
export default {trim,trim2,trim3};