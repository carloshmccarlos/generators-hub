import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SequenceGeneratorTool from "@/components/tools/sequence-generator";

describe("sequence generator tool", () => {
  it("renders the default tool shell and generates an arithmetic sequence", async () => {
    render(<SequenceGeneratorTool />);

    expect(screen.getByRole("heading", { name: "Generate number sequences." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Arithmetic/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(await screen.findByRole("img", { name: "Sequence chart" })).toBeInTheDocument();
    expect((await screen.findAllByText("32")).length).toBeGreaterThan(0);
  });

  it("switches to formula mode and generates values", async () => {
    render(<SequenceGeneratorTool />);

    fireEvent.click(screen.getByRole("button", { name: /Formula/ }));
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect((await screen.findAllByText("129")).length).toBeGreaterThan(0);
  });

  it("shows validation errors for invalid input", async () => {
    render(<SequenceGeneratorTool />);

    fireEvent.change(screen.getByLabelText("Terms"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(await screen.findByText("Terms must be between 1 and 200.")).toBeInTheDocument();
  });

  it("copies the generated sequence", async () => {
    render(<SequenceGeneratorTool />);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    fireEvent.click(await screen.findByRole("button", { name: "Copy" }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("5, 8, 11, 14, 17, 20, 23, 26, 29, 32");
    });
  });

  it("downloads csv output", async () => {
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:test"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(<SequenceGeneratorTool />);

    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    fireEvent.click(await screen.findByRole("button", { name: "CSV" }));

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
