import {React, useState, useEffect} from 'react'
import Layout from './../components/Layout/Layout'
import {Form, Input, Select, Modal, message, Table} from 'antd'
import axios from 'axios'
// import { addTransaction, getAllTransactionsOfAUser } from "../utils/urls"
import { addTransaction } from "../utils/urls"
import Spinner from "../components/Spinner"
const SERVER_URL = "http://localhost:8080/api/v1"

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])

  // Table data
  const columns = [
    {
      title : 'Date',
      dataIndex : 'date'
    },
    {
      title : 'Amount',
      dataIndex : 'amount'
    },
    {
      title : 'Type',
      dataIndex : 'type'
    },
    {
      title : 'Category',
      dataIndex : 'category'
    },
    {
      title : 'Reference',
      dataIndex : 'reference'
    },
    {
      title : 'Actions'
    }
  ]

  // Get All transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoader(true)
      const encodedUserId = encodeURIComponent(user._id)
      const result = await axios.post(`${SERVER_URL}/transactions/get-all-transactions/${encodedUserId}`, {userId : user._id})
      setLoader(false)
      setAllTransactions(result.data.transactions)
    } catch (error) {
      setLoader(false)
      message.error('Failed to fetch all transactions')
    }
  }

  // useEffect hook to fetch all transactions
  useEffect(() => {
    getAllTransactions()
  }, [])

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoader(true)
      await axios.post(addTransaction, {...values, userId : user._id})
      setLoader(false)
      message.success('Transaction added successfully')
      setShowModal(false)
    } catch (error) {
      setLoader(false)
      message.error('Failed to add transaction')
    }
  }

  return (
    <Layout>
      {loader && <Spinner />}
        <div className='filters'>
          <div>Range filters</div>
          <div>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className="content">
          <Table columns = {columns} dataSource={allTransactions} />
        </div>
        <Modal 
          title="Add transaction"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name = "amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name = "date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name = "reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name = "description">
              <Input type="text" />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <button className='btn btn-primary' type='submit'>
                {' '}
                SAVE
                </button>
            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage