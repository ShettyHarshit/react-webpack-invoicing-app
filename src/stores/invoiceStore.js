import { Dispatcher } from "flux";

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const saveInvoicesToLocalStorage = () => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export const InvoiceStore = {
  getInvoices() {
    return invoices;
  },

  addInvoice(invoice) {
    invoices.push(invoice);
    saveInvoicesToLocalStorage();
  },

  updateInvoiceStatus(id, status) {
    invoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status } : invoice
    );
    saveInvoicesToLocalStorage();
  },

  deleteInvoice(id) {
    invoices = invoices.filter((invoice) => invoice.id !== id);
    saveInvoicesToLocalStorage();
  },
};

const dispatcher = new Dispatcher();

dispatcher.register((action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      InvoiceStore.addInvoice(action.invoice);
      break;
    case "UPDATE_INVOICE_STATUS":
      InvoiceStore.updateInvoiceStatus(action.id, action.status);
      break;
    case "DELETE_INVOICE":
      InvoiceStore.deleteInvoice(action.id);
      break;
    default:
      break;
  }
});

export const InvoiceActions = {
  addInvoice(invoice) {
    dispatcher.dispatch({
      type: "ADD_INVOICE",
      invoice,
    });
  },

  updateInvoiceStatus(id, status) {
    dispatcher.dispatch({
      type: "UPDATE_INVOICE_STATUS",
      id,
      status,
    });
  },

  deleteInvoice(id) {
    dispatcher.dispatch({
      type: "DELETE_INVOICE",
      id,
    });
  },
};
