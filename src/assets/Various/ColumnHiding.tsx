import { getCoreRowModel, useReactTable , flexRender, getSortedRowModel, getFilteredRowModel, getPaginationRowModel} from "@tanstack/react-table";
import dataFormJson from "../../../public/MOCK_DATA.json"
import { columnDef,columnDefWithHeader ,columnDefWithHeaderWithFilter,columnDefWithHeaderWithFilterWithCheckBox} from "../columns";
import "../table.css"

import React, { useMemo, useState } from 'react'
import Filter from "./FilterFunction";





const ReactTable = () => {
const finalData = useMemo(()=>{return dataFormJson}, [])
const finalColumns = useMemo(()=>{return columnDefWithHeaderWithFilterWithCheckBox}, [])
const defaultColumn = useMemo(()=>{return { youTubeProp:"hello world",}}, [])


const [sorting, setsorting] = useState<any[]>([])

const [filtering, setfiltering] = useState("")
const [columnFilters, setcolumnFilters] = useState<any[]>([])

const [columnOrder, setcolumnOrder] = useState<any[]>([])
const [columnVisibilty, setcolumnVisibilty] = useState({})



    const tableInstance = useReactTable({
        data:finalData,
        columns:finalColumns,
        defaultColumn:defaultColumn as any,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        state:{
          sorting:sorting,
          globalFilter:filtering,
          columnFilters:columnFilters,
          columnOrder:columnOrder,
          columnVisibility:columnVisibilty,
        },
   onSortingChange:setsorting,
   getFilteredRowModel:getFilteredRowModel(),
   onGlobalFilterChange:setfiltering,
   onColumnFiltersChange:setcolumnFilters,
getPaginationRowModel:getPaginationRowModel(),
   onColumnOrderChange:setcolumnOrder,
onColumnVisibilityChange:setcolumnVisibilty,


       })
       
    //    console.log(tableInstance.getHeaderGroups());



// console.log("tableInstance.getFooterGroups()===",tableInstance.getFooterGroups());

 
  return (
  <>
     <div>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: tableInstance.getIsAllColumnsVisible(),
              onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
        <hr />
        {tableInstance.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
  <hr />
  <input type="text" value={filtering} onChange={e=>setfiltering(e.target.value)} placeholder="global filter"/>

  <button onClick={()=>setcolumnOrder(["date", "email"])}>Change ORder</button>
  <table>
    <thead>
{tableInstance.getHeaderGroups().map(headerEL=>{
    return <tr key={headerEL.id}>
           {headerEL.headers.map(columEl=>{
          
         return   <th key={columEl.id} colSpan={columEl.colSpan} 
        //  onClick={columEl.column.getToggleSortingHandler()}
         
         >
              
           {columEl.isPlaceholder?null:<>
           <div 
           {...{
            className: columEl.column.getCanSort()
              ? 'cursor-pointer select-none'
              : '',
            onClick: columEl.column.getToggleSortingHandler(),
          }}
           
           >
           
           {flexRender(columEl.column.columnDef.header, columEl.getContext())}
           
           {{asc:"-UP", desc:"-DOWN"}[columEl.column.getIsSorted() as string ?? null]}
          
          {columEl.column.getCanFilter() ?(  <div>
           <Filter  column={columEl.column} table={tableInstance}/>
          </div> ):null
       }
           </div>
           </>}

       
        
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
  <hr />

  <div>
    <ul>
        {tableInstance.getSelectedRowModel().flatRows.map((el)=>{
            return (
                <li key={el.id}>

                    {JSON.stringify(el.original)}
                </li>
            )
        })}
    </ul>
  </div>
  <hr />
  <div>
    <button onClick={()=>tableInstance.setPageIndex(0)}>First page</button>
    <button disabled={!tableInstance.getCanPreviousPage()} onClick={()=>tableInstance.previousPage()}>prev page</button>
    <button disabled={!tableInstance.getCanNextPage()} onClick={()=>tableInstance.nextPage()}>next page</button>


    <button onClick={()=>tableInstance.setPageIndex(tableInstance.getPageCount()-1)}>Last page</button>
    
  </div>
  <hr />
  <ul>
    <li>
        "you are in page no -{" "} {tableInstance.options.state.pagination?.pageIndex!}
    </li>
    <li>
        Total pages ={tableInstance.getPageCount()-1}
    </li>
    <li>
        <input type="number" defaultValue={tableInstance.options.state.pagination?.pageIndex} 
        onChange={(e)=>tableInstance.setPageIndex(Number(e.target.value)  )}
        
        
        />
    </li>
  </ul>
  <hr />
  <h4>Current page SIze = {tableInstance.options.state.pagination?.pageSize}</h4>
  <select value={tableInstance.options.state.pagination?.pageIndex}
  onChange={e=>tableInstance.setPageSize(Number(e.target.value))}
//   defaultValue={tableInstance.options.state.pagination?.pageSize}
  >
{[10,25,50].map((pagesizeEl)=>{
return(
    <option key={pagesizeEl} value={pagesizeEl}>
{pagesizeEl}
    </option>
)
})}

  </select>
  </>
  )
}

export default ReactTable