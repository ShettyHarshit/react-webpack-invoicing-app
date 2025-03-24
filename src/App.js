import { Button, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceModalContent from "./components/InvoiceModalContent";
import InvoiceTable from "./components/InvoiceTable";
import { InvoiceStore } from "./stores/invoiceStore";

export function App() {
  const [invoices, setInvoices] = useState([]);
  const [currentTab, setCurrentTab] = useState("all_invoices");
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);

  useEffect(() => {
    const fetchedInvoices = InvoiceStore.getInvoices();
    setInvoices(fetchedInvoices);
  }, []);

  const onModalOpen = (text, record) => {
    Modal.info({
      width: 800,
      title: `Invoice ${record.invoiceNumber}`,
      content: <InvoiceModalContent record={record} />,
      okText: "Close",
    });
  };

  const handleAfterSubmit = () => {};

  const refetchInvoices = () => {
    const fetchedInvoices = InvoiceStore.getInvoices();
    setInvoices(fetchedInvoices);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-8 flex-grow">
        <Row justify="space-between">
          <Col>
            <h1 className="text-3xl font-bold mb-8">Invoicing App</h1>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setShowAddInvoiceModal(true);
              }}
            >
              Add Invoice
            </Button>
          </Col>
        </Row>
        <InvoiceTable
          refetchInvoices={refetchInvoices}
          invoices={invoices}
          onModalOpen={onModalOpen}
        />
        <Modal
          width={800}
          title="Add Invoice"
          open={showAddInvoiceModal}
          footer={null}
          onCancel={() => setShowAddInvoiceModal(false)}
        >
          <InvoiceForm handleAfterSubmit={handleAfterSubmit} />
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
