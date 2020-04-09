import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, ProgressButton, FileInput} from '../../../../../../components'
import * as userListImportActions from '../../../../../../services/Users/UserListImport/actions'
import * as userListImportErrors from '../../../../../../services/Users/UserListImport/errorTypes'

var initialized = false;

const UserListImport = ({open, onClose, ...props}) => {
    const {success, loading, error} = props.userListImport;
    const errorMessage = error === userListImportErrors.BAD_REQUEST_ERROR ? "L'import est en erreur, car le fichier ne respecte pas les contraintes ci-dessus. Certains utilisateurs peuvent ne pas avoir été importé."
        : error === userListImportErrors.UNKNOWN_ERROR ? "L'import est en erreur pour une raison inconnue."
        : null;

    useEffect(() => {
        if (!initialized) {
            initialized = true;
            props.userListImportActions.clearUserListImport()
        }
    });

    if (success) {
        props.userListImportActions.clearUserListImport();
        onClose()
    }

    const onDialogClose = () => {
        if (!loading) {
            props.userListImportActions.clearUserListImport();
            onClose()
        }
    };

    const onSubmit = (model) => {
        const request = new FormData();
        request.append('file', model.file, model.file.name);
        props.userListImportActions.clearUserListImport();
        props.userListImportActions.importUserList(request)
    };

    return (
        <Dialog open={open} onClose={onDialogClose}>
            <Formsy onValidSubmit={onSubmit}>
                <DialogTitle>Import d'utilisateurs</DialogTitle>
                <DialogContent>
                    <div>
                        <FileInput name='file' accept='.csv' required />
                    </div>
                    <div>
                        <br />
                        Importez un fichier au format .csv avec pour caractère séparateur la virgule. L'utilisation de la virgule n'est pas autorisée dans les valeurs du fichier.
                        <br />
                        Chaque colonne du fichier doit respecter les conditions ci-dessous :
                        <ol>
                            <li>Prénom : 30 caractères maximum</li>
                            <li>Nom : 150 caractères maximum</li>
                            <li>Email : Unique, 254 caractères maximum</li>
                            <li>Type : Collaborateur, Manager ou Administrateur</li>
                            <li>Équipe : Nom exact de l'équipe prélablement enregistrée</li>
                            <li>Mot de passe</li>
                        </ol>
                    </div>
                    {errorMessage && <div style={{color: '#f44336'}}>
                        <br />
                        {errorMessage}
                    </div>}
                </DialogContent>
                <DialogActions>
                    <Button type='button' color='secondary' onClick={onDialogClose}>Annuler</Button>
                    <ProgressButton type='submit' text='Importer' loading={loading} />
                </DialogActions>
            </Formsy>
        </Dialog>
    )
};

const mapStateToProps = ({userListImport}) => ({
    userListImport
});

const mapDispatchToProps = (dispatch) => ({
    userListImportActions: bindActionCreators(userListImportActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListImport)
