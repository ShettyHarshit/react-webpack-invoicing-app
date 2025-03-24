import { Button, message, Modal, Space, Table } from "antd";
import React from "react";
import { InvoiceStatuses } from "../constants/InvoiceStatuses";
import { renderDate, renderTag } from "../helpers/uiHelpers";
import { InvoiceStore } from "../stores/invoiceStore";

function InvoiceTable({ invoices, onModalOpen }) {
  return (
    <div>
      <Table dataSource={invoices} rowKey="id">
        <Table.Column title="Invoice ID" dataIndex="invoiceNumber" key="id" />
        <Table.Column title="Client" dataIndex="clientName" key="name" />
        <Table.Column
          title="Invoice Date"
          dataIndex="invoiceDate"
          key="invoiceDate"
          render={renderDate}
        />
        <Table.Column
          title="Due Date"
          dataIndex="dueDate"
          key="dueDate"
          render={renderDate}
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
          render={renderTag}
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
              {record.status === InvoiceStatuses.SENT ||
              record.status == InvoiceStatuses.OVERDUE ? (
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
              {record.status === InvoiceStatuses.SENT ? (
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
              {record.status === InvoiceStatuses.DRAFT && (
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

export default InvoiceTable;
