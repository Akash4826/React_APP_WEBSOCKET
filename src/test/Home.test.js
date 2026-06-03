import { render, screen } from "@testing-library/react";
import Home from "../pages/Home"

describe("test home page", () => {

    test("renders home for element testing", () => {
        render(<Home />);
        const element = screen.getByText(/Search Fruits/i);
        expect(element).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent(/Save Data/i);
    })

    test("Snapshot test", () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    })
})