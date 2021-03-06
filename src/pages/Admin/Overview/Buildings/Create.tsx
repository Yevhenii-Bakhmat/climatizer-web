import styles from './style.module.sass'
import { ModalTypes } from '../../ModalTypes'
import { post } from '../../../../services/Admin/access'

import Form from '../../../../components/Admin/Form'
import Building from '../../../../models/Building'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../../store/user'

const Create = () => {
  const handelSubmit = (data: any) => {
    post(data, (response: any) => {
      console.log(response)
    })
  }
  const language = useSelector(selectUserName)
  return (
    <div className={styles['edit']}>
      <Form
        data={new Building()}
        modal={ModalTypes.Create}
        title={language.create}
        onSubmit={handelSubmit}
      />
    </div>
  )
}

export default Create
