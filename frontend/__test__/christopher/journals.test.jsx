import React from "react";
import { describe, expect, it, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { AuthProvider } from "../../src/context/AuthContext";
import ProtectedRoute from "../../src/ProtectedRoute/ProtectedRoute";
import Home from "../../src/pages/Home";
import CreateJournal from "../../src/pages/CreateJournal";
import JournalsHome from "../../src/pages/JournalsHome";
import axios from "axios";

describe("React components", () => {
  beforeAll(async () => {
    try {
      const response = await axios.post("http://localhost:1814/users/login", {
        email: "integration@testing.jest",
        password: "integration@testing.jest",
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("auth-token", token);
      } else {
        console.error("Token not found in response:", response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  });

  describe("Realistic cases", async () => {
    it("renders the protected route for a student", async () => {
      render(
        <MemoryRouter initialEntries={["/journals"]}>
          <AuthProvider>
            <ProtectedRoute allowedRoles={["student"]}>
              <Home />
            </ProtectedRoute>
          </AuthProvider>
        </MemoryRouter>
      );

      // Since the route is protected and the user role is correct, Home component should render
      const journalElement = await screen.findByTestId("Student_log_in");
      expect(journalElement.textContent).toBe("Journal");
    });

    it("fetches all journals from user", async () => {
      render(
        <MemoryRouter initialEntries={["/journals"]}>
          <AuthProvider>
            <JournalsHome />
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for a bit to let the component fetch the journals
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const journalCards = screen.getAllByTestId("journal_card");
      expect(journalCards.length).toBe(3);
    });
  });

  describe("Negative cases", async () => {
    it("renders input fields correctly", () => {
      render(
        <MemoryRouter initialEntries={["/journals"]}>
          <AuthProvider>
            <ProtectedRoute>
              <CreateJournal />
            </ProtectedRoute>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByPlaceholderText("Untitled")).toBeTruthy();
      expect(screen.getByText("Set visibility")).toBeTruthy();
      expect(screen.getByText("Keep private")).toBeTruthy();
      expect(screen.getByText("Share with teacher")).toBeTruthy();
    });
  });
});
