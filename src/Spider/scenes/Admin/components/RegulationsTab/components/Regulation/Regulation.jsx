import React, {useState} from 'react';
import {withStyles} from "@mui/styles";
import {Document as DocumentIcon} from 'iconsax-react';
import {Button} from "../../../../../../components";
import {useIntl} from "react-intl";
import {RightDialogFileInput} from "../../../../../../components/RightDialogFileInput";
import useSystemFile from "../../../../../../hooks/useSystemFile";
import {Divider, Typography} from "@material-ui/core";
import RegulationDocument from "./components/RegulationDocument/RegulationDocument";
import Pagination from "@material-ui/lab/Pagination";

const styles = {
    regulationCard: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '1rem',
        backgroundColor: '#F1F7FF',
        padding: '1rem',
        borderRadius: '1rem'
    },
    regulationHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    regulationTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem'
    },
    documents: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }
};

const Regulation = ({ regulation, ...props }) => {
    const intl = useIntl();

    const [isOpenScreenRightDialog, setIsOpenScreenRightDialog] = useState(false);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // todo: temporary data, useSelector will be use
    const [regulationDocuments, setRegulationDocuments] = useState({
        pagination: {
            page: 1,
            count: 4,
            total: 5,
        },
        data:[
            {
                id: 1,
                uuid: '12345678-1234-1234-1234-123456789012',
                status: "active",
                code: "LN",
                src: "https://example.com/image.pdf",
                filename: "image.pdf",
                created_at: "2021-01-01T00:00:00Z",
                ended_on: "2021-01-01T00:00:00Z",
                _context: {
                    approved: true
                }
            },
            {
                id: 2,
                uuid: '12345678-1234-1234-1234-123456789012',
                status: "inactive",
                code: "LN",
                src: "https://example.com/image.pdf",
                filename: "image.pdf",
                created_at: "2021-01-01T00:00:00Z",
                ended_on: "2021-01-01T00:00:00Z",
                _context: {
                    approved: true
                }
            },
            {
                id: 3,
                uuid: '12345678-1234-1234-1234-123456789012',
                status: "inactive",
                code: "LN",
                src: "https://example.com/image.pdf",
                filename: "image.pdf",
                created_at: "2021-01-01T00:00:00Z",
                ended_on: "2021-01-01T00:00:00Z",
                _context: {
                    approved: true
                }
            },
            {
                id: 4,
                uuid: '12345678-1234-1234-1234-123456789012',
                status: "inactive",
                code: "LN",
                src: "https://example.com/image.pdf",
                filename: "image.pdf",
                created_at: "2021-01-01T00:00:00Z",
                ended_on: "2021-01-01T00:00:00Z",
                _context: {
                    approved: true
                }
            },
            {
                id: 5,
                uuid: '12345678-1234-1234-1234-123456789012',
                status: "inactive",
                code: "LN",
                src: "https://example.com/image.pdf",
                filename: "image.pdf",
                created_at: "2021-01-01T00:00:00Z",
                ended_on: "2021-01-01T00:00:00Z",
                _context: {
                    approved: true
                }
            }
        ]
    })

    const { updateSystemFile } = useSystemFile({ onFileUpdated: () => { setIsOpenScreenRightDialog(false) } });

    const openRegulationUpload = () => {
        setIsOpenScreenRightDialog(true)
    };

    const updateFile = (files) => {
        updateSystemFile(files[0], regulation.code)
    }

    const renderRegulationDocuments = () => {
        return regulationDocuments.data
            .filter((document) => regulation.multiple ? true : document.status === 'active')
            .map((document, index) => {
                return (
                    <>
                        { index !== 0 && <Divider/>}
                        <RegulationDocument key={document.id} document={document} showStatus={regulation.multiple}/>
                    </>
                )
        })
    }

    return (
        <div className={props.classes.regulationCard}>
            <div className={props.classes.regulationHeader}>
                <div className={props.classes.regulationTitle}>
                    <DocumentIcon/>
                    <Typography variant={'h2'} component={'h2'}>
                        {regulation.label}
                    </Typography>
                </div>

                <Button variant={'contained'} color={'primary'} className={'size-tiny icon'} disableRipple
                        onClick={openRegulationUpload}>
                    {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.updateDocument'})}
                </Button>
            </div>

            <div className={props.classes.documents}>
                { renderRegulationDocuments() }
            </div>

            { regulation && regulation.multiple &&
                <Pagination
                    count={Math.ceil(regulationDocuments.data.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape='rounded'
                />
            }

            <RightDialogFileInput open={isOpenScreenRightDialog}
                                  title={regulation.label}
                                  authorizedFileTypes={['PDF']}
                                  setOpen={(value) => setIsOpenScreenRightDialog(value)}
                                  onValid={updateFile}
            />
        </div>
    );
}

export default withStyles(styles)(Regulation);
