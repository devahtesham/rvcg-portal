import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material";
import "./DataGrid.css"



const DataGridGlobal = (props) => {
 
  // theming
  const getUiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              color: 'gray',
              fontWeight: 'bolder',
            },
            body: {
              padding: '10px 8px',
              color: 'gray',
            },
            footer: {
              padding:props.isPaddingLess && 0
            }
          }
        },
        MUIDataTableHeadCell:{
          styleOverrides:{
            data:{
              lineHeight:'18px'
            }
          }
        },
        MUIDataTableBodyCell:{
            styleOverrides:{
              stackedHeader:{
                display:'none'
              }
            }
          
        },

        MUIDataTableToolbar:{
          styleOverrides:{
            actions:{
              display: props.isHideToolbar ? "none":"flex",
              justifyContent:'flex-end',
              gap:'18px',
              marginBottom:'13px',
              
            },
            root:{
              minHeight:props.isHideToolbar && 0
            }
          },
        },
        MuiPaper:{
          styleOverrides:{
            elevation1:{
              boxShadow: props.Notshadow && "none"
            },
            elevation2:{
              padding:'18px'
            },
            
          }
        },
       
        
        
      }
    })

  return (
    <ThemeProvider theme={getUiTheme()}>
      <section className="data-grid-sec">
        <MUIDataTable
          data={props.data}
          columns={props.columns}
          options={props.options}
        />

      </section>
    </ThemeProvider>
  )
}

export default DataGridGlobal