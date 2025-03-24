import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { InvoiceStore } from "../stores/invoiceStore";

const InvoiceForm = ({ handleAfterSubmit }) => {
  const onFinish = (values) => {
    try {
      InvoiceStore.addInvoice({
        ...values,
        id: uuidv4(),
        totalAmount: calculateTotal().toFixed(2),
      });
      form.resetFields();
      handleAfterSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const [form] = Form.useForm();
  const lineItems = Form.useWatch("lineItems", form) || [];

  const calculateTotal = () =>
    lineItems.reduce(
      (sum, item) => sum + (item?.quantity || 0) * (item?.rate || 0),
      0
    );

  const addRandomValues = () => {
    const randomLineItems = Array.from({ length: 2 }, () => ({
      description: `Item ${Math.floor(Math.random() * 100)}`,
      quantity: Math.floor(Math.random() * 10) + 1,
      rate: (Math.random() * 100).toFixed(2),
    }));

    form.setFieldsValue({
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      status: "draft",
      invoiceDate: null,
      dueDate: null,
      notes: "These are random notes.",
      clientName: `Client ${Math.floor(Math.random() * 100)}`,
      clientEmail: `client${Math.floor(Math.random() * 100)}@example.com`,
      clientAddress: `Address ${Math.floor(Math.random() * 100)}`,
      lineItems: randomLineItems,
    });
  };

  useEffect(() => {
    form.setFieldsValue({ totalAmount: calculateTotal().toFixed(2) });
  }, [lineItems, form]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Invoice Number"
        name="invoiceNumber"
        rules={[
          { required: true, message: "Please input the invoice number!" },
        ]}
      >
        <Input className="w-full p-2 border border-gray-300 rounded" />
      </Form.Item>

      <Row gutter={[12]}>
        <Col span={8}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select className="w-full p-2 border border-gray-300 rounded">
              <Option value="draft">Draft</Option>
              <Option value="sent">Sent</Option>
              <Option value="paid">Paid</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Invoice Date"
            name="invoiceDate"
            rules={[
              { required: true, message: "Please select the invoice date!" },
            ]}
          >
            <DatePicker className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Notes" name="notes" rules={[{ required: false }]}>
        <Input.TextArea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Add any notes here, including payment instructions, where to send checks, etc."
        />
      </Form.Item>
      <Row gutter={[12]}>
        <Col span={12}>
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[
              { required: true, message: "Please input the client name!" },
            ]}
          >
            <Input className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Client Email"
            name="clientEmail"
            rules={[
              { required: true, message: "Please input the client email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Client Address"
        name="clientAddress"
        rules={[
          { required: true, message: "Please input the client address!" },
        ]}
      >
        <Input.TextArea className="w-full p-2 border border-gray-300 rounded" />
      </Form.Item>
      <Form.List name="lineItems">
        {(fields, { add, remove }) => (
          <>
            <Table
              dataSource={fields}
              pagination={false}
              rowKey="key"
              columns={[
                {
                  title: "Description",
                  dataIndex: "description",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "description"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter description"
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "quantity"]}
                      initialValue={1}
                      rules={[{ required: true, type: "number", min: 0.01 }]}
                    >
                      <InputNumber
                        className="w-full p-2 border border-gray-300 rounded"
                        min={0.01}
                        step={0.01}
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "Rate",
                  dataIndex: "rate",
                  render: (_, field) => (
                    <Form.Item
                      name={[field.name, "rate"]}
                      initialValue={0}
                      rules={[{ required: true, type: "number", min: 0 }]}
                    >
                      <InputNumber
                        className="w-full p-2 border border-gray-300 rounded"
                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "Total",
                  render: (_, field) => {
                    const values =
                      form.getFieldValue(["lineItems", field.name]) || {};
                    return (
                      <span>
                        ₹
                        {((values.quantity || 0) * (values.rate || 0)).toFixed(
                          2
                        )}
                      </span>
                    );
                  },
                },
                {
                  title: "Actions",
                  render: (_, field) => (
                    <Button
                      danger
                      onClick={() => remove(field.name)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  ),
                },
              ]}
            />
            <Button
              type="dashed"
              onClick={() => add()}
              className="mt-2 w-full border border-gray-300 rounded"
            >
              Add Line Item
            </Button>
          </>
        )}
      </Form.List>

      <div className="mt-5 text-right text-lg font-bold">
        Grand Total: ₹{calculateTotal().toFixed(2)}
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="mt-2">
          Submit
        </Button>
      </Form.Item>

      <Button type="primary" onClick={addRandomValues} className="mt-2">
        Add Random Values
      </Button>
    </Form>
  );
};

export default InvoiceForm;
