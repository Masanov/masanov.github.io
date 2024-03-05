import React, { useEffect, useState } from 'react';

import type { TableColumnsType } from 'antd';
import { Divider, Radio, Space, Dropdown,  Table, Button, Tag, Flex, Typography } from 'antd';
import type { TableProps } from 'antd';
import './App.css';

const { Text } = Typography;

const columns = [
  
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    filters: [
      {
        text: 'NexaWave',
        value: 'NexaWave',
      },
      {
        text: 'Microsoft',
        value: 'Microsoft'
      },
      {
        text: 'Salary Fond',
        value: 'Salary Fond'
      }
    ],
    onFilter: (value, record) => record.recipient.indexOf(value) === 0,

  },
  {
    title: 'Amount',
    dataIndex: 'age',
  },
  {
    title: 'Wallet',
    dataIndex: 'wallet',
    filters: [
      {
        text: 'Main',
        value: 'Main',
      },
      {
        text: 'Salary',
        value: 'Salary'
      },
      {
        text: 'Taxes',
        value: 'Taxes'
      }
    ],
    onFilter: (value, record) => record.wallet.indexOf(value) === 0,

  }
  
  ,Table.EXPAND_COLUMN,

];
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    recipient: `NexaWave`,
    age: 250,
    wallet: 'Main',
    address: `IBAN: HR43 4355 4664 4455 ${i}`,
    reference: 'Some refrerence text'
  });
}
for (let i = 5; i < 10; i++) {
  data.push({
    key: i,
    recipient: `Microsoft`,
    age: 250,
    wallet: 'Main',
    address: `IBAN: HR43 4355 4664 4455 ${i}`,
    reference: 'Some refrerence text'
  });
}
for (let i = 11; i < 14; i++) {
  data.push({
    key: i,
    recipient: `Salary Fond`,
    age: 200,
    wallet: 'Salary',
    address: `IBAN: HR43 4355 4664 4455 ${i}`,
    reference: 'some text'
  });
}
for (let i = 16; i < 20; i++) {
  data.push({
    key: i,
    recipient: `Goverment fond`,
    age: 300,
    wallet: 'Taxes',
    address: `IBAN: HR43 4355 4664 4455 ${i}`,
    reference: 'some text'
  });
}
function App() {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedSome, setSelectedSome] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const [isChanged, setIsChanged] = useState(false);
  
  useEffect(() => {
    setLoading(false);
    
  }, [dataSource])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };


  function calculateAgeSum(data, keys) {
    let sum = 0;
    data.forEach(obj => {
        if (keys.includes(obj.key)) {
            sum += obj.age;
        }
    });
    return sum;
  }

  async function updateWallet(data, keys, newWallet) {
    const updatedData = data.map(obj => {
        if (keys.includes(obj.key)) {
            return { ...obj, wallet: newWallet };
        } else {
            return obj;
        }
    });

    
    setDataSource(updatedData);
    setIsChanged(true);
    

};


  



  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    
    const result = calculateAgeSum(dataSource, newSelectedRowKeys);
    setSelectedCount(newSelectedRowKeys.length);

    setSelectedAmount(result);
    console.log("Сумма возрастов:", result);
    console.log("Сумма возрастов:", result);
    if(newSelectedRowKeys.length == 0) {
      setSelectedSome(false);
    } else {
      setSelectedSome(true);
    }

  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const items = [
    {
      key: '1',
      label: (
        <span onClick={() => updateWallet(dataSource, selectedRowKeys, "Main")}>
          Main
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span  onClick={() => updateWallet(dataSource, selectedRowKeys, "Salary")}>
          Salary
        </span>
      ),
    },
    ,
    {
      key: '3',
      label: (
        <span  onClick={() => updateWallet(dataSource, selectedRowKeys, "Taxes")}>
          Taxes
        </span>
      ),
    }
    
  ];

  return (
    <div className="App">


      <div style={{ maxWidth: "1000px", margin: "40px auto"}}>
        <div style={{}}>
          <Flex vertical align='flex-start'>        <h1>{selectedCount} payments to send</h1>
          <Text>{selectedCount} out of {data.length} transactions are marked to execute and will be sent</Text></Flex>          
        </div>

      <div style={{ marginTop: "100px", height: "30px"}}>
      <Flex gap={20} justify='flex-end'>
        
        {selectedSome && 
        <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button >Set wallet</Button>
      </Dropdown>
        }
        {isChanged && <Button onClick={() => {setDataSource(data); setIsChanged(false)}}>Reset changes</Button>}
        
        </Flex>
        

      </div>


        { !loading && <Table  scroll={{
      y: 600,
    }}   expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.address}
          <br />
          Reference: {record.reference}
        </p>
      ),
    }}    pagination={false} style={{borderRadius: '8px', margin: '20px 0 140px 0', border: '1px solid #d1cfd5'}} 
    rowSelection={rowSelection} columns={columns} dataSource={dataSource} />}


      </div>

      <div style={{ height: "100px", width: "100%", backgroundColor: "white", position: "fixed", bottom: "0", left: "0"}}>
        <Flex justify='flex-end' gap={20} align='center' style={{maxWidth: "1000px", margin: "10px auto"}}>
          <h3>{selectedAmount} EUR</h3>
          <Button onClick={() => {alert(selectedAmount)}} type="primary">Confirm {selectedCount} payments</Button>
        </Flex>
        

      </div>

    </div>
  );
}

export default App;
