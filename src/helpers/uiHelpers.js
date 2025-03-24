import { Tag } from "antd";
import React from "react";
import { InvoiceStatuses } from "../constants/InvoiceStatuses";

export const renderTag = (status) => {
  let color;
  switch (status) {
    case InvoiceStatuses.DRAFT:
      color = "blue";
      break;
    case InvoiceStatuses.SENT:
      color = "orange";
      break;
    case InvoiceStatuses.PAID:
      color = "green";
      break;
    case InvoiceStatuses.OVERDUE:
      color = "red";
      break;
    default:
      color = "gray";
  }
  return <Tag color={color}>{status.toUpperCase()}</Tag>;
};

export const renderDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatAmount = (amount) => {
  return `₹${Number.isInteger(amount) ? amount.toFixed(2) : amount}`;
};
