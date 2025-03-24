import { InvoiceStore } from "./invoiceStore";

describe("InvoiceStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should add an invoice", () => {
    const newInvoice = { id: "1", clientName: "John Doe", status: "DRAFT" };

    InvoiceStore.addInvoice(newInvoice);
    const invoices = InvoiceStore.getInvoices();

    expect(invoices.length).toBe(1);
    expect(invoices[0]).toEqual(newInvoice);
  });

  test("should update an invoice status", () => {
    const invoice = { id: "1", clientName: "John Doe", status: "DRAFT" };

    InvoiceStore.addInvoice(invoice);
    InvoiceStore.updateInvoiceStatus("1", "PAID");

    const updatedInvoice = InvoiceStore.getInvoices().find((i) => i.id === "1");

    expect(updatedInvoice.status).toBe("PAID");
  });

  test("should delete an invoice", () => {
    const invoice = { id: "1", clientName: "John Doe", status: "DRAFT" };

    InvoiceStore.addInvoice(invoice);
    InvoiceStore.deleteInvoice("1");

    const invoices = InvoiceStore.getInvoices();
    expect(invoices.length).toBe(0);
  });

  test("should persist data in localStorage", () => {
    const invoice = { id: "1", clientName: "John Doe", status: "DRAFT" };

    InvoiceStore.addInvoice(invoice);
    const storedInvoices = JSON.parse(localStorage.getItem("invoices"));

    expect(storedInvoices).not.toBeNull();
    expect(storedInvoices.length).toBe(1);
    expect(storedInvoices[0]).toEqual(invoice);
  });
});
