import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import { InvoiceStore } from "./stores/invoiceStore";

export function App() {
  const [invoices, setInvoices] = useState([]);
  const [currentTab, setCurrentTab] = useState("all_invoices");
  console.log("🚀 ~ App ~ invoices:", invoices);

  useEffect(() => {
    const fetchedInvoices = InvoiceStore.getInvoices();
    setInvoices(fetchedInvoices);
  }, []);

  const addInvoice = () => {
    const newInvoice = { id: Date.now(), name: "New Invoice" };
    InvoiceStore.addInvoice(newInvoice);
    setInvoices([...invoices, newInvoice]);
  };

  const items = [
    {
      key: "all_invoices",
      label: "All Invoices",
      children: (
        <>
          <Button
            onClick={() => {
              setCurrentTab("create_invoice");
            }}
          >
            Add Invoice
          </Button>
          <Table dataSource={invoices} rowKey="id">
            <Table.Column title="Invoice ID" dataIndex="id" key="id" />
            <Table.Column title="Invoice Name" dataIndex="name" key="name" />
          </Table>
        </>
      ),
    },
    {
      key: "create_invoice",
      label: "Create Invoice",
      children: (
        <InvoiceForm
          onFinish={(invoice) => {
            console.log("🚀 ~ App ~ invoice:", invoice);
            // InvoiceStore.addInvoice(invoice);
            // setInvoices([...invoices, invoice]);
          }}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1>Invoice Management System</h1>
      <Tabs
        onChange={(key) => {
          setCurrentTab(key);
        }}
        defaultActiveKey="all_invoices"
        activeKey={currentTab}
        items={items}
      />
    </div>
  );
}
const { Option } = Select;

const InvoiceForm = () => {
  const onFinish = (values) => {
    console.log("Form values: ", values);
    InvoiceStore.addInvoice(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Invoice Number"
        name="invoiceNumber"
        rules={[
          { required: true, message: "Please input the invoice number!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select the status!" }]}
      >
        <Select>
          <Option value="paid">Paid</Option>
          <Option value="unpaid">Unpaid</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Notes" name="notes" rules={[{ required: false }]}>
        <Input.TextArea placeholder="Add any notes here, including payment instructions, where to send checks, etc." />
      </Form.Item>
      <Form.Item
        label="Invoice Date"
        name="invoiceDate"
        rules={[{ required: true, message: "Please select the invoice date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[{ required: true, message: "Please select the due date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Client Information"
        name="clientInformation"
        rules={[
          { required: true, message: "Please input the client information!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.List
        name="lineItems"
        rules={[
          { required: true, message: "Please add at least one line item" },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  fieldKey={[fieldKey, "description"]}
                  rules={[{ required: true, message: "Missing description" }]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "quantity"]}
                  fieldKey={[fieldKey, "quantity"]}
                  rules={[{ required: true, message: "Missing quantity" }]}
                >
                  <InputNumber placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "rate"]}
                  fieldKey={[fieldKey, "rate"]}
                  rules={[{ required: true, message: "Missing rate" }]}
                >
                  <InputNumber placeholder="Rate" />
                </Form.Item>
                <Button type="danger" onClick={() => remove(name)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              Add Line Item
            </Button>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
