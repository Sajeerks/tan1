import { getCoreRowModel, useReactTable , flexRender} from "@tanstack/react-table";
import dataFormJson from "../../public/MOCK_DATA.json"
import { columnDef,columnDefWithHeader } from "./columns";
import "./table.css"

import React, { useMemo } from 'react'





const ReactTable = () => {
const finalData = useMemo(()=>{return dataFormJson}, [])
const finalColumns = useMemo(()=>{return columnDefWithHeader}, [])




    const tableInstance = useReactTable({
        data:finalData,
        columns:finalColumns,
        getCoreRowModel: getCoreRowModel(),

       })
       
    //    console.log(tableInstance.getHeaderGroups());



// console.log("tableInstance.getFooterGroups()===",tableInstance.getFooterGroups());


  return (<table>
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
    
  )
}

export default ReactTable