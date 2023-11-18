import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";

import IndeterminateCheckbox from "./Various/IndeterminateCheckbox";
import { useState } from "react";
import EditableCell from "./Various/EditableCell";


export type DataType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  phone: string;
  date: string;
};

const columnHelper = createColumnHelper<DataType>()

function emailFilterFunction(row:any, columId:any, filterValue:any){
  // console.log("row being called=",row);
  // console.log("columId being called=",columId);
  // console.log("filterValue being called=",filterValue);
  // console.log("row.original being called=",row.original);
  

  if(columId ==="email"){
    let test = row.original.email.includes(filterValue)
    return test?true:false
  }
  if(columId ==="first_name"){
    let test = row.original.email.includes(filterValue)
    return test?true:false
  }
     return false
}


function emailItemEdit(row:DataType){
    // console.log("row being called=",row);


   if(row.email ==="qpidcock0@amazon.co.uk"){
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    // row.email ="xxxxxxxxxxxxxxx.com"
    // console.log("rowwwwww",row);
   return     row.email
   }
   return row.email
}

function emailcellContentChangeFunction(cell:any){
  // console.log("cell--",cell);
  return <span style={{color:"red"}}>{cell.getValue()}</span>
}

// emailFilterFunction.autoRemove=(val:any)=!val
export const columnDef = [
    // columnHelper.accessor('id', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor('first_name', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor('id', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor('id', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor('id', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor('id', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    //   }),

    {
        accessorKey: "id",
        header: "Header id",
        footer:"footer id"
      },
 


  {
    accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
    header: "Header first_name+",
    footer:"combined name"
  },
  {
    accessorKey: "last_name",
    header: "Header last_name",
    footer: "Header last_name",
  },
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        footer: info => info.column.id ,
      }),
  {
    accessorKey: "date",
    header: "Header date",
    footer: "Header date",

  },
];



export const columnDefWithHeader = [
 
    {
        accessorKey: "id",
        header: "Header id",
        footer: (props:any) => props.column.id,
      },
 {
    header:"name",
    footer: (props:any) => props.column.id,
    columns:[
        
           
        {
          accessorKey: "first_name",
            accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
            header: "Header first_name+",
            footer:"combined name"
            
          },
         
          {
            accessorKey: 'last_name',
            cell:EditableCell ,
            footer: (props:any )=> props.column.id,

          },
          
    ],

 },


 
      {
        accessorKey: 'email',
        // cell: (info:any) => info.getValue(),
        // footer: (props:any )=> props.column.id,
        filterFn:emailFilterFunction,
        cell:emailcellContentChangeFunction,
       
        accessorFn:emailItemEdit,
      },
      {
        accessorKey: 'phone',
        cell: (info:any) => info.getValue(),
        footer: (props:any )=> props.column.id,
       
      },
  {
    accessorKey: "date",
    header: "Header date",
    footer: (props:any) => props.column.id,
   cell:({getValue}:any)=> moment(new Date(getValue())).format("MMMM DD YYYY")
  },
];


export const columnDefWithHeaderWithFilter = [
 
  {
      accessorKey: "id",
      header: "Header id",
      footer: (props:any) => props.column.id,
    },
{
  header:"name",
  footer: (props:any) => props.column.id,
  columns:[
      
         
      {
          accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
          header: "Header first_name+",
          footer:"combined name",
         enableColumnFilter:false,
         enableGlobalFilter:false
        },
       
        {
          accessorKey: 'last_name',
          cell: (info:any) => info.getValue(),
          footer: (props:any )=> props.column.id,
        },
        
  ],

},



    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      footer: info => info.column.id ,
    }),
    {
      accessorKey: 'phone',
      cell: (info:any) => info.getValue(),
      footer: (props:any )=> props.column.id,
    },
{
  accessorKey: "date",
  header: "Header date",
  footer: (props:any) => props.column.id,
 cell:({getValue}:any)=> moment(new Date(getValue())).format("MMMM DD YYYY")
},
];





export const columnDefWithHeaderWithFilterWithCheckBox= [
  {
    id: "select",
    header: ({ table }:any) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }:any) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  // columnHelper.accessor("id", {
  //   header: "Id",
  // }),
  {
      accessorKey: "id",
      header: "Header id",
      footer: (props:any) => props.column.id,
    },
{
  header:"name",
  footer: (props:any) => props.column.id,
  columns:[
      
         
      {
          accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
          header: "Header first_name+",
          footer:"combined name",
         enableColumnFilter:false,
         enableGlobalFilter:false
        },
       
        {
          accessorKey: 'last_name',
          cell: (info:any) => info.getValue(),
          footer: (props:any )=> props.column.id,
        },
        
  ],

},



    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      footer: info => info.column.id ,
    }),
    {
      accessorKey: 'phone',
      cell: (info:any) => info.getValue(),
      footer: (props:any )=> props.column.id,
    },
{
  accessorKey: "date",
  header: "Header date",
  footer: (props:any) => props.column.id,
 cell:({getValue}:any)=> moment(new Date(getValue())).format("MMMM DD YYYY")
},
];