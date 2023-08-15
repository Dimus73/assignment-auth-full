import {useEffect, useState} from "react";
import MyButton from "../Button/MyButton";
import AddFormInput from "./AddFormInput";
import {tableFieldType} from "../Table/tableFieldType";
import AddFormSelect from "./AddFormSelect";

function AddForm ({currentItem, choiceList, placeholder, nameInChoiceList, actionButton, inputType}) {

    const [item, setItem] = useState({})

    useEffect (()=>{
        setItem(currentItem)
    },[currentItem])

    const pushAddButton = async ( ) => {
        // console.log('In PushButton =>', item);
        await actionButton(item);
        setItem('')

    }

    return (
        <div>
            <div className='row'>
                <div>New</div>
            </div>
            <form className='font-comfortaa'  action="">
                <div className='row justify-content-md-center' >
                    <div className='col-9'>
                        {
                            inputType === tableFieldType.ENTER_FIELD ?
                                <AddFormInput item={item} setItem={setItem} placeholder={placeholder}/>
                                :
                                <AddFormSelect item={item} choiceList={choiceList} nameInChoiceList={nameInChoiceList} setItem={setItem} placeholder={placeholder}/>
                        }
                    </div>
                    <div  className='col'>
                        <MyButton onClickAction={pushAddButton}>Add</MyButton>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddForm