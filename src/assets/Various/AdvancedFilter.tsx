import { getCoreRowModel, useReactTable , flexRender, getFilteredRowModel} from "@tanstack/react-table";
import dataFormJson from "../../../public/MOCK_DATA.json"
import { DataType, columnDef,columnDefWithHeader } from "../columns";
import "../table.css"

import React, { useEffect, useMemo, useState } from 'react'





const ReactTable = () => {
const finalData = useMemo(()=>{return dataFormJson}, [])
const finalColumns = useMemo(()=>{return columnDefWithHeader}, [])

const [count, setcount] = useState(0)
const [name, setName] = useState("")
const [email, setemail] = useState("")
const [data, setdata] = useState<DataType[]>([])


useEffect(() => {
    setdata(dataFormJson)

}, [])



    const tableInstance = useReactTable({
        data:data,
        columns:finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        meta:{
            updateData:(rowIndex:number, columId:string, value:any)=>{
                console.log("xxxxxxxxxxxxxxxxxx");
                setdata((prev)=>
       
                prev.map((row, index)=>
                    index === rowIndex ?{
                        ...prev[rowIndex],
                        [columId]:value
                      
                    }:row
              
                  
               
            ))
       
        }
        }

       })
       
    //    console.log(tableInstance.getHeaderGroups());

    useEffect(() => {
        if(count ===5){
            return 
        }
        setcount(prev=>prev++)
         tableInstance.getHeaderGroups().map(headerArr=>{
            headerArr.headers.map(columObj=>{
                // console.log("singleColumn==",columObj.column);
                if(columObj.column.id === "email"){
                    columObj.column.setFilterValue("")
                    // columObj.column.setFilterValue( email || "")


                    // console.log("the fileter value for getfilervalue==", columObj.column.getFilterValue())
                }
                if(columObj.column.id === "first_name"){
                    columObj.column.setFilterValue("")
                    // columObj.column.setFilterValue( name || "")

                    // console.log("the fileter value for getfilervalue==", columObj.column.getFilterValue())
                }
            })
         })
         console.log(data);
    }, [count, name, email])

// console.log({tableInstance});
// console.log("tableInstance.getFooterGroups()===",tableInstance.getFooterGroups());
// console.log(tableInstance.getState());

  return (
  <>
  <input type="text" placeholder="first name" onChange={(e)=>setName(e.target.value)} />
  <input type="text" placeholder="email name" onChange={(e)=>setemail(e.target.value)} />

  
  <table>
    <thead>
{tableInstance.getHeaderGroups().map(headerEL=>{
    return <tr key={headerEL.id}>
           {headerEL.headers.map(columEl=>{
         return   <th key={columEl.id} colSpan={columEl.colSpan}>
              
           {columEl.isPlaceholder?null:flexRender(columEl.column.columnDef.header, columEl.getContext())}
            </th>
           })}
    </tr>
})}
    </thead>
    <tbody>
          {tableInstance.getRowModel().rows.map((rowEl)=>{
                 return (
                    <tr key={rowEl.id}>
                           {rowEl.getVisibleCells().map(cellEl=>{
                        return (<td key={cellEl.id}>
                        {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
                        
                            </td>)
                    })}
                 
                    </tr>
)
                 
          })}

    </tbody>
    <tfoot>
    {tableInstance.getFooterGroups().map(headerEL=>{
    return <tr key={headerEL.id}>
           {headerEL.headers.map(columEl=>{
         return   <th key={columEl.id} colSpan={columEl.colSpan}>
              {flexRender(columEl.column.columnDef.header, columEl.getContext())}

            </th>
           })}
    </tr>
})}

    </tfoot>
          
  </table>
  </>
  )
}

export default ReactTable