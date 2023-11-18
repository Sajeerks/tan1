import React, { useState } from 'react'

const EditableCell =  ({row,column,table,getValue}:any)=> {

  

        const initalValue = getValue()

        const [valuecell, setvaluecell] = useState(initalValue)

        const onBlur = ()=>{
          console.log("props table", table);
          console.log(" props.table.options.meta",table.options.meta);

          table.options.meta?.updateData(row.index,column.id,valuecell)
          console.log("row id",row.index);
          console.log("columksid",column.id);
          console.log("sssssssssssssssss");
        }


    return (   <input value={valuecell} onChange={e=>setvaluecell(e.target.value)}  onBlur={onBlur}/>)

      }    
  


export default EditableCell