import { Table } from "antd";
import React from "react";
import { renderDate, renderTag } from "../helpers/uiHelpers";

function InvoiceModalContent({ record }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-xs uppercase font-medium text-gray-500">
            Client Name
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            {record.clientName}
          </p>

          <p className="text-xs uppercase font-medium text-gray-500 mt-3">
            Client Email
          </p>
          <p className="text-gray-600">{record.clientEmail}</p>

          <p className="text-xs uppercase font-medium text-gray-500 mt-3">
            Client Address
          </p>
          <p className="text-gray-600">{record.clientAddress}</p>
        </div>

        {/* Invoice Details */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-xs uppercase font-medium text-gray-500">Status</p>
          <p className="text-lg">{renderTag(record.status)}</p>

          <p className="text-xs uppercase font-medium text-gray-500 mt-3">
            Invoice Date
          </p>
          <p className="text-gray-600">{renderDate(record.invoiceDate)}</p>

          <p className="text-xs uppercase font-medium text-gray-500 mt-3">
            Due Date
          </p>
          <p className="text-gray-600">{renderDate(record.dueDate)}</p>
        </div>
      </div>

      {record.notes && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-xs uppercase font-medium text-gray-500">Notes</p>
          <p className="text-gray-600">{record.notes}</p>
        </div>
      )}

      <div className="border rounded-md shadow-sm">
        <Table
          dataSource={record.lineItems}
          rowKey="description"
          pagination={false}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ quantity, rate }) => {
              total += quantity * rate;
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} className="font-semibold">
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} className="font-semibold">
                  ₹{total}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        >
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
          <Table.Column
            title="Rate"
            dataIndex="rate"
            key="rate"
            render={(rate) => `₹${rate}`}
          />
        </Table>
      </div>
    </div>
  );
}

export default InvoiceModalContent;
