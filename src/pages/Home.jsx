import React , {useState, useEffect} from 'react'
import DefaultLayout from '../component/DefaultLayout'
import Spinner from '../component/spinner'
import axios from 'axios'
import AddEditTransactions from '../component/AddEditTransactions'
import "../resources/transactions.css";
import { DatePicker, message, Select, Table } from 'antd'
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,  
} from "@ant-design/icons"
import Analytics from '../component/Analytics';
import moment from "moment";
import API_URL from '../api'
const {RangePicker} = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
  useState(false);
const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
const [loading, setLoading] = useState(false);
const [transactionsData, setTransactionsData] = useState([]);
const [frequency, setFrequency] = useState("7");
const [type, setType] = useState("all");
const [selectedRange, setSelectedRange] = useState([]);
const [viewType, setViewType] = useState("table");
const getTransactions = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("expense-tracker-user"));

    setLoading(true);
    const response = await axios.post(
      `${API_URL}/api/transactions/get-all-transactions`,
      {
        userid: user._id,
        frequency,
        ...(frequency === "custom" && { selectedRange }),
        type,
      }
    );
    setTransactionsData(response.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    message.error("Something went wrong");
  }
};

const deleteTransaction = async (record) => {
  try {
    setLoading(true);
    await axios.post(`${API_URL}//api/transactions/delete-transaction`, {
      transactionId: record._id,
    });
    message.success("Transaction Deleted successfully");
    getTransactions();
    setLoading(false);
  } catch (error) {
    setLoading(false);
    message.error("Something went wrong");
  }
};

useEffect(() => {
  getTransactions();
}, [frequency, selectedRange, type]);

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Reference",
    dataIndex: "reference",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text, record) => {
      return (
        <div>
          <EditOutlined
            onClick={() => {
              setSelectedItemForEdit(record);
              setShowAddEditTransactionModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-3"
            onClick={() => deleteTransaction(record)}
          />
        </div>
      );
    },
  },
];

const getPaginationConfiguration = (pageSize) => transactionsData.length > pageSize ? {pageSize} : false

  return (
    <DefaultLayout>
      {loading && <Spinner/>}
      <div className="filter d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="d-flex-flex-coloumn">
          <h6>Select Frequency</h6>
      <Select value={frequency} onChange= {(value) => setFrequency(value)}>
        <Select.Option value='7'>Last 1 Week</Select.Option>
        <Select.Option value='30'>Last 1 Month</Select.Option>
        <Select.Option value='365'>Last 1 Year</Select.Option>
        <Select.Option value='custom'>Custom</Select.Option>
      </Select>          

      {frequency === "custom" && (
        <div className="mt-2">
          <RangePicker
            value={selectedRange}
            onChange={(values) => setSelectedRange(values)}
          />
        </div>
      )}
      </div>

        <div className="d-flex-flex-coloumn">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
        </div>
      </div>

        <div className="d-flex">
          <div className='gr'>
            <div className="view-switch">
              <UnorderedListOutlined
                className={`mx-3 ${viewType === "table" ? "active-icon": "inactive-icon"}`}
                onClick = { () => setViewType("table")}
                size={30}
              />
               <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("analytics")}
                size={30}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} pagination={getPaginationConfiguration(10)}/>
          </div>
        ) : (
          <Analytics transactions={transactionsData} type={type}/>
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransactions
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  )
}

export default Home
