import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import Breadcrumbs from "../UI/breadcrumbs/Breadcrumbs";
import WhitePageSection from "./UI/WhitePageSection";
import TableSection from "./UI/TableSection";
import CompanyServices from "../API/companyServices";
import {useFetching} from "../Hooks/useFetching";
import ModalWindow from "../UI/Modal/ModalWindow";
import {tableFieldType} from "../UI/Table/tableFieldType";
import BaseTable from "../UI/Table/BaseTable";
import EnterSection from "./UI/EnterSection";
import AddForm from "../UI/AddForm/AddForm";


const Company = () => {

    const [companies, setCompanies ] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const user = useSelector (state => state.user)

    const [loadCompanies, loadCompaniesMessageError, loadCompaniesClearMessageError] =
        useFetching (async (id) => {
            const response = await CompanyServices.ownerOrgList(id);
            setCompanies(response.data);
        })

    const [addCompany, addCompanyMessageError, addCompanyClearMessageError] =
        useFetching (async (id, name) => {
            const response = await CompanyServices.createOrg(id, name);
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
            fieldName : 'company',
            justify : 'start',
            width : 4,
            fieldNameInList: 'company',
        },
    ]


    useEffect(()=>{
        const t = async () => {
            if (user.id && user.email){
                await loadCompanies(user.id)
            }
        }
        t()
    },[user.id, user.email])

    useEffect(() => {
        setModalMessage(
            loadCompaniesMessageError+
            addCompanyMessageError
        )
    },[loadCompaniesMessageError,
        addCompanyMessageError
    ])

    const actionAddCompany = async (name) =>{
        await addCompany(user.id, name)
    }

    const clearAllMessages = () => {
        if (loadCompaniesMessageError) loadCompaniesClearMessageError();
        if (addCompanyMessageError) addCompanyClearMessageError();
        setModalMessage('');
    }



    return (
        <>
            {modalMessage &&
                <ModalWindow title={'Error'} body={modalMessage} closeAction={clearAllMessages}/>}
            <div>
                <Breadcrumbs>
                    Company list for..... {user.email}
                </Breadcrumbs>
                <WhitePageSection>
                    <TableSection>
                        <BaseTable
                            fieldsList={fieldsList}
                            elementsList={companies}
                        />
                    </TableSection>
                    <EnterSection>
                        <AddForm
                            currentItem={''}
                            placeholder={'Enter new company name'}
                            actionButton={actionAddCompany}
                            inputType={tableFieldType.ENTER_FIELD}
                        />
                    </EnterSection>
                </WhitePageSection>

            </div>
        </>
    );
};

export default Company;