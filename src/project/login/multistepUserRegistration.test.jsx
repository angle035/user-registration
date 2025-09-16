import '../../../tests/matchMedia.mock';
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import UserRegistration from "./multistepUserRegistration";
import React from "react";
describe("UserRegistration Title", () => {
  it("Title should be render", () => {
    render(<UserRegistration />);
    expect(screen.getByText("Multi-step User Registration")).toBeInTheDocument();
  });
});

describe("UserRegistration First Name", () => {
  it("First Name should be render", () => {
    render(<UserRegistration />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
  });
});

describe("UserRegistration Last Name", () => {
  it("Last Name should be render", () => {
    render(<UserRegistration />);
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });
});

describe("UserRegistration Next Button", () => {
  it("Next Button should be render", () => {
    render(<UserRegistration />);
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });
});
describe("UserRegistration error submit", () => {
  it('error submit', async () => {
    render(<UserRegistration />);
    // Fill in the input fields
    // fireEvent.change(screen.getByLabelText(/考生姓名:/), { target: { value: 'John Doe' } });
    // fireEvent.change(screen.getByLabelText(/身份证号:/), { target: { value: '123456789012345678' } });
    // fireEvent.change(screen.getByLabelText(/学号:/), { target: { value: '2023001' } });

    // Click the login button
    // fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByText(/Next/i));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/Please input your First Name/)).toBeInTheDocument();
      expect(screen.getByText(/Please input your Last Name/)).toBeInTheDocument();
      expect(screen.getByText(/Please input your Date of Birth/)).toBeInTheDocument();
    });


  });
});



