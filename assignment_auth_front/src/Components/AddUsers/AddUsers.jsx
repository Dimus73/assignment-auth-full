import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {useFetching} from "../Hooks/useFetching";
import CompanyServices from "../API/companyServices";
import {tableFieldType} from "../UI/Table/tableFieldType";
import ModalWindow from "../UI/Modal/ModalWindow";
import Breadcrumbs from "../UI/breadcrumbs/Breadcrumbs";
import WhitePageSection from "./UI/WhitePageSection";
import TableSection from "./UI/TableSection";
import BaseTable from "../UI/Table/BaseTable";
import EnterSection from "./UI/EnterSection";
import AddForm from "../UI/AddForm/AddForm";
import AddUserServices from "../API/addUserServices";
import AddFormSelect from "../UI/AddForm/AddFormSelect";

const AddUsers = () => {

    const [companies, setCompanies ] = useState([]);
    const [users, setUsers ] = useState([]);
    const [companyUsers, setCompanyUsers ] = useState([]);
    const [currentCompany, setCurrentCompany]= useState('')
    const [modalMessage, setModalMessage] = useState('');

    const user = useSelector (state => state.user)

    const [loadUsers, loadUsersMessageError, loadUsersClearMessageError] =
        useFetching (async () => {
            const response = await AddUserServices.allUserList();
            setUsers(response.data);
        })

    const [loadCompanyUsers, loadCompanyUsersMessageError, loadCompanyUsersClearMessageError] =
        useFetching (async (company_id) => {
            const response = await AddUserServices.companyUserList(company_id);
            setCompanyUsers(response.data);
        })

    const [addUser, addUserMessageError, addUserClearMessageError] =
        useFetching (async (user_id, company_id) => {
            const response = await AddUserServices.addUserToCompany(user_id, company_id);
            setCompanyUsers(response.data);
        })

    const [loadCompanies, loadCompaniesMessageError, loadCompaniesClearMessageError] =
        useFetching (async (user_id) => {
            const response = await CompanyServices.ownerOrgList(user_id);
            setCompanies(response.data);
        })

    const fieldsList = [
        {
            fieldType: tableFieldType.INDEX_FIELD,
            fieldName : 'No',
            justify : 'center',
            width : 1,
            fieldNameInList: 'i'
        },
        {
            fieldType: tableFieldType.TEXT_FIELD,
            fieldName : 'User',
            justify : 'start',
            width : 4,
            fieldNameInList: 'email',
        },
    ]


    useEffect(()=>{
        const t = async () => {
            if (user.id && user.email){
                await loadCompanies(user.id)
                await loadUsers();
            }
        }
        t()
    },[user.id, user.email])

    // useEffect(()=>{
    //     const t = async () => {
    //         if (user.id && user.email){
    //             await loadUsers(currentCompany)
    //         }
    //     }
    //     t()
    // },[currentCompany])


    useEffect(() => {
        setModalMessage(
            loadUsersMessageError+
            addUserMessageError+
            loadCompaniesMessageError+
            loadCompanyUsersMessageError
        )
    },[
        loadUsersMessageError,
        addUserMessageError,
        loadCompaniesMessageError,
        loadCompanyUsersMessageError
    ])

    const actionAddUserToCompany = async (user_id) =>{
        await addUser(user_id, currentCompany)
    }

    const actionChoiceCompany = async (company_id) =>{
        await loadCompanyUsers(company_id);
        setCurrentCompany(company_id);
    }

    const clearAllMessages = () => {
        if (loadUsersMessageError) loadUsersClearMessageError();
        if (addUserMessageError) addUserClearMessageError();
        if (loadCompaniesMessageError) loadCompaniesClearMessageError();
        if (loadCompanyUsersMessageError) loadCompanyUsersClearMessageError();
        setModalMessage('');
    }



    return (
        <>
            {modalMessage &&
                <ModalWindow title={'Error'} body={modalMessage} closeAction={clearAllMessages}/>}
            <div>
                <Breadcrumbs>
                    Add users to company of  {user.email}
                </Breadcrumbs>
                <WhitePageSection>
                    <div className={'row'}>
                        <div className={'col-6'}>
                            <div className='row'>
                                <div>Select user company</div>
                            </div>
                            <AddFormSelect item={currentCompany} choiceList={companies}
                                           nameInChoiceList={'company'}
                                           setItem={actionChoiceCompany}

                            />
                        </div>
                    </div>
                    <TableSection>
                        <BaseTable
                            fieldsList={fieldsList}
                            elementsList={companyUsers}
                        />
                    </TableSection>
                    <EnterSection>
                        <AddForm
                            currentItem={''}
                            placeholder={''}
                            choiceList={users}
                            nameInChoiceList={'email'}
                            actionButton={actionAddUserToCompany}
                            inputType={tableFieldType.SELECT_FIELD}
                        />
                    </EnterSection>
                </WhitePageSection>

            </div>
        </>
    );
};


export default AddUsers;
