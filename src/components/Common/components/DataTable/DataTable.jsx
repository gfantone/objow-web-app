import React from 'react'
import MUIDataTable from 'mui-datatables'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTable: {
            paper: {
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)'
            },
            responsiveScroll: {
                maxHeight: 'none !important'
            }
        },
        MUITableCell: {
          body: {
            color: 'red'
          }
        }
    }
})

const DataTable = (props) => {
    const { data, columns, options } = props
    const fullOptions = {...options,
        download: false,
        print: false,
        responsive: 'scroll',
        textLabels: {
            body: {
                noMatch: 'Aucun élément correspondant trouvé',
                toolTip: 'Trier'
            },
            filter: {
                all: 'Tout',
                title: 'Filtres',
                reset: 'Réinitialiser'
            },
            pagination: {
                rowsPerPage: 'Lignes par page'
            },
            toolbar: {
                search: 'Rechercher',
                downloadCsv: 'Télécharger',
                print: 'Imprimer',
                viewColumns: 'Colonnes',
                filterTable: 'Filtrer'
            },
            viewColumns: {
                title: 'Afficher colonnes'
            }
        },
        rowsPerPage: 25,
        rowsPerPageOptions: [25, 50, 100]
    }

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={fullOptions}
            />
        </MuiThemeProvider>
    )
}

export default DataTable
