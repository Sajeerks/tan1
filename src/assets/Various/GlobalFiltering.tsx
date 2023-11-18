import { getCoreRowModel, useReactTable , flexRender, getSortedRowModel, getFilteredRowModel} from "@tanstack/react-table";
import dataFormJson from "../../../public/MOCK_DATA.json"
import { columnDef,columnDefWithHeader } from "../columns";
import "../table.css"

import React, { useMemo, useState } from 'react'





const ReactTable = () => {
const finalData = useMemo(()=>{return dataFormJson}, [])
const finalColumns = useMemo(()=>{return columnDefWithHeader}, [])

const [sorting, setsorting] = useState<any[]>([])

const [filtering, setfiltering] = useState("")


    const tableInstance = useReactTable({
        data:finalData,
        columns:finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        state:{
          sorting:sorting,
          globalFilter:filtering
        },
   onSortingChange:setsorting,
   getFilteredRowModel:getFilteredRowModel(),
   onGlobalFilterChange:setfiltering,

       })
       
    //    console.log(tableInstance.getHeaderGroups());



// console.log("tableInstance.getFooterGroups()===",tableInstance.getFooterGroups());


  return (
  <>
  <input type="text" value={filtering} onChange={e=>setfiltering(e.target.value)} placeholder="global filter"/>

  
  <table>
    <thead>
{tableInstance.getHeaderGroups().map(headerEL=>{
    return <tr key={headerEL.id}>
           {headerEL.headers.map(columEl=>{
         return   <th key={columEl.id} colSpan={columEl.colSpan} onClick={columEl.column.getToggleSortingHandler()}>
              
           {columEl.isPlaceholder?null:flexRender(columEl.column.columnDef.header, columEl.getContext())}
           {{asc:"-UP", desc:"-DOWN", null:""}[columEl.column.getIsSorted() ==="asc"?"asc":columEl.column.getIsSorted() ==="desc"?"desc":"null"]}
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