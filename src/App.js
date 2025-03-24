import React, { useEffect, useState } from "react";
import "./App.css";
import { InvoiceStore } from "./stores/invoiceStore";

export function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchedInvoices = InvoiceStore.getInvoices();
    setInvoices(fetchedInvoices);
  }, []);

  const addInvoice = () => {
    const newInvoice = { id: Date.now(), name: "New Invoice" };
    InvoiceStore.addInvoice(newInvoice);
    setInvoices([...invoices, newInvoice]);
  };

  return (
    <div>
      <h1>Invoice Management System</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>{invoice.name}</li>
        ))}
      </ul>
      <button onClick={addInvoice}>Add Invoice</button>
    </div>
  );
}
