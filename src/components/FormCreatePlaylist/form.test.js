import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Form from './index';

const renderForm = (
    <Form
        token="token"
        userId="userId"
        songUris={"selectedItems"}
        updateSongUris={"setSelectedItems"}
    />
  );
  
  describe("Form", () => {
    test("Title Rendered", () => {
        render(renderForm);
        const titleInput = screen.getByTestId("title");
        userEvent.type(titleInput, "Title");
        expect(titleInput).toBeInTheDocument();
    });
    
    test("Description Rendered", () => {
        render(renderForm);
        const descriptionInput = screen.getByTestId("description");
        userEvent.type(descriptionInput, "Description");
        expect(descriptionInput).toHaveTextContent("Description");
    });
});