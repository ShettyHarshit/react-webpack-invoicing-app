import { EventEmitter } from "events";
import { Dispatcher } from "flux";

const invoiceStore = new EventEmitter();
let invoices = [];

export const InvoiceStore = {
  getInvoices() {
    return invoices;
  },

  addInvoice(invoice) {
    invoices.push(invoice);
    invoiceStore.emit("change");
  },

  updateInvoice(updatedInvoice) {
    invoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    invoiceStore.emit("change");
  },

  deleteInvoice(id) {
    invoices = invoices.filter((invoice) => invoice.id !== id);
    invoiceStore.emit("change");
  },

  addChangeListener(callback) {
    invoiceStore.on("change", callback);
  },

  removeChangeListener(callback) {
    invoiceStore.removeListener("change", callback);
  },
};

const dispatcher = new Dispatcher();

dispatcher.register((action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      InvoiceStore.addInvoice(action.invoice);
      break;
    case "UPDATE_INVOICE":
      InvoiceStore.updateInvoice(action.invoice);
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

  updateInvoice(invoice) {
    dispatcher.dispatch({
      type: "UPDATE_INVOICE",
      invoice,
    });
  },

  deleteInvoice(id) {
    dispatcher.dispatch({
      type: "DELETE_INVOICE",
      id,
    });
  },
};
