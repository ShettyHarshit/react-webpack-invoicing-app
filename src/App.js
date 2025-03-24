import { Button, message, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import { InvoiceStore } from "./stores/invoiceStore";

export function App() {
  const [invoices, setInvoices] = useState([]);
  const [currentTab, setCurrentTab] = useState("all_invoices");

  useEffect(() => {
    const fetchedInvoices = InvoiceStore.getInvoices();
    setInvoices(fetchedInvoices);
  }, []);

  const onModalOpen = (text, record) => {
    Modal.info({
      title: `Invoice ${record.invoiceNumber}`,
      content: (
        <div>
          <p>
            <strong>Invoice Name:</strong> {record.name}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{record.totalAmount}
          </p>
          <p>
            <strong>Status:</strong> {record.status}
          </p>
          <p>
            <strong>Invoice Date:</strong> {record.invoiceDate}
          </p>
          <p>
            <strong>Due Date:</strong> {record.dueDate}
          </p>
          <p>
            <strong>Client Name:</strong> {record.clientName}
          </p>
          <p>
            <strong>Client Email:</strong> {record.clientEmail}
          </p>
          <p>
            <strong>Client Address:</strong> {record.clientAddress}
          </p>
          <p>
            <strong>Notes:</strong> {record.notes}
          </p>
          <h3>Line Items</h3>
          <Table
            dataSource={record.lineItems}
            rowKey="description"
            pagination={false}
          >
            <Table.Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Table.Column
              title="Quantity"
              dataIndex="quantity"
              key="quantity"
            />
            <Table.Column title="Rate" dataIndex="rate" key="rate" />
          </Table>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1>Invoice Management System</h1>
      <Button
        onClick={() => {
          setCurrentTab("create_invoice");
        }}
      >
        Add Invoice
      </Button>
      <Table dataSource={invoices} rowKey="id">
        <Table.Column title="Invoice ID" dataIndex="invoiceNumber" key="id" />
        <Table.Column title="Client" dataIndex="clientName" key="name" />
        <Table.Column
          title="Invoice Date"
          dataIndex="invoiceDate"
          key="invoiceDate"
          render={(date) =>
            new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
        />
        <Table.Column
          title="Due Date"
          dataIndex="dueDate"
          key="dueDate"
          render={(date) =>
            new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
        />
        <Table.Column
          title="Amount"
          dataIndex="totalAmount"
          key="totalAmount"
          render={(totalAmount) => `₹${totalAmount}`}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => {
            let color;
            switch (status) {
              case "draft":
                color = "blue";
                break;
              case "sent":
                color = "orange";
                break;
              case "paid":
                color = "green";
                break;
              case "overdue":
                color = "red";
                break;
              default:
                color = "gray";
            }
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
          }}
        />
        <Table.Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space>
              <Button
                onClick={() => {
                  onModalOpen(text, record);
                }}
              >
                View
              </Button>
              {record.status === "sent" || record.status == "overdue" ? (
                <Button
                  onClick={() => {
                    message.success(
                      `Invoice ${record.invoiceNumber} marked as paid`
                    );
                    InvoiceStore.updateInvoiceStatus(record.id, "paid");
                    const fetchedInvoices = InvoiceStore.getInvoices();
                    setInvoices(fetchedInvoices);
                  }}
                >
                  Mark as Paid
                </Button>
              ) : null}
              {record.status === "sent" ? (
                <Button
                  onClick={() => {
                    message.warning(
                      `Invoice ${record.invoiceNumber} marked as overdue`
                    );
                    InvoiceStore.updateInvoiceStatus(record.id, "overdue");
                    const fetchedInvoices = InvoiceStore.getInvoices();
                    setInvoices(fetchedInvoices);
                  }}
                >
                  Mark as Overdue
                </Button>
              ) : null}
              {record.status === "draft" && (
                <Button
                  onClick={() => {
                    message.success(
                      `Invoice sent successfully for ${record.invoiceNumber} to ${record.clientEmail}`
                    );
                    InvoiceStore.updateInvoiceStatus(record.id, "sent");
                    const fetchedInvoices = InvoiceStore.getInvoices();
                    setInvoices(fetchedInvoices);
                  }}
                >
                  Send Invoice
                </Button>
              )}
              <Button
                danger
                onClick={() => {
                  Modal.confirm({
                    title: "Are you sure you want to delete this invoice?",
                    onOk() {
                      InvoiceStore.deleteInvoice(record.id);
                      const fetchedInvoices = InvoiceStore.getInvoices();
                      setInvoices(fetchedInvoices);
                      message.success(
                        `Invoice ${record.invoiceNumber} deleted successfully`
                      );
                    },
                  });
                }}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
const { Option } = Select;
