import { useEffect, useState } from 'react'
import styles from './style.module.sass'
import * as requestService from '../../../../services/Admin/request'
import Table from '../../../../components/Admin/Table'
import Modal from '../../../../components/Modal'
import Edit from './Edit'
import { ModalTypes } from '../../ModalTypes'
import Delete from './Delete'
import Create from './Create'
import { useSelector } from 'react-redux'
import { selectLanguagePack } from '../../../../store/localization'
const Access = () => {
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const [currentModal, setCurrentModal] = useState(ModalTypes.none)
  useEffect(() => {
    requestService.get((respData: any) => {
      setData((prev) => respData.data)
    })
  }, [])
  const handleRowSelect = (row: any, modal: ModalTypes) => {
    setCurrentModal(modal)
    setSelectedRow(row)
  }

  const handleCloseModal = () => {
    setCurrentModal(ModalTypes.none)
    setSelectedRow({})
  }
  const language = useSelector(selectLanguagePack)

  return (
    <div>
      <div className={styles['create']}>
        <button onClick={() => setCurrentModal(ModalTypes.Create)}>
          {language.create}
        </button>
      </div>

      <Modal
        isOpen={currentModal !== ModalTypes.none}
        onCloseModal={handleCloseModal}
      >
        {getModal(currentModal, selectedRow)}
      </Modal>
      {data.length && <Table data={data} onSelect={handleRowSelect} />}
    </div>
  )
}

const getModal = (type: ModalTypes, data: any) => {
  switch (type) {
    case ModalTypes.Create: {
      return <Create />
    }
    case ModalTypes.Edit: {
      return <Edit data={data} />
    }
    case ModalTypes.Delete: {
      return <Delete data={data} />
    }
    default:
      return <></>
  }
}
export default Access
