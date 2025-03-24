import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { InvoiceStatuses } from "../constants/InvoiceStatuses";
import { formatAmount, renderDate, renderTag } from "../helpers/uiHelpers";

describe("renderTag", () => {
  it("renders a blue tag for DRAFT status", () => {
    const { container } = render(renderTag(InvoiceStatuses.DRAFT));
    expect(container.firstChild).toHaveTextContent("DRAFT");
  });

  it("renders an orange tag for SENT status", () => {
    const { container } = render(renderTag(InvoiceStatuses.SENT));
    expect(container.firstChild).toHaveTextContent("SENT");
  });

  it("renders a green tag for PAID status", () => {
    const { container } = render(renderTag(InvoiceStatuses.PAID));
    expect(container.firstChild).toHaveTextContent("PAID");
  });

  it("renders a red tag for OVERDUE status", () => {
    const { container } = render(renderTag(InvoiceStatuses.OVERDUE));
    expect(container.firstChild).toHaveTextContent("OVERDUE");
  });

  it("renders a gray tag for unknown status", () => {
    const { container } = render(renderTag("UNKNOWN"));
    expect(container.firstChild).toHaveTextContent("UNKNOWN");
  });
});

describe("renderDate", () => {
  it("formats a date correctly", () => {
    const date = "2025-03-21T12:00:00Z";
    expect(renderDate(date)).toBe("Mar 21, 2025");
  });

  it("handles invalid dates", () => {
    expect(renderDate("invalid-date")).toBe("Invalid Date");
  });
});

describe("formatAmount", () => {
  it("formats whole numbers correctly", () => {
    expect(formatAmount(100)).toBe("₹100.00");
  });

  it("formats incomplete amount decimal numbers correctly", () => {
    expect(formatAmount(100.5)).toBe("₹100.50");
  });
});
